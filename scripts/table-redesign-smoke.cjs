'use strict';
const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const net = require('net');
const { spawn } = require('child_process');
const workspace = path.resolve(__dirname, '..');
const output = path.join(workspace, 'artifacts/table-redesign-validation');
const port = Number(process.env.TABLE_QA_PORT || 3110);
assert(Number.isInteger(port) && port >= 1024 && port <= 65535, 'Invalid QA port');
const base = `http://127.0.0.1:${port}`;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const { CARD_BY_ID } = require('../dist/shared/catalog');
const viewports = [
  { width: 1440, height: 900, isMobile: false, hasTouch: false },
  { width: 390, height: 844, isMobile: true, hasTouch: true },
  { width: 844, height: 390, isMobile: true, hasTouch: true },
];
let server, browser, temporaryDirectory, logs = '', feedbackModule;
const results = [], checks = {}, violations = [];

async function startServer() {
  await new Promise((resolve, reject) => {
    const probe = net.createServer(); probe.once('error', reject);
    probe.listen(port, '127.0.0.1', () => probe.close(resolve));
  });
  temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'wtk-table-qa-'));
  fs.mkdirSync(path.join(temporaryDirectory, 'db'));
  server = spawn(process.execPath, [path.join(workspace, 'dist/colyseus_server.js')], {
    cwd: temporaryDirectory, env: { ...process.env, PORT: String(port), NODE_ENV: 'test', NO_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => finish(new Error('QA server boot timeout: ' + logs)), 10000);
    const append = data => { logs += String(data); if (logs.includes(`http://localhost:${port}`)) finish(); };
    const exited = code => finish(new Error(`QA child exited ${code}: ${logs}`));
    function finish(error) {
      clearTimeout(timer); server.stdout.off('data', append); server.stderr.off('data', append); server.off('exit', exited); server.off('error', finish);
      error ? reject(error) : resolve();
    }
    server.stdout.on('data', append); server.stderr.on('data', append); server.once('exit', exited); server.once('error', finish);
  });
  for (const stream of [server.stdout, server.stderr]) stream.on('data', data => { logs = (logs + String(data)).slice(-16000); });
  assert(fs.existsSync(path.join(temporaryDirectory, 'db/wtk_game.sqlite')), 'Isolated SQLite was not created');
}

function audioInstrumentation() {
  const Native = window.AudioContext || window.webkitAudioContext;
  const stats = window.__tableAudio = { starts: 0, ended: 0, active: 0, contexts: [], analysers: [] };
  if (!Native) return;
  window.AudioContext = new Proxy(Native, { construct(target, args) {
    const context = Reflect.construct(target, args); stats.contexts.push(context);
    const analyser = context.createAnalyser(); analyser.fftSize = 1024; stats.analysers.push(analyser);
    const nativeConnect = AudioNode.prototype.connect;
    const originalGain = context.createGain.bind(context);
    context.createGain = () => {
      const gain = originalGain(), connect = gain.connect;
      gain.connect = function(destination, ...options) {
        if (destination === context.destination) { nativeConnect.call(analyser, destination); return connect.call(this, analyser, ...options); }
        return connect.call(this, destination, ...options);
      };
      return gain;
    };
    for (const method of ['createOscillator', 'createBufferSource']) {
      const original = context[method].bind(context);
      context[method] = () => {
        const source = original(), start = source.start; let started = false;
        source.start = function(...args) { stats.starts++; stats.active++; started = true; return start.apply(this, args); };
        source.addEventListener('ended', () => { stats.ended++; if (started) stats.active--; });
        return source;
      };
    }
    return context;
  } });
}

async function metrics(page) {
  return page.evaluate(() => {
    const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom }; };
    const q = selector => { const element = document.querySelector(selector); return element ? rect(element) : null; };
    const stageElement = document.querySelector('.board-stage'), stage = rect(stageElement);
    const seats = [...document.querySelectorAll('.seat')].map(element => ({ id: element.dataset.player, ...rect(element) }));
    const intersection = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
    const overlaps = [];
    for (let a = 0; a < seats.length; a++) for (let b = a + 1; b < seats.length; b++) if (intersection(seats[a], seats[b]) > 1) overlaps.push([seats[a].id, seats[b].id]);
    const overlays = ['#self-summary', '.log-toggle', '#center-play'].map(selector => ({ selector, bounds: q(selector) })).filter(x => x.bounds);
    const blockedSeats = overlays.flatMap(overlay => seats.filter(seat => intersection(seat, overlay.bounds) > 1).map(seat => [overlay.selector, seat.id]));
    const cards = [...document.querySelectorAll('#hand .hand-card')].map(element => ({ id: element.dataset.card, selected: element.classList.contains('selected'), ...rect(element) }));
    return {
      viewport: { width: innerWidth, height: innerHeight }, horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      verticalOverflow: document.documentElement.scrollHeight > innerHeight + 1,
      stage, scene: q('#board-scene'), center: q('#center-play'), self: q('#self-summary'), log: q('.log-toggle'), hand: q('#hand'), cards, seats, overlaps, blockedSeats,
      table: { left: Number(stageElement.dataset.tableLeft), top: Number(stageElement.dataset.tableTop), width: Number(stageElement.dataset.tableWidth), height: Number(stageElement.dataset.tableHeight) },
      backs: [...document.querySelectorAll('.seat')].map(element => ({ id: element.dataset.player, count: element.querySelectorAll('.opponent-card-back').length, secretIds: element.querySelectorAll('.opponent-card-back[data-card]').length })),
      buttons: [...document.querySelectorAll('#action-dock button:not([disabled]), .game-navigation button, #skill-buttons button')].map(element => ({ action: element.dataset.action, ...rect(element) })),
    };
  });
}

function validateLayout(result, denseHand = false) {
  const { stage, scene, center, table, viewport } = result;
  const inside = (r, bounds) => r && r.x >= bounds.x - 1 && r.y >= bounds.y - 1 && r.right <= bounds.right + 1 && r.bottom <= bounds.bottom + 1;
  const gate = (ok, message) => { if (!ok) violations.push(`${result.label}: ${message}`); };
  gate(!result.horizontalOverflow && !result.verticalOverflow, 'document overflow');
  gate(result.seats.length === result.seatsRequested - 1, 'incorrect opponent count');
  gate(!result.overlaps.length, 'opponent controls overlap');
  gate(!result.blockedSeats.length, 'seat blocked by self/log/center overlay ' + JSON.stringify(result.blockedSeats));
  gate(inside(scene, stage), 'renderer extends outside stage');
  gate(inside(center, stage), 'center play tray clipped');
  gate(table.left >= -.005 && table.top >= -.005 && table.left + table.width <= 1.005 && table.top + table.height <= 1.005, 'projected full table clipped');
  gate(table.width >= .55 && table.width <= .96, 'table width outside useful stage fit');
  gate(result.seats.every(seat => seat.width >= 44 && seat.height >= 44 && inside(seat, stage)), 'seat hit controls too small or clipped');
  gate(result.buttons.every(button => button.width >= 43 && button.height >= 43), 'action touch control below 44 pixels');
  gate(result.backs.every(back => back.count > 0 && back.secretIds === 0), 'opponent backs missing or contain hidden IDs');
  gate(result.cards.every(card => card.y >= 0 && card.bottom <= viewport.height + 1), 'rotated hand card clipped vertically');
  if (!denseHand) gate(result.cards.every(card => card.x >= -1 && card.right <= viewport.width + 1), 'initial hand clipped horizontally');
}

async function closeInspector(page) { if (await page.$('#inspector[open]')) await page.click('#inspector [data-action="close"]'); }
async function admin(page, action, options = {}) {
  await closeInspector(page); await page.click('[data-action="sandbox"]'); await page.waitForSelector('#admin-player');
  if (options.player) await page.select('#admin-player', options.player);
  if (options.card) await page.select('#admin-card', options.card);
  if (options.hero) await page.select('#admin-hero', options.hero);
  await page.click(`[data-action="${action}"]`); await delay(80);
}
async function chooseCard(page, id) {
  const point = await page.evaluate(id => {
    const card = [...document.querySelectorAll('#hand .hand-card')].find(element => element.dataset.card === id);
    if (!card) return null; card.scrollIntoView({ block: 'nearest', inline: 'center' });
    const r = card.getBoundingClientRect();
    for (const ry of [.25, .45, .65, .85]) for (const rx of [.15, .35, .5, .7]) {
      const x = r.x + r.width * rx, y = r.y + r.height * ry;
      if (x < 1 || x >= innerWidth || y < 1 || y >= innerHeight) continue;
      if (document.elementFromPoint(x, y)?.closest('[data-card]')?.dataset.card === id) return { x, y };
    }
    return null;
  }, id);
  assert(point, 'No exposed selectable point on hand card ' + id);
  if (page.viewport().hasTouch) await page.touchscreen.tap(point.x, point.y); else await page.mouse.click(point.x, point.y);
}
async function spawned(page, name) {
  const existing = await page.$$eval('#hand .hand-card', cards => cards.map(c => c.dataset.card));
  await admin(page, 'admin-spawn', { player: 'p1', card: name });
  await page.waitForFunction(count => document.querySelectorAll('#hand .hand-card').length > count, {}, existing.length);
  return page.$$eval('#hand .hand-card', (cards, ids) => cards.find(card => !ids.includes(card.dataset.card)).dataset.card, existing);
}
async function play(page, name, target) {
  const id = await spawned(page, name);
  const previous = await page.$eval('#recent-plays', element => element.querySelector('.newest button')?.dataset.play || '');
  await chooseCard(page, id); if (target) await page.click(`.seat[data-player="${target}"]`);
  await page.waitForSelector('[data-action="submit"]:not([disabled])'); await page.click('[data-action="submit"]');
  await page.waitForFunction(previous => { const key = document.querySelector('#recent-plays .newest button')?.dataset.play; return key && key !== previous; }, {}, previous);
  return id;
}
async function waitOwnPlay(page) {
  await page.waitForSelector('[data-action="end"]', { timeout: 8000 });
}

async function audioChecks(page) {
  await page.click('[data-action="sound-settings"]'); await page.click('[data-action="preview-sound"]');
  const signal = await page.evaluate(async () => {
    let maxRms = 0;
    for (let i = 0; i < 40; i++) {
      for (const analyser of window.__tableAudio.analysers) {
        const samples = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(samples);
        const rms = Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length); maxRms = Math.max(maxRms, rms);
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    return { maxRms, starts: window.__tableAudio.starts, states: window.__tableAudio.contexts.map(context => context.state) };
  });
  assert(signal.starts > 0 && signal.states.includes('running') && signal.maxRms > .000001, 'Trusted preview produced no measurable real audio');
  await delay(1000);
  const ended = await page.evaluate(() => ({ active: window.__tableAudio.active, ended: window.__tableAudio.ended }));
  assert.equal(ended.active, 0, 'Preview voice leaked');
  await page.click('[data-action="mute"]'); const mutedStarts = await page.evaluate(() => window.__tableAudio.starts);
  await page.click('[data-action="preview-sound"]'); await delay(100);
  assert.equal(await page.evaluate(() => window.__tableAudio.starts), mutedStarts, 'Muted preview started sources');
  await page.click('[data-action="mute"]');
  await page.$eval('#sound-volume', input => { input.value = '0'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  const zeroStarts = await page.evaluate(() => window.__tableAudio.starts);
  await page.click('[data-action="preview-sound"]'); await delay(100);
  assert.equal(await page.evaluate(() => window.__tableAudio.starts), zeroStarts, 'Zero volume preview started sources');
  await page.$eval('#sound-volume', input => { input.value = '35'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.click('[data-action="reduce-fx"]'); assert(await page.$('.board-page.reduced-effects'), 'Reduced FX toggle failed');
  await page.click('[data-action="reduce-fx"]'); await closeInspector(page);
  checks.audio = { ...signal, voicesAfterTail: ended, mutedNoStarts: true, zeroVolumeNoStarts: true, settingsPersisted: await page.evaluate(() => JSON.parse(localStorage.getItem('wtk.feedback'))) };
}

async function interaction(page, count) {
  await page.setViewport(viewports[0]);
  await admin(page, 'admin-hero', { player: 'p1', hero: 'ZHANG_FEI' });
  for (let i = 0; i <= count; i++) {
    if (await page.$('[data-action="end"]')) break;
    await admin(page, 'admin-pass'); await delay(650);
  }
  await waitOwnPlay(page);
  const first = await page.$eval('#hand .hand-card', card => card.dataset.card);
  const beforeCount = await page.$$eval('#hand .hand-card', cards => cards.length);
  await chooseCard(page, first); await page.click('[data-action="inspect-selected"]');
  assert(await page.$('#inspector[open] .card-detail'), 'Card preview did not open');
  assert.equal(await page.$$eval('#hand .hand-card', cards => cards.length), beforeCount, 'Inspection played a card');
  await closeInspector(page); await page.click('[data-action="cancel"]');
  await play(page, 'FEATHERED_FAN'); await waitOwnPlay(page);
  await admin(page, 'admin-hero', { player: 'p2', hero: 'ZHANG_FEI' });
  await admin(page, 'admin-spawn', { player: 'p2', card: 'DODGE' });
  await play(page, 'SLASH', 'p2');
  await page.waitForFunction(name => document.querySelector('#recent-plays .newest .card-title')?.textContent === name, { timeout: 4000 }, CARD_BY_ID.DODGE.name);
  await waitOwnPlay(page); checks.actualDodgeResponse = true;
  await page.screenshot({ path: path.join(output, 'actual-defense-center.png') });
  for (const [name, target, screenshot] of [['SLASH', 'p2', 'actual-fire-impact.png'], ['THUNDER_ATTACK', 'p3', 'actual-thunder-impact.png']]) {
    await admin(page, 'admin-hero', { player: target, hero: 'ZHANG_FEI' });
    const hp = await page.$eval(`.seat[data-player="${target}"] .seat-health b`, element => Number(element.textContent));
    let hit = false;
    for (let i = 0; i < 7; i++) {
      await play(page, name, target);
      await delay(450); await waitOwnPlay(page);
      const current = await page.$eval(`.seat[data-player="${target}"] .seat-health b`, element => Number(element.textContent));
      if (current < hp) { hit = true; await delay(150); await page.screenshot({ path: path.join(output, screenshot) }); break; }
    }
    assert(hit, 'No real damage resolved for ' + name); checks[name === 'SLASH' ? 'actualFireImpact' : 'actualThunderImpact'] = true;
  }
  await page.click('#recent-plays .newest [data-action="public-play"]');
  assert(await page.$('#inspector[open] .card-detail'), 'Played card is not inspectable'); await closeInspector(page);
  while ((await page.$$eval('#hand .hand-card', cards => cards.length)) < 12) await spawned(page, 'EX_NIHILO');
  assert.equal(await page.$$eval('#hand .hand-card', cards => cards.length), 12, 'Expected a 12-card test hand');
  for (const viewport of viewports) {
    await page.setViewport(viewport); await delay(160);
    const result = { label: `12hand-${viewport.width}x${viewport.height}`, seatsRequested: count, ...await metrics(page) };
    validateLayout(result, true); results.push(result);
    const ids = await page.$$eval('#hand .hand-card', cards => cards.map(card => card.dataset.card));
    for (const id of ids) { await chooseCard(page, id); assert(await page.$(`#hand .hand-card.selected[data-card="${id}"]`), 'Exposed card failed selection'); }
    await page.screenshot({ path: path.join(output, result.label + '.png') });
  }
  const selected = await page.$eval('#hand .hand-card.selected', card => card.dataset.card);
  await page.setViewport(viewports[1]); await delay(150);
  assert(await page.$(`#hand .hand-card.selected[data-card="${selected}"]`), 'Rotation lost selection');
  checks.twelveCardHandSelectable = true; checks.rotationPreservesSelection = true;
}

async function feedbackChecks(page) {
  // Exercise the same real feedback module in an isolated browser instance.
  await page.addScriptTag({ type: 'module', content: `${feedbackModule}\nwindow.__FeedbackProbeClass=TableFeedback;` });
  await page.waitForFunction(() => window.__FeedbackProbeClass);
  const result = await page.evaluate(async () => {
    const plays = [], cues = [];
    const probe = new window.__FeedbackProbeClass({ onPlay: play => plays.push(play), onCue: cue => cues.push(cue) });
    const card = { id: 'public-1', name: 'SLASH', suit: 'SPADE', rank: 7, type: 'BASIC' };
    const play = { playerId: 'p1', cardName: 'SLASH', card, targetIds: ['p2', 'p3', 'p4'], kind: 'PLAY', playId: 'same-physical-play' };
    const accepted = [probe.event('card_played', { ...play, eventId: 'e1', targetId: 'p2' }), probe.event('card_played', { ...play, eventId: 'e2', targetId: 'p3' }), probe.event('card_played', { ...play, eventId: 'e3', targetId: 'p4' })];
    probe.event('card_played', { ...play, playId: 'legitimate-next-play', eventId: 'e4' });
    const startsBeforeSnapshot = window.__tableAudio.starts;
    const snapshot = { roomId: 'silent-baseline', status: 'PLAYING', currentTurnPlayerId: 'p1', turnOrder: ['p1'], pendingAction: null, players: { p1: { hp: 4, isAlive: true, hand: [card] } } };
    probe.observeSnapshot(snapshot, 'p1'); probe.observeSnapshot(snapshot, 'p1'); probe.resetBaseline(); probe.observeSnapshot(snapshot, 'p1');
    const silentSnapshots = window.__tableAudio.starts === startsBeforeSnapshot;
    await probe.unlock(); const context = window.__tableAudio.contexts.at(-1); probe.preview(); probe.dispose();
    await new Promise(resolve => setTimeout(resolve, 40));
    return { accepted, plays: plays.length, cues: cues.length, silentSnapshots, contextAfterDispose: context.state };
  });
  assert.deepEqual(result.accepted, [true, false, false], 'Multi-target physical play was duplicated');
  assert.equal(result.plays, 2, 'Legitimate repeated Slash suppressed');
  assert(result.silentSnapshots && result.contextAfterDispose === 'closed', 'Feedback baseline/disposal failed');
  checks.eventDedupeAndDisposal = result;
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  await startServer();
  const { build } = await import('vite');
  await build({ configFile: false, logLevel: 'error', build: { lib: { entry: path.join(workspace, 'client/src/feedback.ts'), formats: ['es'], fileName: () => 'feedback-probe.js' }, outDir: path.join(temporaryDirectory, 'probe'), emptyOutDir: true, minify: false } });
  feedbackModule = fs.readFileSync(path.join(temporaryDirectory, 'probe/feedback-probe.js'), 'utf8').replace(/export\s*\{[\s\S]*?\};?\s*$/, '');
  const { default: puppeteer } = await import('puppeteer');
  browser = await puppeteer.launch({ headless: true, args: ['--enable-unsafe-swiftshader', '--autoplay-policy=user-gesture-required'] });
  for (const count of [4, 6, 10]) {
    const page = await browser.newPage(), errors = [], failures = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failures.push({ url: response.url(), status: response.status() }); });
    await page.evaluateOnNewDocument(audioInstrumentation);
    await page.setViewport(viewports[0]);
    await page.goto(`${base}/room?action=create&mode=BOT&players=${count}&test=true`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.draft-card');
    assert.equal(await page.evaluate(() => window.__tableAudio.starts), 0, 'Audio played before the first user gesture');
    const hero = await page.$$eval('.draft-card', cards => cards.find(card => !['ZHUGE_LIANG', 'ZHEN_JI'].includes(card.dataset.hero)).dataset.hero);
    await page.click(`.draft-card[data-hero="${hero}"]`); await page.waitForSelector('#hand .hand-card');
    for (const viewport of viewports) {
      await page.setViewport(viewport); await delay(220);
      const result = { label: `${count}seats-${viewport.width}x${viewport.height}`, seatsRequested: count, ...await metrics(page), errors: [...errors], failures: [...failures] };
      results.push(result); validateLayout(result);
      await page.screenshot({ path: path.join(output, result.label + '.png') });
    }
    if (count === 4) { await page.setViewport(viewports[0]); await audioChecks(page); await interaction(page, count); await feedbackChecks(page); }
    if (count === 6) {
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.reload({ waitUntil: 'networkidle2' });
      await page.waitForSelector('.draft-card');
      await page.click('.draft-card'); await page.waitForSelector('.board-page.reduced-effects');
      checks.systemReducedMotionHonored = true;
    }
    assert.equal(errors.length, 0, 'Browser exceptions: ' + errors.join('; ')); assert.equal(failures.length, 0, 'HTTP failures: ' + JSON.stringify(failures));
    await page.click('[data-action="leave"]'); await page.close();
  }
  fs.writeFileSync(path.join(output, 'metrics.json'), JSON.stringify({ date: '2026-10-15', isolatedPort: port, results, checks, violations }, null, 2));
  assert.equal(violations.length, 0, 'Geometry violations:\n' + violations.join('\n'));
  console.log(JSON.stringify({ cases: results.length, checks, violations }, null, 2));
})().catch(error => {
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'metrics.json'), JSON.stringify({ date: '2026-10-15', results, checks, violations, error: error.stack, serverLog: logs }, null, 2));
  console.error(error.stack); process.exitCode = 1;
}).finally(async () => {
  if (browser) await browser.close();
  if (server && server.exitCode === null && server.signalCode === null) { const exited = new Promise(resolve => server.once('exit', resolve)); server.kill('SIGKILL'); await exited; }
  if (temporaryDirectory) {
    const absolute = path.resolve(temporaryDirectory);
    assert.equal(path.dirname(absolute), path.resolve(os.tmpdir())); assert(path.basename(absolute).startsWith('wtk-table-qa-'));
    fs.rmSync(absolute, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
});

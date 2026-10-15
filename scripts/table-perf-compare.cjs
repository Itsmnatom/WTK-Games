'use strict';
// Summarizes existing profiling artifacts only; no game assertions or browser run.
const fs = require('fs');
const path = require('path');
const directory = path.resolve(__dirname, '../artifacts/performance');
const before = JSON.parse(fs.readFileSync(path.join(directory, 'before.json'), 'utf8'));
const after = JSON.parse(fs.readFileSync(path.join(directory, 'after.json'), 'utf8'));
const number = (value, digits = 2) => value == null ? '—' : Number(value).toFixed(digits);
const percentChange = (first, last) => first ? `${number((last / first - 1) * 100, 1)}%` : '—';
const rows = [];
const comparisons = [];
const notes = [];
for (const initial of before.cases) {
  const final = after.cases.find(item => item.config.id === initial.config.id);
  if (!final) { notes.push(`After artifact has no case ${initial.config.id}.`); continue; }
  const sameConfig = JSON.stringify(initial.config) === JSON.stringify(final.config);
  const sameWorkload = JSON.stringify(initial.syntheticWorkload) === JSON.stringify(final.syntheticWorkload);
  if (!sameConfig) notes.push(`${initial.config.id}: viewport/device configuration changed.`);
  if (!sameWorkload) notes.push(`${initial.config.id}: synthetic public presentation workload differs; inspect the raw event lists before interpreting a direct comparison.`);
  for (const phase of ['idle', 'active', 'hidden']) {
    const start = initial.phases[phase], end = final.phases[phase];
    if (!start || !end) continue;
    const a = start.summary, b = end.summary;
    const rendererBefore = start.contexts.map(item => item.renderer).join('; ');
    const rendererAfter = end.contexts.map(item => item.renderer).join('; ');
    if (rendererBefore !== rendererAfter) notes.push(`${initial.config.id}/${phase}: renderer differs between captures.`);
    rows.push(`| ${initial.config.id} / ${phase} | ${number(a.screenRendersPerSecond)} → ${number(b.screenRendersPerSecond)} | ${number(a.drawCallsPerSecond)} → ${number(b.drawCallsPerSecond)} (${percentChange(a.drawCallsPerSecond, b.drawCallsPerSecond)}) | ${number(a.rendererMainThreadBusyRatio * 100)}% → ${number(b.rendererMainThreadBusyRatio * 100)}% | ${a.longTaskCount} / ${number(a.longTaskMs, 0)} → ${b.longTaskCount} / ${number(b.longTaskMs, 0)} | ${number(b.jsHeapStart / 1e6)} → ${number(b.jsHeapEnd / 1e6)} MB |`);
    comparisons.push({case:initial.config.id,phase,sameConfig,sameWorkload,rendererBefore,rendererAfter,before:a,after:b,drawCallChangePercent:a.drawCallsPerSecond?(b.drawCallsPerSecond/a.drawCallsPerSecond-1)*100:null,mainThreadBusyChangePercent:a.rendererMainThreadBusyRatio?(b.rendererMainThreadBusyRatio/a.rendererMainThreadBusyRatio-1)*100:null,beforeVisibility:start.visibility,afterVisibility:end.visibility,beforeCanvasWrites:start.canvasDimensionWrites,afterCanvasWrites:end.canvasDimensionWrites,beforeAppRAF:start.appRAFCallbacks,afterAppRAF:end.appRAFCallbacks});
  }
}
const report = `# WTK rendering performance comparison\n\nCaptured before ${before.capturedAt}; after ${after.capturedAt}. See [methodology](README.md), [before raw data](before.json), and [after raw data](after.json).\n\nBefore bundle: \`${before.bundle.entry}\`, SHA-256 \`${before.bundle.sha256}\`.\n\nAfter bundle: \`${after.bundle.entry}\`, SHA-256 \`${after.bundle.sha256}\`.\n\nThis compares an unchanged idle board, the same synthetic public-effects workload through the shipped SDK callback path, and an actually hidden tab. It does not report game regression results, real-match throughput, OS CPU percentage, GPU utilization, or physical-phone performance. Renders/s counts actual scene render calls through their default-framebuffer clear; observer RAF is recorded separately and is not used as game FPS. A headless capture is not proof of 60 presented FPS on all devices.\n\n| Case / phase | Scene renders/s before → after | Draw calls/s before → after | Renderer main-thread busy before → after | Long tasks count / ms before → after | After JS heap start → end |\n| --- | ---: | ---: | ---: | ---: | ---: |\n${rows.join('\n')}\n\nJS heap occupancy is not forced-GC retained memory; end values can fall or rise with normal GC. Browser/profiler overhead and random initial hero/role/deck assignment remain limitations. Compare actual renderer strings in the raw artifacts; mobile means desktop-browser viewport/touch emulation.\n\n${notes.length ? 'Comparability notes:\n\n' + notes.map(note => '- ' + note).join('\n') : 'Viewport flags, public presentation event lists, and observed renderer strings match between these captures.'}\n`;
fs.writeFileSync(path.join(directory, 'comparison.json'), JSON.stringify({before:before.bundle,after:after.bundle,notes,comparisons}, null, 2));
fs.writeFileSync(path.join(directory, 'comparison.md'), report);
console.log(report);

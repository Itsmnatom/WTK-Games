# Experimental gameplay: strategy plans and 19 heroes

Implemented on `feat/pixel-kingdoms` after the user's design confirmations. This is a separate selectable ruleset, not a replacement for Standard. No claim of measured balance or gameplay correctness is made from compilation alone.

## Entering the mode

Choose **ทดลอง · 19 ขุนพล** under the lobby's room rules before creating a bot or online room. The room owns its ruleset; joining players inherit it. Standard retains the original 13-character draft pool and does not enable plans. Experimental adds Zhang Liao, Guo Jia, Huang Yueying, Gan Ning, Da Qiao and Hua Tuo. The catalog can inspect all 19 heroes.

After all heroes are selected, Experimental enters a separate 30-second strategy draft. Everyone chooses from the same three plans; duplicates are allowed. Choices remain private until all living players have chosen. Bots select immediately. Timeout assigns Muster. All choices are revealed together, and initial hands/turns then begin.

| Plan | Cost and effect | Window |
| --- | --- | --- |
| Muster / จัดทัพ | Discard one hand card, draw two. | Own play phase, no pending response. |
| Offensive / เร่งบุก | Discard one hand card, gain one additional Slash allowance for this turn. Actual attack cards and legal range are still required; applies to normal attacks, Serpent Spear and the Lord's requested Slash. | Own play phase, no pending response. |
| Supply / เตรียมเสบียง | Forgo all cards from that draw phase, including Zhang Liao's replacement draw and Zhou Yu's additional draw; restore one HP. Cannot activate at full HP or when drawing was already skipped. | Optional server prompt at the beginning of the draw phase. |

Each plan is usable once per match. The public HUD and player seats show the chosen plan and whether it has been used. Supply timeout declines; the normal draw path continues. All optional response windows remain 20 seconds; ordinary play turns remain unlimited.

## New hero contracts

Source study and direct official card links: [general-card research](general-card-research.md). These are the selected Standard-edition mechanics adapted to this project's rules engine, not Kingdom Wars skill variants.

- **Zhang Liao, 4 HP:** optionally replace the normal draw by taking one random hand card from each of one or two other living players. Passing or timeout uses the ordinary draw. The stolen faces remain private. Supply precludes this option when used.
- **Guo Jia, 3 HP:** optionally acquire his final judgment card after the judgment result is known, before the suspended action continues. The card is reserved during the decision. For each damage point, after dying/rescue queues have resolved and if still alive, may inspect two deck cards and distribute them to living players, including himself. Distribution is private; its mandatory timeout keeps the inspected cards for himself. Inspection acceptance timeout declines without drawing.
- **Huang Yueying, 3 HP:** after using a tactic (including a counter-Negate or delayed tactic), may draw one. The optional trigger is serialized after the current action's response chain; recasting Iron Chain does not trigger it. Tactics ignore range limitations; other targeting restrictions still apply.
- **Gan Ning, 4 HP:** convert a black hand/equipped card into Sabotage. A physical equipment payment is detached only after target validation; Silver Lion removal still heals.
- **Da Qiao, 3 HP:** convert a diamond hand/equipped card into Acedia. The physical card keeps its identity while carrying the delayed effect until it leaves the zone. Before responding to a Slash, may discard a hand/equipped card to redirect to another living target within her own post-payment range, excluding the attacker and a handless Kongcheng target. Preserve attacker, element, damage and required Dodges. Each character gets at most one redirection opportunity per individual attack, preventing repeated loops with duplicate heroes.
- **Hua Tuo, 3 HP:** outside his own turn, red hand cards may rescue as Peach. Once per play turn, discard one hand card to restore one HP to an injured living target, including himself.

Optional skill expiry never spends a human's card. Disconnect continuations release or return held cards where play is continuing. Existing dying queues, authoritative deadlines, final victory handling and 45-second reconnect grace remain in use. Experimental dead participants can reconnect to the spectator view within the same grace period.

## Bots and spectators

Experimental bot threat/support decisions use their own role and hand, the public Lord, public health/hand counts/equipment, observed declarations against or support for the Lord. They do not read another living player's hidden role or hand faces for these choices. The original Standard targeting policy is retained separately. Bots use the same card costs, legal target checks and strategy-plan commands. There is no negotiation protocol or external language-model service.

After death, the participant stays at the public table. Other players' hand faces and unrevealed roles stay masked; Guo Jia's private inspection and strategy choices are recipient-only. Spectator messages use a separate bounded server buffer delivered only in dead participants' snapshots. Living players receive no spectator text. Messages have a 240-character limit and a 1.5-second per-sender interval; all names/text are HTML-escaped by the client.

## Balance evidence and validation limits

The match-end overlay offers a JSON download containing rules version, seat count, turns, gameplay duration, hero/role/plan, plan usage, damage totals, outcomes. These details are exposed only after the match ends. Data is not automatically uploaded and requires no database migration. Compare many observed matches by seat count, role and bot/human composition before changing counts or claiming a balanced roster; a single win rate across mixed roles is insufficient.

Verification is limited to server/client production builds, client type checking and source review. Per the user's standing instruction, no game test suite, bot match, network smoke game or browser gameplay QA was run for this feature. Visual layout and actual play interactions remain unverified at runtime. The earlier performance report is for the earlier build; no new FPS measurements are claimed here.

Completed checks: `npm run build`, `npm run check:client`, and source `git diff --check` passed. The compiled server started successfully on port 3002 and initialized the existing SQLite database without a startup exception. No room or match was created as part of that startup check. The earlier preview on port 3001 was left running. Vite retains its existing large-bundle warning and absolute static-asset resolution notices; these do not prevent the build.

New art: [six-hero atlas](../public/art/heroes-experimental-atlas.png), [built-in generation prompt/provenance](experimental-art-provenance.json). No official card artwork is used as a runtime asset.

### Current mode and preview

The promise/negotiation system was removed at the user's request. No offers, accept/decline handlers, promise history, breach tracking or bot negotiation remain in the current runtime. The three strategy plans, 19-character experimental roster, public-information bot decisions and spectator channel remain.

The lobby shortcut is now **เล่นโหมดแผนกลยุทธ์**. `/lobby?ruleset=EXPERIMENTAL` preselects the experimental ruleset for both bot and online creation. Standard tables explain that plans are available in Experimental. Choose a plan after hero drafting; its status and activation button appear above the table. Supply remains a draw-phase prompt.

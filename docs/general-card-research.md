# WTK general-card research

Reviewed 2026-10-15. Research only; no game rules or hero roster changed.

## Sources and scope

- Official catalog: https://www.wtkgames.com/generalCard/
- The catalog's public data endpoint: https://api.wtkgames.com/api/hero
- Product identifiers from the page: 1 Standard, 2 Endless Legends Expansion, 3 Kingdom Wars.
- The response contained 139 catalog entries: Wei 36, Shu 35, Wu 34, Qun 34. These are edition-specific entries, not 139 unique characters. The Standard entries include both Xu Zhu and Xu Chu; do not count these as two distinct heroes without edition verification.
- Inventoried all entries, then visually read eight Standard cards relevant to the proposed deception/combo mode. Expansion and Kingdom Wars skill texts have not been individually reviewed. Research images and the raw API response remain under ignored scratch/wtk-web; they are reference material, not production assets.

## Eight Standard candidates

The following are paraphrases of the pictured cards. HP is read from the printed symbols. Implementation edge cases still require an explicit rules contract.

| Hero / API ID | HP | Printed mechanics, summarized | Possible gameplay contribution |
| --- | --- | --- | --- |
| Xiahou Dun / 19 | 4 | After taking damage, may judge; on a non-heart result the damage source chooses to discard two hand cards or take one damage from him. | Retaliation, attack deterrence and bargaining. |
| Zhang Liao / 20 | 4 | May replace drawing from the deck by taking one hand card from each of up to two characters. | Resource denial and choices that signal intent. |
| Guo Jia / 22 | 3 | May acquire his judgment card after it takes effect. After taking one damage, may inspect the top two deck cards and distribute them to characters, including himself. | Support, negotiated damage and concealed card distribution. |
| Huang Yueying / 7 | 3 | May draw one after using a Stratagem; her Stratagem cards have unlimited range. | Chaining tactics and hand management. |
| Gan Ning / 10 | 4 | May use a black card as Burning Bridges. | Disruption and card conversion; map the named card explicitly to the project's SABOTAGE contract. |
| Da Qiao / 14 | 3 | May use a diamond card as Overindulgence. When targeted by an Attack, may discard one card to transfer it to another character within her attack range, excluding the attacker. | Redirected attacks, deterrence and betrayal; map Overindulgence to ACEDIA deliberately. |
| Sun Shangxiang / 16 | 3 | Once per play phase, may discard two hand cards to heal herself and a chosen injured male character by one each. May draw two when losing equipped equipment. | Negotiated healing and equipment combos. |
| Hua Tuo / 25 | 3 | Outside his turn, may use a red card as Peach. Once per play phase, may discard one hand card to heal an injured character by one. | Rescue leverage and choosing whom to keep alive. |

### Direct card-image sources

- Xiahou Dun: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016171366ed2f89a119b.jpg
- Zhang Liao: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016171766ed2f8d7d834.jpg
- Guo Jia: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016172366ed2f9362235.jpg
- Huang Yueying: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016163066ed2f5edc675.jpg
- Gan Ning: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016164066ed2f68c5472.jpg
- Da Qiao: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016165666ed2f780a4d6.jpg
- Sun Shangxiang: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016170366ed2f7fc896e.jpg
- Hua Tuo: https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/2016173866ed2fa2d3a29.jpg

## Design recommendation, not a source claim

Start by considering Zhang Liao, Guo Jia, Huang Yueying, Gan Ning, Da Qiao and Hua Tuo (13 to 19 heroes). Together they add denial, distribution, tactics combos, disruption, redirection and rescue politics. This selection is a design hypothesis, not measured balance. Xiahou Dun and Sun Shangxiang are useful next candidates.

Keep edition-specific hero and skill IDs: Kingdom Wars is not a safe source of interchangeable skill text for the existing hidden-role profile. Do not silently replace the current project's deliberate custom rules.

Before implementation, settle: precise equipment/hand conversion zones; judgment-card ownership and timing; per-damage trigger sequencing during dying; redirected attack range/armor/response state; whether a redirect counts as initiating an attack for promises; and whether hero skills consume, replace or coexist with the proposed once-per-match strategy plans. Human and bot decisions must see the same information; card transfer must not publish private identities. Reuse the existing server response deadlines and serialize optional triggers rather than adding parallel prompts.

The proposed supply strategy skips the normal draw, so its interaction with Zhang Liao's replacement draw and extra draws needs a stated precedence. The proposed promises also need explicit semantics for forced/redirected attacks before Da Qiao is enabled. Neither interaction is established by this catalog alone.

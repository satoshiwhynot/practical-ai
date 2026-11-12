# Behavioral parity: check the feature underneath the demo

**Practice templates.** Observe a feature, write a contract, implement from that contract and compare both versions on the same inputs.

The source article used a fictional offline-search example. Its test totals, costs and timings were invented for teaching. This kit includes no target app, replacement, runner or measured parity score.

[Published follow-up on X](https://x.com/satoshiwhynot/status/2119499552449564998)

1. Select one interface in an app you may inspect.
2. Fix the app build, environment and dataset in [ENVIRONMENT.md](ENVIRONMENT.md).
3. Capture observations with [OBSERVATION.md](OBSERVATION.md).
4. Turn supported behavior into [SPEC.md](SPEC.md). Keep unknowns visible.
5. Give an implementation workspace only the spec and permitted fixtures. Enforce separation through actual access controls.
6. Compare ordering, pagination and error categories. [cases.example.jsonl](cases.example.jsonl) shows a fictional format.
7. Preserve mismatches in [REPORT.md](REPORT.md). Open reserved cases after development stops.

[Investigation and implementation prompts](PROMPTS.md) · [REA upstream](https://github.com/morluto/rea)

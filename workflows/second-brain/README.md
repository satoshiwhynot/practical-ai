# Claude Second Brain

### A project memory you can open, read and correct.

A small Markdown vault for Claude Code: sources, current state, approved decisions and a session handoff.

## Try the practice vault

1. Download this repository with **Code → Download ZIP**, or copy this folder.
2. Open a terminal inside `starter-vault` and launch your installed Claude Code with `claude`.
3. Use **Ingest one source** from [PROMPTS.md](PROMPTS.md) for `01-newsletter-brief.md`.
4. Review the changes, then process `02-publishing-decision.md`.
5. Start a new session in the same folder. Use **Check a fresh session** and compare with [EXPECTED.md](EXPECTED.md).

| Location | Purpose |
| --- | --- |
| [sources/](starter-vault/sources/) | Original material the agent leaves unchanged |
| [wiki/index.md](starter-vault/wiki/index.md) | A short map |
| [current.md](starter-vault/wiki/projects/newsletter/current.md) | Goal, current constraints and open questions |
| [decisions.md](starter-vault/wiki/projects/newsletter/decisions.md) | Approved decisions with evidence and preserved history |
| [log.md](starter-vault/log.md) | What changed |
| [CLAUDE.md](starter-vault/CLAUDE.md) | Reading and update instructions |

## The useful test

The first fictional source approves a weekly newsletter. The second explicitly replaces it with an issue every two weeks. A video edition remains a proposal.

The agent should recover the approved current decision and admit that nobody has been named to edit the videos. Keep the answer key outside the vault available to the agent.

## Use your own material

Copy the vault into a separate folder. Replace the fictional sources and project name. Process one source at a time and review the edits.

This is a file structure and prompts, not a model integration. The structure and links are checked; no Claude Code run or model-accuracy result is claimed. File/tool permissions must enforce any access restrictions you need.

## Compare with a completed example

The [written answer key](completed-example/) shows the reconciled current state, decision ledger and next-session handoff. Keep it outside your agent's test vault. It is a worked editorial example, not evidence of a Claude Code run.

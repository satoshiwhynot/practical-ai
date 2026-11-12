# Offline-search behavior contract

Practice template, revision 0. No target has been investigated.

Illustrative boundary: `search(query, limit, offset)`.

| Behavior | Verified rule | Supporting case | Open question |
| --- | --- | --- | --- |
| Empty query | UNKNOWN | — | Recent items, all items, none or error? |
| Ordinary spaces | UNKNOWN | — | Trim which characters? |
| Unicode normalization | UNKNOWN | — | NFC, NFKC or neither? |
| Matching fields | UNKNOWN | — | Title, body or other fields? |
| Multiple terms | UNKNOWN | — | AND, OR or phrase? |
| Ordering and ties | UNKNOWN | — | Rank, recency and stable tie rule? |
| Pagination | UNKNOWN | — | Limit defaults, range and offset? |
| Wrong input types | UNKNOWN | — | Error category at this boundary? |
| Index updates | UNKNOWN | — | Which wait condition proves visibility? |

Implement supported rules. Escalate unresolved behavior to investigation.

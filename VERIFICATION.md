# Verification

Release check: 16 November 2026.

## Shotplan

- Python 3.9.6: nine unittest cases passed.
- Sample compiled to four shots, 14 seconds, 10 planned attempts and USD 5.75 estimated generation cost.
- Generated HTML, Markdown and JSON are committed beside the sample CSV.
- Numeric validation, duplicate IDs, CSV quoting, output preservation on invalid input and reference path boundaries are covered by tests.

## Framekit

- Ten JavaScript behavior checks passed using DOM and Canvas doubles; see [the test file](tools/framekit/tests/behavior.cjs).
- Chrome browser check: the sample set, columns, theme and frame reordering worked on the public demo. An exported 1600 × 1699 PNG was downloaded and visually inspected.
- Real-file format coverage, keyboard behavior, narrow viewports and cross-browser rendering remain on the manual checklist.
- The [manual checklist](tools/framekit/docs/verification.md) makes the remaining browser checks explicit.

## Documentation

Relative Markdown links, image paths and SVG syntax are checked against repository files. Preview SVGs are interface illustrations using sample data, not screenshots. Worked newsletter memory is a written answer key, not a measured model test.

No paid model generation or provider integration was run. Costs in the film example are fictional planning inputs.

## GitHub Actions

The latest code checks passed for both standalone repositories and this library. Shotplan ran on Python 3.10 and 3.13; Framekit behavior checks ran on Node 22. The first library run failed during setup of Python 3.9 on the hosted runner; the supported CI matrix was then corrected. Python 3.9.6 was tested locally.

# Verification

Release check: 16 November 2026.

## Shotplan

- Python 3.9.6: nine unittest cases passed.
- Sample compiled to four shots, 14 seconds, 11 planned attempts and USD 5.75 estimated generation cost.
- Generated HTML, Markdown and JSON are committed beside the sample CSV.
- Numeric validation, duplicate IDs, CSV quoting, output preservation on invalid input and reference path boundaries are covered by tests.

## Framekit

- Ten JavaScript behavior checks passed using DOM and Canvas doubles; see [the test file](tools/framekit/tests/behavior.cjs).
- These checks do not prove image decoding, actual exported PNG pixels, keyboard behavior or cross-browser rendering.
- The [manual checklist](tools/framekit/docs/verification.md) makes the remaining browser checks explicit.

## Documentation

Relative Markdown links, image paths and SVG syntax are checked against repository files. Preview SVGs are interface illustrations using sample data, not screenshots. Worked newsletter memory is a written answer key, not a measured model test.

No paid model generation or provider integration was run. Costs in the film example are fictional planning inputs.

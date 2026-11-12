# Task: import a small product CSV

## Context

Add a CSV import to an existing app. Adapt this brief to its data model.

## Contract for the supplied practice fixtures

- Required header: `name,price`.
- A product needs a nonempty trimmed name and a finite price greater than or equal to zero.
- Parse CSV quoting correctly; do not split lines or fields manually.
- Preview the number of valid rows and invalid rows before saving.
- A malformed CSV is an error and does not change existing data.
- An empty file is an error; a header-only file has zero rows.
- Replacing a preview with another file must replace its state completely.
- Explain invalid rows clearly and keep existing app behavior working.

## Done

A user can select a file, inspect the preview, confirm the import and see the saved products. Show evidence from the running app for success, validation, empty input and replacing a selection.

The save/transaction policy must be decided explicitly before implementation: reject the whole import or allow confirmed valid rows. This practice brief does not silently choose that behavior.

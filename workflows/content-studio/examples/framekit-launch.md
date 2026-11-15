# Worked example: explain Framekit

This is an editorial example using the real tool in this repository. The drafts below have not been posted. No audience, revenue or time-saving results are invented.

## Source brief

**Product:** [Framekit](../../../tools/framekit), a local contact-sheet maker.

**Reader:** a solo visual creator comparing photo selects, generated frames or design variations.

**Problem:** separate images make it awkward to discuss a whole set and point to one exact variation.

**Inspectable facts:**

| Claim | Evidence |
| --- | --- |
| Produces a numbered contact sheet | [Canvas rendering and label logic](../../../tools/framekit/app.js) |
| Exports a 1600 px wide PNG | [Canvas width and export code](../../../tools/framekit/index.html), [export handler](../../../tools/framekit/app.js) |
| Has 2–5 columns and three frame shapes | [Layout controls](../../../tools/framekit/index.html) |
| Does not upload selected images | [Complete application source](../../../tools/framekit/app.js); image data stays in browser memory |
| Includes a sample without requiring private files | [Canvas-drawn demo handler](../../../tools/framekit/app.js) |

**Useful promise:** put a visual set on one numbered sheet that another person can review.

**Limits to preserve in the copy:** PNG/JPEG/WebP only; 40 images maximum; no saved projects; no video export; no AI generation inside the tool.

**Action:** download the repository, open `tools/framekit/index.html`, try the sample and export.

## Drafts

### 1. Short launch post

Comparing image variations? Put the whole set on one sheet.

Framekit turns local images into a numbered contact sheet. Reorder them, add a note and export a PNG. No upload or account.

Open the tool and try the sample set:
https://github.com/satoshiwhynot/practical-ai/tree/main/tools/framekit

### 2. A practical follow-up

“Make it better” is hard to act on.

“Use the silhouette from 02, the light from 05 and the background from 01” gives the next iteration a direction.

That's the point of numbered contact sheets. Framekit makes one locally from your image set:
https://github.com/satoshiwhynot/practical-ai/tree/main/tools/framekit

### 3. Repository release note

Added Framekit: a local browser tool for comparing image sets. It includes numbered captions, layout controls, paper and ink themes, ordering, a review note and PNG export. The six sample forms are drawn locally. Open `tools/framekit/index.html` to try it.

## Claim review

| Draft claim | Decision |
| --- | --- |
| “No upload or account” | Supported by the implementation; external source links still open when clicked |
| “Saves hours” | Omit: no timing study |
| “Used by thousands of creators” | Omit: no usage evidence |
| “Works on every device” | Omit: broad device testing has not been performed |
| “AI-powered contact sheets” | Omit: composition is local Canvas rendering |

## Next production step

Record a short real demonstration: add six non-private images, reorder one, export the sheet, and open the exported PNG. Use that result as the launch visual. The overview SVG in the repository is an illustration of the interface, not a screen recording.

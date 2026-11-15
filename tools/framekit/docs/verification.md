# Verification

Ten automated behavior checks passed on 16 November 2026 using DOM and Canvas doubles: initial state, sample data, reordering, removing, layout dimensions, download request, clearing, format and size validation, and accepted-file handling. These checks do not verify actual pixels, browser decoding or a real downloaded image.

Browser verification is still pending. Use a current desktop browser and record the results below.

- [ ] Load the sample set: six numbered frames, title and note appear.
- [ ] Change columns, crop mode, frame shape and theme; preview updates.
- [ ] Reorder and remove an image; the sheet and list agree.
- [ ] Export a PNG; open it and check the title, frames and labels.
- [ ] Add a real PNG/JPEG/WebP; unsupported files produce a readable message.
- [ ] Clear the set; export is disabled and the empty state returns.
- [ ] At a narrow viewport, controls and preview remain usable.
- [ ] Navigate the controls with a keyboard.

The tool does not modify original files. Do not use private images when recording public test evidence.

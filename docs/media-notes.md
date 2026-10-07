# Media notes — Dr. Hanna portrait

## Attempt

- Tool: Cursor GenerateImage, with a reference image.
- Reference: `public/media/portraits/dr-hanna-source.jpg` (the published portrait, about 125 px).
- Prompt: an identity-preserving medium-format editorial portrait of the same man — same face, hairline, smile, age, and skin tone — in a white coat, light blue shirt, and red tie, photographed in a warm plaster consult room with raking window light and navy shadows. No other people. No text.
- The brief asked for 4:5. The tool’s closest ratio is 3:4, which was used.
- Output was reviewed against the source portrait.

## Decision: discarded

The result was not unmistakably the same man. It reads as a younger, different face (darker hair, different age and features) than the published photograph of Dr. Donald P. Hanna. It was not copied into the site.

## What shipped

`public/media/portraits/dr-hanna-upscaled-500.jpg` — the real published portrait, Lanczos-upscaled — shown at 200 CSS pixels (under the 220 px cap) in a plaster mat, caption “DR. DONALD P. HANNA”. The same file is used smaller in the “in his words” margin notes.

No other staff portraits were generated. Procedure plates are the supplied model photographs. Before-and-after and patient-result photos are not hosted; gallery categories link to the live site.

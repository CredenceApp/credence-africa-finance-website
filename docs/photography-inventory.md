# Photography inventory (internal — not served by the website)

Source of truth for image ids: `src/images.ts`. All five images are served from `images.unsplash.com` (the free Unsplash library CDN, not `plus.unsplash.com`), via the `Photo` component with the Credence grading applied in CSS.

Status for every row: RETAINED. Not replaced. All five URLs returned HTTP 200 when checked.
Licence: Unsplash Licence presumed from the host. Photographer, photo page URL and Unsplash+ status could NOT be confirmed from this environment (the photo pages are not resolvable from the CDN ids). Confirm each on unsplash.com before launch and record the URL here.

| Key | Used in | Source | Photo page URL | Status | Open concern |
|---|---|---|---|---|---|
| `agriculture` (1700241739138-4ec27c548035) | Home / Real economy (agriculture, full bleed) | Unsplash CDN | to confirm | Retained | Confirm licence and photographer; check for identifiable people |
| `energy` (1786532852011-443cba5dc9fe) | Home / Real economy (energy) | Unsplash CDN | to confirm | Retained | Confirm licence; check for third-party branding |
| `minerals` (1523848309072-c199db53f137) | Home / Real economy (minerals) | Unsplash CDN | to confirm | Retained | Confirm licence; check for third-party branding |
| `border` (1769144256181-698b8f807066) | Home / Real economy (cross-border) | Unsplash CDN | to confirm | Retained | Confirm licence; check for logos or vehicle branding |
| `merchant` (1687422809617-a7d97879b3b0) | Merchants hero; Home / Two sides | Unsplash CDN | to confirm | Retained | Confirm licence; check for identifiable people |

The "Prototype photography" overlay has been removed from public rendering. Removing the label is not evidence that rights are cleared.

# Chapter storefront

## Stronger preview depth — 19 October 2026

Owner requested a more noticeable professional 3D bulge and stronger shadow for previews 01/02. Their surfaces now lift 10px, enlarge 2.5% and tilt 2 degrees on hover, scrolling or keyboard focus. A restrained radial highlight and layered shadow give depth without borders or visible scrollbars. Reduced-motion users receive the shadow/highlight without movement. Only the two gallery previews are affected. Restore checkpoint: checkpoint/before-stronger-preview-depth-20261019.

## Preview pop-outs — 19 October 2026

Only previews 01/02 changed: borderless preview surfaces, no social header frame, subtle hover/scroll lift and shadow, hidden embedded scrollbars with scrolling preserved. Click a thumbnail or its accessible expand button to open a scrollable dialog; close button, Escape and backdrop dismissal supported. Mobile expand buttons work independently of Interact/Done. Original linked titles, standalone websites, custom package and enquiries are unchanged.

Chrome checked both pop-outs, thumbnail click, scrolling, hidden scrollbar styling, close/Escape, zero frame borders and 390px mobile fit without overflow. 13 tests, syntax and build passed. Restore checkpoint: checkpoint/before-preview-popouts-20261019.

## Latest refinement — 19 October 2026

Gallery cards now use rounded social-post styling, no embedded site header/footer and softer sans-serif titles beneath each preview. Titles link to each original website in a new tab. Normal wheel/trackpad scrolling is native, with edge and overshoot containment instead of replacing every wheel event with an immediate scroll.

Explore a custom website opens a three-step section: proposed package, payment explanation, review/enquiry. No prices or payment terms were invented. Enquiries prepare a validated, encoded email draft addressed to inventure.contact@gmail.com; the visitor must send from their email app. Direct email links are available. No automatic email delivery or real payment processing is configured or claimed.

13 tests pass, including recipient/encoding/header-injection checks, plus static build and syntax checks. Chrome checked the three-step route, Signal selection, form prefill, email draft generation without sending, post appearance, native scrolling and edge containment. Mobile viewport checks are recorded in the current delivery; physical touch-device smoothness and actual email receipt are not claimed. Restore checkpoint: checkpoint/before-post-preview-and-enquiries-20261019. Older demo-only notes below describe the previous revision.

Chapter is now the main storefront. Signal (01) and Framework (02) are independent, same-origin copies in `previews/`; the original repositories and NEXTUP were not changed. Keep these previews self-contained when updating them.

`content.js` contains template names, categories, descriptions and price labels. Prices remain “Price on request” because no actual prices were approved. `storefront.js` renders the gallery and its interactions; `storefront.css` preserves the Chapter palette and responsive design.

## Before accepting customers

- Agree actual template prices, currency, licence, delivery and refund terms.
- Connect secure hosted checkout and fulfilment. Never put payment secrets in this static project.
- Connect customization enquiries to a real recipient/backend, add appropriate privacy wording and test actual delivery. Current form is explicitly demo-only and sends/stores nothing.

## Verification

11 existing form tests and static build passed. Chrome checked both embedded demos loading, Signal wheel scrolling, top/bottom containment, main-page scrolling outside the preview, category filtering, checkout-unavailable dialog and customization template prefill. Narrow 390px layout checked without horizontal overflow; Interact/Done toggles and overlay state checked. Full-preview links use local demo URLs with target=_blank and rel=noopener. No physical mobile device or real payment/enquiry delivery is claimed tested.

Checkpoint: `checkpoint/before-template-storefront-20261019`. GitHub Pages publishes main at the repository root. No dependency installation is required.

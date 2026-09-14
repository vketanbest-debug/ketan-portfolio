# Ketan Vishwakarma — portfolio design system

## Direction
An editorial portfolio for a Creative Lead: clear narratives, oversized type, purposeful motion and campaign work given room to speak. Adapt the supplied Raycast reference into a reading-first portfolio. Retain the black canvas, restrained coral, neutral buttons, fine borders, 8px spacing and Inter typography; replace software-style chrome with editorial layouts. Display typography uses tighter tracking as an intentional portfolio adaptation.

## Tokens
Canvas #040506; surface #0c0d0f; primary text #f4f4f4; secondary text #a4a5a9; border #292a2d; accent #ff6363; primary action #e6e6e6 with #17181a text. Coral marks personal identity, reading progress and focus. Original campaign artwork retains its own brand palette.

Inter 400–650 for display, headings and body; Georgia italic for one expressive phrase per hero. Fluid display 52–104px, section headings 32–60px, body 17px with 1.8 line height. Secondary metadata 12px. Main labels 14px. Spacing 8, 16, 24, 32, 40, 48, 64, 80, 96px. Corners 8px for controls, 12–16px for media. Hairline borders rather than heavy shadows.

## Portfolio structure
1. Hero: Creative Lead positioning, supplied portrait, selected-work link, Mumbai location.
2. Selected work: five visual bento cards and five further-exploration links. All ten projects open distinct local case-study pages.
3. About and approach: creative strategy, art direction, integrated production and team leadership grounded in the résumé.
4. Career timeline: Angel One, YardnVision Studio, WOOTFactor Brand Architects; exact supplied dates.
5. Contact: email, LinkedIn and downloadable résumé.

## Case-study structure
Unique URL: /work/angel-one-for-everyone/. Overview → challenge → role → creative system → campaign in the wild → social and digital → impact. Sticky left navigation on desktop; sticky horizontally scrollable navigation on mobile. Active section and reading progress follow actual document position. Full-size images open in a keyboard-accessible native dialog with captions.

## Motion and performance
GSAP provides short entry reveals and scroll-aware chapter feedback. Anime.js animates image-dialog entry. Three.js provides an optional, on-demand interactive brand motif; its bundle is fetched only when requested. No scroll hijacking, autoplay video or decorative continuous render loop. Respect reduced motion. Images have dimensions and below-fold images are lazy-loaded. Website images are local, with no Wix image dependency.

## Source and review boundaries
Case copy: Portfolio Assets/01 - Angel One for Everyone - Integrated Campaign/case-study.md and project.json. Career: Vishwakarma_Ketan_CV-2_Creative Lead.pdf. 10M+ reach and 10+ formats are source-reported campaign figures; 1.1B+ IPL impressions and other résumé metrics must not be attributed to this campaign. No date, budget, invented testimonial, research sample or unsupported conversion lift added. Current build is a local review. Additional case pages and public release follow the user's review of the first case.

## Additional project pages
Distinct routes are implemented for product-led campaigns, Angel One × IPL, Pesto, MyMuse, cinematic watch films, YouTube education, brand films, banking events and Toyota × Drum Tao. Each has source-based copy, a customized editorial opening, project-specific section headings and media layouts. Galleries preserve artwork proportions; YouTube films load on demand. Dark mode and the warm #e2dfd7 light canvas apply throughout. Chapter navigation is sticky on desktop and horizontally scrollable on mobile. The user authorized these remaining pages after reviewing the first case.

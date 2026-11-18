# Sovereign Modern College — GitHub Pages package

## Included
- 13 language editions in the requested order: Polish, English, Spanish, French, German, Italian, Russian, Simplified Chinese, Traditional Chinese, Korean, Japanese, Thai, Vietnamese.
- Static home, charter, schools index, nine school pages, course catalogue, faculty, research, library, document verification, contact and legal pages in each language.
- Original SMC crest SVGs supplied for the project; responsive CSS; small JavaScript for mobile navigation and language-choice persistence.
- Per-page titles, descriptions, canonical URLs, hreflang alternates, Open Graph and Twitter metadata; sitemap and robots.txt.
- Root language detection uses browser preferences; the footer selector saves the visitor's selection. Unsupported languages fall back to Polish.
- No build step, database, framework or server-side runtime.
- 250 HTML files including 247 language-specific content pages, the browser-language landing page, a custom 404 page and image-credit notes.

## Publish to GitHub Pages
1. Create a separate repository for SMC and upload the *contents* of this folder to the repository root.
2. Open Settings → Pages. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
3. Set the Pages custom domain to `smc.edu.pl`. The root `CNAME` file is included, but repository Pages settings must also be configured.
4. Set DNS records at Regery according to GitHub's current documentation for an apex domain and optional `www` subdomain. Remove conflicting records from any prior host.
5. After DNS verification and certificate provisioning, enable **Enforce HTTPS**. Test language routing, links, image loading, 404 and mobile layouts.

GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site and https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

## Images
Photography loads from Unsplash CDN URLs. The Unsplash standard licence permits broad free use, including commercial use, subject to its terms and exclusions. Review images in context, particularly for third-party rights involving identifiable people, artwork, trademarks or private property. Attribution is appreciated but not generally required by that licence: https://unsplash.com/license

## Checks before launch
- Confirm SMC's legal operator, public institutional status, applicable authorisations, and legal contact details. This package does not claim government recognition, accreditation, degree-awarding authority, professional licensing or transferable credit.
- Review all legal notices with counsel in relevant jurisdictions, particularly education, finance, health, sexology, privacy and consumer law.
- Course titles, levels and credit counts are based on the supplied founding planning document. Course titles are translated for each locale; levels and credit counts remain planning information until formally approved.
- No faculty names, appointments, credentials, publications or certificates have been fabricated. The document-verification service is marked as inactive.
- Confirm `prof.z@smc.edu.pl` and `@SMCedupl` as public contact details.
- Have native academic-language editors review translations before using them for legal or formal institutional purposes. The Latin mottoes and official role names (Fellow, Practitioner-in-Residence, Mentor) remain in their institutional form. Course titles and the main editorial labels are localised in this revision; specialist terminology may retain established English forms where useful.

## Editing
Each page is ordinary static HTML. Shared styles are in `assets/css/site.css`; browser interactions are in `assets/js/site.js`. Update every language version and `sitemap.xml` when adding routes.

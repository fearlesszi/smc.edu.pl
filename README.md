# Sovereign Modern College — GitHub Pages package

## Included
- 13 language editions in the requested order: Polish, English, Spanish, French, German, Italian, Russian, Simplified Chinese, Traditional Chinese, Korean, Japanese, Thai, Vietnamese.
- Static home, charter, schools index, nine school pages, course catalogue, faculty, research, library, document verification, contact and legal pages in each language.
- Original SMC crest SVGs supplied for the project; responsive CSS; small JavaScript for mobile navigation and language-choice persistence.
- Per-page titles, descriptions, canonical URLs, hreflang alternates, Open Graph and Twitter metadata; sitemap and robots.txt.
- Root language detection uses browser preferences; the footer selector saves the visitor's selection. Unsupported languages fall back to Polish.
- No build step, database, framework or server-side runtime.
- 276 HTML files including 247 original language-specific content pages, 26 new admissions and credentials pages across 13 locales, the browser-language landing page, a custom 404 page and image-credit notes.

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


## November 2026 navigation and admissions update

- The primary navigation now has seven regular destinations plus one highlighted `Admissions & Credentials` call-to-action, across all 13 language editions.
- The former Library destination is now `Library & Toolkit`. Its original collection principles remain, with an added Student Digital Infrastructure & Education Offers directory and direct provider links.
- Added `/[locale]/admissions/` in all 13 locales. Every page embeds the same SMC Google Form; the form is not duplicated per language.
- Added `/[locale]/credentials/` in all 13 locales. This is a browser-only personal-record/specimen generator with print-to-PDF and 1200×630 PNG social-card export. It does not submit data to SMC or verify any achievement.
- Existing `/[locale]/verify/` pages now link to the specimen studio while continuing to distinguish self-generated material from institution-issued records.
- Updated all language-page navigation and footer links; added the 26 new routes to `sitemap.xml`.
- The supplied blue and white crest SVGs were already byte-identical to the site's existing crest assets. The supplied principal signature was copied to `assets/principal-signature.svg` for future use on documents actually reviewed and issued by the institution. It is intentionally not embedded in the public self-service generator, because visitors could otherwise create documents appearing to carry the principal's endorsement.
- Provider icons currently load as open-source Simple Icons SVG marks from `cdn.simpleicons.org`. They are recognizable brand marks, not claims of provider endorsement. Provider destinations open in a new tab.

## Important identity and eligibility notice

This website identifies as **Sovereign Modern College**. It must not borrow the regulatory status of **Signum Magnum College** merely because both use the initials “SMC”. The MFHEA audit report and WHED record identify Signum Magnum College as the Malta-based institution associated with MFHEA licence 2019-014. That licence is not evidence of accreditation or student status for Sovereign Modern College. The admissions and toolkit pages now state this distinction and link to the primary records.

- MFHEA quality audit report: https://mfhea.mt/wp-content/uploads/2026/02/EQA-Audit-Report_Signum-Magnum-College.pdf
- WHED institutional record: https://whed.net/institutions/IAU-027406

No education discount is promised. Each provider decides eligibility independently and may require institutional recognition, current enrolment, age, regional eligibility, proof documents or manual review. An `@smc.edu.pl` address alone does not guarantee approval. Do not issue or present fabricated enrolment documents.

## Deployment note

This is a static GitHub Pages site. Upload the contents of the `smc-site` folder to the repository root. For a clean, consistent deployment, replace the repository's existing site files with the contents of this updated package rather than copying only the new HTML pages. The `CNAME`, `robots.txt`, existing language directories, assets, and all other original files must remain in place.

# Password Generator

A small, dependency-free password generator using the browser’s Web Crypto API. Built by [TekiDeki](https://github.com/TekiDeki).

**[Open app](https://tekideki.github.io/Password-Generator/)** · **[Support development](https://paypal.me/TekiDeki)** · **[Apache-2.0](LICENSE)**

## Features

- Length **8–128**; generate **1–100** passwords at once. Default: 20 characters, one password.
- Select lowercase, uppercase, digits and/or 32 ASCII symbols. Optionally exclude `0 O o 1 I l |` and require every selected character set.
- Uses `crypto.getRandomValues`, rejection sampling to avoid modulo bias, and whole-candidate rejection to enforce required sets without insert/shuffle bias. There is **no `Math.random` fallback**.
- Hidden by default, explicitly reveal/hide, per-password copy, copy all, and UTF-8 TXT export with a plaintext warning and confirmation **for every download**. Leaving the tab hides revealed passwords; leaving the page clears its displayed batch where page lifecycle events permit.
- Shows the last successful batch’s count, length, alphabet size, and estimated entropy per password. Settings apply on Generate, not while typing. Low-entropy/short-password warning.
- 10 interface languages: English, Romanian, Serbian Latin/Cyrillic, German, French, Italian, Spanish, Portuguese, Dutch. The generated alphabet remains ASCII in all languages.
- Responsive layout, system-aware light/dark mode, keyboard shortcut **Ctrl/Cmd+Enter**.
- Installable PWA on supported browsers; offline app shell and license after an initial successful online visit. Secure contexts only for password generation: HTTPS or trustworthy localhost. No promise of operation from `file://` in every browser.
- Localized metadata, canonical/hreflang links, Open Graph/Twitter previews, JSON-LD, sitemap, robots, own icons, PayPal support link and source/license footer.

## Privacy and security boundaries

The app has **no backend, analytics, external scripts, fonts, runtime dependencies, password history, or password transmission**. Generated passwords live in page memory and readonly input values. They are not put into URLs, local/session storage, service-worker caches, HTML attributes, or application logs. Local storage key `tekideki_password_preferences_v1` contains **only language, theme and generation settings**. Reveal state is never saved. Network requests fetch this static app; external GitHub/PayPal links open only when you choose them.

Copying deliberately sends the selected password(s) to your device clipboard, which may be readable by other apps or clipboard history. TXT export deliberately creates a **plaintext file** readable by anyone with access to it. Clear does not clear a clipboard or delete downloaded files. Clearing references and overwriting a random-byte buffer are best effort: **JavaScript cannot guarantee secure memory erasure**. Browser extensions, compromised devices, screen capture, developer tools, and operating-system memory handling are outside this app’s protection. Clipboard refusal never automatically reveals passwords.

Use unique passwords per account, a trusted password manager, and MFA where available. A short or restricted-alphabet password can be weak despite a good random source. Increase length and/or alphabet size; 16 characters is not a universal guarantee. Some websites restrict symbols. Random collisions are possible; there is no biased duplicate-removal process. This project is not an independently audited security product and makes no unbreakability or certification claim.

The app rejects missing/failing Web Crypto, empty character selections, invalid lengths/counts and random sources that cannot produce an acceptable candidate within bounded work. Those bounds prevent hangs, **not** detection of every faulty or malicious RNG. Security assumes an uncompromised browser/OS random source. An extension or script that replaces the RNG cannot be made trustworthy by this page.

### Entropy model

For alphabet size `N`, length `L`, and selected disjoint groups of sizes `sᵢ`, unrestricted entropy is `L × log₂(N)`. When every selected group is required, inclusion–exclusion computes `V = Σ (-1)^|S| (N − Σ sᵢ)^L`, the number of valid strings; entropy is `log₂(V)` (calculated numerically via the valid fraction). Each character index is sampled uniformly; rejecting entire candidates leaves a uniform distribution over valid strings. Displayed bits are an estimate under this model and a functioning cryptographic random source, **not crack-time estimates or a rating of any individual password**. They are per password, not a sum over the batch.

## Run and deploy

Serve the repository with a static HTTPS host (for example GitHub Pages: `main`, `/`). For local testing:

```sh
python3 -m http.server 8084 --bind 0.0.0.0
# Open http://localhost:8084/ on the same device.
```

Opening a non-localhost HTTP LAN address is not a secure context and generation will be blocked. Password generation/translation/style are embedded in `index.html`; no build step is required. Additional files provide PWA, icons, SEO, and license. The service worker uses the app-specific `tekideki-password-v1` cache and does not delete other apps’ caches. Bump its version when deploying changed app files.

Language URLs: `?lang=ro`, `?lang=sr-Latn`, `?lang=sr-Cyrl`, `?lang=de`, `?lang=fr`, `?lang=it`, `?lang=es`, `?lang=pt`, `?lang=nl`. Priority: supported URL language, saved preference, browser language, English. Runtime translation metadata is a client-side enhancement; social crawlers may show the default English preview. Metadata does not guarantee indexing or search ranking. Installation availability varies by browser and platform.

## License

Copyright © 2026 Kristian Mario Mišković (TekiDeki). Licensed under the [Apache License 2.0](LICENSE); see [NOTICE](NOTICE).

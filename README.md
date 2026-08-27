# shipfront-the-corner

**Shipfront Terminal demo: THE CORNER**

Live site: [https://davidtphung.github.io/shipfront-the-corner/](https://davidtphung.github.io/shipfront-the-corner/)

## Quick Start

The site is deployed on the `gh-pages` branch. To enable GitHub Pages:

1. Go to [Repository Settings → Pages](https://github.com/davidtphung/shipfront-the-corner/settings/pages)
2. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
3. Click Save
4. Wait 1-2 minutes for the initial deployment
5. Visit [https://davidtphung.github.io/shipfront-the-corner/](https://davidtphung.github.io/shipfront-the-corner/)

## Identity

- **Language**: Terminal
- **Ground**: #000000 (black)
- **Type**: White
- **Accent**: #FF6A00 (Timetable orange)
- **Typography**: Grotesque hierarchy (Inter fallback), bold headlines, readable body, mono for labels/nav/buttons
- **Logo**: THE CORNER 2G YAW — unit cube, true 30° isometric (vertical corner leads), square viewBox, orange #FF6A00
- **Wordmark**: SHIPFRONT (white)
- **Tagline**: You Sell. We Ship.

## Structure

Three-page marketing site:
1. **Home** (`/`) - Hero, service cards, value chain, logo studies
2. **Get a Quote** (`/quote/`) - Contact form (preview only)
3. **Contact** (`/contact/`) - Location, hours, email

## CTA Design

Orange fill (#FF6A00) with BLACK label (7.31:1 contrast ratio). Never white label on orange.

## Deployment

The site is deployed from the `gh-pages` branch. All source files are also available on the `claw` branch.

**To update the live site:**
1. Make changes on `claw` branch
2. Push to `claw`
3. Copy changes to `gh-pages`:
   ```bash
   git checkout gh-pages
   git checkout claw -- index.html quote contact 404.html styles.css script.js assets .nojekyll
   git commit -m "Update site content"
   git push
   ```

## Local Development

Test the site locally:

```bash
# Option 1: Python 3
python3 -m http.server 8000

# Option 2: Node.js
npx serve .

# Option 3: PHP
php -S localhost:8000
```

Then visit http://localhost:8000

## A11y Features

- Semantic HTML with proper landmarks
- Skip to main content link
- Focus-visible indicators
- Reduced motion support
- ARIA labels and roles
- Keyboard navigation
- Minimum 44px touch targets
- No heading skips
- Unique page titles

## Technical Details

- No build process required
- Static HTML/CSS/JS only
- Lighthouse-ready
- WCAG AA compliant
- Mobile responsive
- Cross-browser compatible

---

**Shipfront** | 1933 S. Broadway, Los Angeles, CA 90007 | info@myshipfront.com

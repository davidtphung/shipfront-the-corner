# GitHub Pages Setup Instructions

The Shipfront marketing site is ready to deploy. Follow these steps to enable GitHub Pages:

## Step 1: Enable GitHub Pages

1. Go to your repository settings:
   - Navigate to https://github.com/davidtphung/shipfront-the-corner/settings/pages
   - Or: Repository → Settings → Pages (in left sidebar)

2. Configure the source:
   - Under "Build and deployment"
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/ (root)`
   - Click **Save**

3. Wait for deployment:
   - GitHub will show "Your site is ready to be published"
   - After 1-2 minutes, refresh the page
   - You'll see "Your site is live at https://davidtphung.github.io/shipfront-the-corner/"

## Step 2: Verify Deployment

Visit https://davidtphung.github.io/shipfront-the-corner/ and confirm:
- ✓ Black background with white text
- ✓ Orange (#FF6A00) isometric wire cube logo
- ✓ SHIPFRONT wordmark
- ✓ "You Sell. We Ship." tagline
- ✓ Four service cards (hover to reveal text)
- ✓ Navigation works: Home, Contact, Get a Quote

## Step 3: Test All Pages

- **Home**: https://davidtphung.github.io/shipfront-the-corner/
- **Get a Quote**: https://davidtphung.github.io/shipfront-the-corner/quote/
- **Contact**: https://davidtphung.github.io/shipfront-the-corner/contact/

## Troubleshooting

### If the site doesn't load:
1. Check that `gh-pages` branch exists: https://github.com/davidtphung/shipfront-the-corner/tree/gh-pages
2. Ensure Pages is configured to use `gh-pages` branch (not `claw`)
3. Wait 2-3 minutes after enabling Pages for the first time
4. Check GitHub Actions for any deployment errors

### If styles don't load:
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check browser console for 404 errors

## Alternative: Local Testing

Before enabling Pages, test locally:

```bash
# Navigate to the repository
cd shipfront-the-corner

# Start a local server (choose one):
python3 -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000

# Visit http://localhost:8000 in your browser
```

## Need Help?

If you see a 404 error after following these steps:
1. Confirm Pages is enabled in Settings
2. Confirm `gh-pages` is selected as the source branch
3. Check the Actions tab for deployment status
4. Wait a few more minutes (first deployment can take 3-5 minutes)

---

Once enabled, the site will automatically redeploy whenever you push to the `gh-pages` branch.

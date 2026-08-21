# Shipfront - Quick Reference

## 🚀 Enable GitHub Pages (2 minutes)

**URL**: https://github.com/davidtphung/shipfront-the-corner/settings/pages

**Settings**:
- Source: **Deploy from a branch**
- Branch: **gh-pages**
- Folder: **/ (root)**

**Result**: https://davidtphung.github.io/shipfront-the-corner/

## 📁 Site Structure

```
3 pages: Home (/) | Quote (/quote/) | Contact (/contact/)
```

## 🎨 Identity

- **Ground**: #000000 (black)
- **Text**: White
- **Accent**: #FF6A00 (orange)
- **Logo**: 2G YAW isometric wire cube
- **Wordmark**: SHIPFRONT
- **Tagline**: You Sell. We Ship.

## 📍 Contact Info

```
Shipfront
1933 S. Broadway
Los Angeles, CA 90007

Monday-Friday: 9 am - 5 pm
Saturday-Sunday: Appointment only

Email: info@myshipfront.com
```

## ✅ Features

- Four service cards (hover to reveal)
- Contact form (preview mode)
- Value chain visualization
- Logo studies (2A-2J)
- Full accessibility (WCAG AA)
- Mobile responsive
- No build required

## 📚 Documentation

- **README.md** - Overview and identity
- **GITHUB_PAGES_SETUP.md** - Detailed setup instructions
- **IMPLEMENTATION_CHECKLIST.md** - Requirements verification
- **STATUS.md** - Current status and next steps

## 🧪 Local Test

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## 🔄 Deploy Updates

```bash
git checkout claw
# make changes
git commit -m "Update"
git push

git checkout gh-pages
git checkout claw -- index.html quote contact 404.html styles.css script.js assets
git commit -m "Deploy"
git push
```

---

**Ready to deploy** | Just enable Pages in settings

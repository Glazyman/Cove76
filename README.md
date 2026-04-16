# Cove76 Website

Static HTML/CSS/JS website for **Cove76** — a kosher sober living home upstate New York.

## File Structure

```
Cove76/
├── index.html            # Home page
├── home.html             # The Residence page
├── program.html          # Program & Community
├── admissions.html       # Admissions process + FAQ
├── podcast.html          # The Struggle podcast page
├── referrals.html        # Referral directory + application form
├── alumni-events.html    # Alumni & Community events
├── about.html            # About Joseph Farkas
├── contact.html          # Contact (3-tab form)
├── privacy.html          # Privacy Policy
├── terms.html            # Terms of Use
├── sitemap.xml           # SEO sitemap
├── robots.txt
├── assets/
│   ├── css/styles.css    # All styles (no framework)
│   └── js/main.js        # Nav, FAQ, directory filters, YouTube lazy-load
└── data/
    └── referrals.json    # Directory provider listings (edit to add/remove)
```

## Before Going Live

### 1. Connect Forms (Required)
Replace `YOUR_FORM_ID` in the following files with your actual [Formspree](https://formspree.io) form IDs:
- `contact.html` (3 forms — family, professional, general)
- `alumni-events.html` (email signup form)
- `referrals.html` (directory application form)

Create one or multiple Formspree projects at formspree.io and replace the placeholder in:
```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

### 2. Update sitemap.xml
Replace `cove76.com` with your actual domain.

### 3. Add Real Photos
Place images in `assets/img/` and replace the `.photo-placeholder` divs with real `<img>` tags. Each placeholder has an `aria-label` describing what photo belongs there.

### 4. Add a Logo (optional for v1)
The logo is currently text-based ("Cove76" with gold accent). To add a real logo:
- Add the image to `assets/img/logo.svg` or `.png`
- Replace the text logo in each page's `<nav>` and `<footer>`

### 5. Update Referral Directory
Edit `data/referrals.json` to add real providers. Each entry supports:
- `name`, `credentials`, `initials` (2 letters for avatar)
- `category`: `therapist` | `psychiatrist` | `coach` | `employment` | `education`
- `categoryLabel`: display label
- `specialty`, `serves`, `location`
- `jewish_affirming`: `true` | `false`
- `phone`, `email`, `website`

### 6. Add Real YouTube Video IDs
Two real episodes are already embedded (EP7, EP8). To add more, find a video ID from YouTube (the part after `?v=`) and add a new embed block following the existing pattern in `podcast.html`.

## Deployment

This is a fully static site — deploy anywhere:
- **Netlify**: drag and drop the folder, or connect a GitHub repo
- **Vercel**: `vercel` CLI or GitHub integration  
- **GitHub Pages**: push to a repo, enable Pages
- **Any web host**: upload all files via FTP

No build step required.

## Design System

| Token | Value |
|---|---|
| Navy | `#1b2a4a` |
| Cream | `#f8f3ec` |
| Gold | `#c4973f` |
| Heading font | Playfair Display (Google Fonts) |
| Body font | Inter (Google Fonts) |

## Contact Info (currently in site)
- Phone: (845) 420-7227
- Email: Spctalks@gmail.com
- YouTube: [@Thestruggle.podcast](https://www.youtube.com/@Thestruggle.podcast)
- Apple Podcasts: [The Struggle](https://podcasts.apple.com/us/podcast/the-struggle/id1796423076)

# Lalgola Development Block — Official Website

A free, static, mobile-responsive website for the **Office of the Block
Development Officer, Lalgola Development Block, Murshidabad, West Bengal**.

Built with plain HTML, CSS and JavaScript only — no frameworks, no backend,
no database, no paid services. It runs entirely in the browser and can be
hosted for free on **GitHub Pages**.

---

## 1. What's in this  project

```
index.html         Home page (contains all main sections)
disclaimer.html     Privacy & Disclaimer page
404.html            Custom "page not found" page
style.css           All styling (government blue theme)
script.js           All interactivity (menu, language switch, notice search)
data.js             ALL editable website content — notices, schemes, contact info, links, etc.
assets/             Logo, favicon and image placeholders
documents/          Put downloadable PDFs / forms here
robots.txt          Search engine crawl rules
sitemap.xml         Search engine sitemap
README.md           This file
```

**You will almost never need to edit `index.html`, `style.css` or
`script.js`.** All day-to-day updates (notices, schemes, contact details,
links, office hours, etc.) are done in **`data.js`** — open it in any text
editor, change the text between the quotes, and save.

---

## 2. How to update content

Open `data.js`. It is organised into numbered sections with comments, for
example:

```js
notices: [
  {
    id: "N004",
    title: { en: "Water Supply Maintenance Notice", bn: "জল সরবরাহ রক্ষণাবেক্ষণ বিজ্ঞপ্তি" },
    date: "2026-09-01",
    department: { en: "Rural Development Section", bn: "গ্রামীণ উন্নয়ন শাখা" },
    description: { en: "...", bn: "..." },
    pdf: "water-supply-notice.pdf"
  },
]
```

To add a new notice, copy an existing block, paste it above or below, and
edit the text. To attach a PDF, place the file inside the `documents/`
folder and put its exact filename in `pdf: "..."`.

The same pattern applies to `schemes`, `services`, `administration`,
`documents`, `importantLinks`, `stats`, and `contact`.

---

## 3. Publish for free on GitHub Pages

You do not need to know how to code to publish this website. Follow these
steps exactly:

1. **Create a free GitHub account** at [github.com](https://github.com) if
   you don't already have one.

2. **Create a new public repository.**
   - Click the **+** icon (top-right) → **New repository**.
   - Give it a name, e.g. `lalgola-block`.
   - Make sure **Public** is selected.
   - Click **Create repository**.

3. **Upload all website files.**
   - On your new repository's page, click **Add file → Upload files**.
   - Drag and drop every file and folder from this project
     (`index.html`, `style.css`, `script.js`, `data.js`, `disclaimer.html`,
     `404.html`, `robots.txt`, `sitemap.xml`, the `assets` folder and the
     `documents` folder).
   - Scroll down and click **Commit changes**.

4. **Enable GitHub Pages.**
   - In your repository, click **Settings** (top menu).
   - In the left sidebar, click **Pages**.
   - Under "Build and deployment" → "Source", choose **Deploy from a
     branch**.
   - Under "Branch", choose **main** and folder **/ (root)**, then click
     **Save**.

5. **Open your website.**
   - Wait about one to two minutes.
   - Refresh the **Pages** settings screen — a message will appear:
     "Your site is live at `https://<your-username>.github.io/<repository-name>/`".
   - Click that link to view your published website.

No payment, credit card, or paid plan is required at any step.

### Keeping the sitemap accurate

After publishing, open `sitemap.xml` and `robots.txt` and replace
`https://example.github.io/lalgola-block/` with your actual GitHub Pages
web address, then re-upload those two files.

---

## 4. Making future edits

Once published, you can keep editing the site directly on GitHub:

1. Open the file you want to change (e.g. `data.js`) in your repository.
2. Click the **pencil (edit) icon**.
3. Make your changes.
4. Click **Commit changes**.
5. GitHub Pages will automatically update your live website within a
   minute or two.

---

## 5. Notes

- All officer names, phone numbers, email addresses, exact statistics and
  scheme-specific details currently show **"To be updated"** placeholders.
  Please replace these only with verified, official information.
- No Aadhaar numbers, bank details or other sensitive personal data should
  ever be collected or stored on this website.
- The site does not use any paid API, plugin, or subscription service.

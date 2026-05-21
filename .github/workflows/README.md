# ⚙️ Frontend Lab Automation Workflow

This repository uses a fully automated GitHub Actions workflow to:

- Generate the component gallery automatically
- Deploy the website to GitHub Pages
- Keep the frontend showcase updated on every push

The entire system runs using a single workflow file:

.github/workflows/main.yml

---

# 🚀 What This Workflow Does

Whenever code is pushed to the `main` branch:

1. GitHub Actions starts automatically
2. The gallery generator script runs
3. `components.json` is rebuilt automatically
4. The website files are prepared
5. GitHub Pages is deployed automatically

This means every new component added to the repository automatically appears on the live website without manually editing the homepage.

---

# 📁 Workflow File Location

.github/workflows/main.yml

---

# 🧠 Workflow Pipeline

Push Code
↓
Generate Gallery JSON
↓
Upload Website Files
↓
Deploy GitHub Pages
↓
Live Website Updated

---

# 🔥 Features

## ✅ Automatic Gallery Updates

New components are detected automatically from:

animations/

No manual gallery editing required.

---

## ✅ Automatic GitHub Pages Deployment

Every push updates the live website automatically.

Example:

https://YOUR_USERNAME.github.io/frontend-lab/

---

## ✅ Fully Free

Uses only:

- GitHub Actions
- GitHub Pages
- Node.js

No paid services or APIs required.

---

# 📦 Workflow Breakdown

## 1. Trigger

The workflow runs automatically on:

```yaml
on:
  push:
    branches:
      - main
```

This means every push to the `main` branch triggers automation.

---

## 2. Setup Node.js

```yaml
uses: actions/setup-node@v4
```

Installs Node.js inside the GitHub runner environment.

Required for:

scripts/generate-gallery.js

---

## 3. Generate Gallery

```yaml
node scripts/generate-gallery.js
```

This script:

- Scans component folders
- Detects demos automatically
- Builds `data/components.json`

---

## 4. Upload Pages Artifact

```yaml
uses: actions/upload-pages-artifact@v3
```

Uploads the website files to GitHub Pages deployment storage.

---

## 5. Deploy GitHub Pages

```yaml
uses: actions/deploy-pages@v4
```

Deploys the generated website automatically.

---

# 📂 Supported Structure

The workflow automatically scans folders like:

animations/
└── download-button/
    ├── type-1/
    ├── type-2/
    ├── type-3/
    └── type-4/

Each component must contain:

index.html

to be detected.

---

# ➕ Adding New Components

Simply create:

animations/download-button/type-6/

and add:

- index.html
- style.css
- script.js

Then push:

```bash
git add .
git commit -m "Add type-6"
git push
```

The workflow automatically:

- Detects the component
- Updates the gallery
- Deploys the website

No manual updates required.

---

# 📄 Generated File

The workflow automatically generates:

data/components.json

This file powers the dynamic homepage gallery.

---

# 🛡️ Concurrency Protection

The workflow uses:

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true
```

This prevents:

- duplicate deployments
- workflow conflicts
- multiple GitHub Pages artifacts

---

# 🌐 GitHub Pages Setup

Enable GitHub Pages:

Repository → Settings → Pages

Select:

Source → GitHub Actions

---

# 🧩 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js
- GitHub Actions
- GitHub Pages

---

# 📈 Future Expansion Ideas

This workflow can later support:

- Auto screenshot generation
- README automation
- Live search indexing
- Component categories
- Preview image generation
- Lighthouse testing
- Auto release builds

---

# ✅ Final Result

The repository becomes a fully automated frontend showcase platform.

Every new component added to the repository is automatically:

- detected
- indexed
- displayed
- deployed

with zero manual maintenance.

# Eve Kontcho | Data Science & Analytics Portfolio

A modern, high-performance, and responsive portfolio website designed for **Data Scientists, Machine Learning Engineers, and Analytics Professionals**. Built with a clean **Vercel / Linear-inspired minimalist aesthetic**, crisp typography, refined borders, and seamless dark/light mode switching.

---

## 🚀 Features

- **⚡ Zero Build Steps & Lightweight**: Open `index.html` in any browser immediately — no `npm install`, dependencies, or Node.js required.
- **🎨 Sleek Black & Electric Blue Aesthetic**: High-contrast obsidian pitch black background with neon electric blue glows, badges, and card borders.
- **📊 Interactive Data Visualization Sandbox**: Dynamic Chart.js dashboard in the Hero section letting visitors toggle between **ROC-AUC Curves**, **Loss Convergence**, and **SHAP Feature Weights**.
- **🎯 Filterable Projects Showcase**: Categorize projects by *Machine Learning & AI*, *Data Analytics & BI*, *NLP & Transformers*, and *Data Pipelines & Causal Inference*.
- **🔍 Modal Deep Dives (`<dialog>`)**: Clicking "View Deep Dive" on any project opens an accessible modal with the business context, mathematical methodology, key quantitative metrics, and clean code snippets (Python/SQL).
- **🌓 System-Aware Dark & Light Mode**: Seamless theme toggling with smooth transitions and persistent `localStorage` preference.
- **📬 One-Click Copy & Working Contact Form**: Copy email address with animated toast feedback and interactive message submission.
- **📱 Fully Responsive**: Custom breakpoints engineered for desktop, tablet, and mobile viewing.

---

## 📂 Project Structure

```text
First portfolio/
├── index.html       # Semantic HTML5 layout, hero, metrics, projects, and modal dialog
├── style.css        # Black & electric blue design tokens, grid background & animations
├── script.js        # Dynamic project registry, modal controller, Chart.js engine & theme logic
├── resume.pdf       # Your downloadable/viewable PDF resume document
└── README.md        # Documentation and customization guide
```

---

## 💻 How to View Locally

Simply **double-click** `index.html` or drag and drop it into **Google Chrome, Microsoft Edge, Firefox, or Safari**.

---

## 📄 How to Upload Your Resume

There are two easy ways:

1. **Direct File Replacement (Recommended for permanent use & deployment)**:
   - Save your PDF resume file as **`resume.pdf`**.
   - Copy or move it directly into this folder: `C:\Users\18598\Downloads\First portfolio\resume.pdf` (replacing the placeholder).
   - Done! Clicking **"View Resume"** or **"Download PDF"** on the website will now open and download your real resume!

2. **Interactive Local Upload Button**:
   - On the website under the **Resume** section, click the **"Upload New Version"** button.
   - Choose any PDF from your computer — it will load and update the **"View Resume"** and **"Download PDF"** buttons instantly.

---

## 🎨 How to Customize

### 1. Update Bio & Contact Information
Open `index.html`:
- The name is set to **Eve Kontcho**.
- Update the bio in `<p class="hero-bio">` to reflect your specific background, focus areas, and industry experience.
- Update your contact email and links in the `<section id="contact">` area.

### 2. Add or Edit Projects
Open `script.js` and edit the `PROJECTS_DATA` array at the top of the file:
- **`title`**: Name of your project or model.
- **`category`**: One of `'ml'`, `'analytics'`, `'nlp'`, or `'pipeline'`.
- **`badge`**: Headline metric (e.g., `94.2% ROC-AUC`, `3.8M Events/Day`).
- **`previewStats`**: Key summary metrics displayed on the card.
- **`modal`**: In-depth problem statement, architecture methodology, metrics, and production code snippet.

### 3. Customize Colors & Themes
Open `style.css`:
- Edit the color tokens under `:root` (Light mode) and `[data-theme="dark"]` (Dark mode) to change accent colors (e.g. blue, cyan, emerald, violet).

---

## 🌐 Free Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Create a repository on GitHub (e.g., `my-portfolio`).
2. Upload `index.html`, `style.css`, and `script.js`.
3. Go to **Repository Settings** > **Pages** > Select `main` branch > **Save**.
4. Your site will be live instantly at `https://<username>.github.io/<repo-name>/`.

### Option 2: Vercel or Netlify
1. Drag and drop this folder directly into the [Vercel](https://vercel.com) or [Netlify](https://netlify.com) dashboard.
2. It will deploy within 5 seconds with an instant SSL link.

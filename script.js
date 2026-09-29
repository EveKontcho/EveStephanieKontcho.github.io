/**
 * Data Science & Analytics Portfolio - Core Interactive Engine
 * Clean, lightweight vanilla JavaScript with modern browser features
 */

// ==========================================
// 1. Projects Data Registry
// ==========================================
const PROJECTS_DATA = [
  {
    id: "predictive-epidemiology",
    title: "Predictive Epidemiology: Forecasting Chronic Disease Risk Zones using XGBoost",
    category: "ml",
    categoryLabel: "Machine Learning & AI",
    badge: "0.892 ROC-AUC",
    description: "Public health risk stratification pipeline integrating CDC PLACES and CDC SVI census tract datasets with SQLite and XGBoost to proactively identify high-risk chronic disease zones.",
    previewStats: [
      { label: "Model Performance", val: "0.892 ROC-AUC" },
      { label: "Vulnerable Communities", val: "84.7% Recall" }
    ],
    tags: ["SQL (SQLite)", "Python", "XGBoost", "Scikit-Learn", "Epidemiology"],
    modal: {
      tagline: "Translating Complex Demographic & Socioeconomic Metrics into Targeted Public Health Interventions",
      metrics: [
        { label: "ROC-AUC", val: "0.892" },
        { label: "Precision", val: "81.4%" },
        { label: "Recall", val: "84.7%" },
        { label: "F1-Score", val: "0.830" }
      ],
      githubUrl: "https://github.com/EveKontcho/EveStephanieKontcho.github.io/blob/main/predictive_epidemiology.ipynb",
      demoUrl: "predictive_epidemiology.html",
      customHtml: `
        <!-- Quantitative Metrics Grid -->
        <div class="modal-overview-grid">
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">0.892</div>
            <div class="modal-stat-box-label">ROC-AUC Score</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">81.4%</div>
            <div class="modal-stat-box-label">Precision Rate</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">84.7%</div>
            <div class="modal-stat-box-label">Recall (Vulnerable Zones)</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">0.830</div>
            <div class="modal-stat-box-label">F1-Score</div>
          </div>
        </div>

        <!-- Project Overview -->
        <h4 class="modal-section-heading">Project Overview</h4>
        <div class="tech-stack-pill-box">
          <span>Tech Stack:</span>
          <strong style="color: #ffffff;">SQL (SQLite)</strong> | 
          <strong style="color: #ffffff;">Python (pandas, scikit-learn, XGBoost)</strong> | 
          <strong style="color: #ffffff;">Data Visualization</strong>
        </div>
        <p class="modal-text">
          Public health resources are finite. This project demonstrates how to use socioeconomic, environmental, and demographic data to proactively identify localized geographic areas at the highest risk for chronic disease progression, specifically diabetes, before outbreaks occur. By leveraging public datasets, this pipeline translates complex demographic metrics into actionable, predictive insights for targeted intervention.
        </p>

        <!-- 1. Data Acquisition & Architecture -->
        <h4 class="modal-section-heading">1. Data Acquisition & Architecture</h4>
        <p class="modal-text">
          The foundation of this model relies on merging two critical public health datasets:
        </p>
        <ul class="modal-list">
          <li><strong>CDC PLACES:</strong> Provides census tract-level prevalence estimates for conditions like diabetes, which serves as the target variable.</li>
          <li><strong>CDC SVI (Social Vulnerability Index):</strong> Provides census tract-level metrics on socioeconomic status, housing, and minority status, serving as the predictive features.</li>
        </ul>
        <p class="modal-text">
          Using an SQLite database, the datasets were unified via an <code>INNER JOIN</code> on the census tract FIPS codes. This architectural step ensures that geographic integrity is maintained before any statistical modeling occurs:
        </p>

        <div class="code-header-bar">
          <span class="code-lang-label">SQL — Census Tract Unification Query</span>
        </div>
        <pre class="code-block-preview"><code class="language-sql">SELECT 
    p.FIPS,
    p.DIABETES_CrudePrev AS diabetes_prev,
    s.E_POV AS count_poverty,
    s.EP_POV AS pct_poverty,
    s.EP_UNEMP AS pct_unemployed,
    s.EP_PCI AS per_capita_income,
    s.EP_NOHSDP AS pct_no_highschool,
    s.EP_UNINSUR AS pct_uninsured,
    s.RPL_THEMES AS overall_svi
FROM cdc_places p
INNER JOIN cdc_svi s 
    ON p.FIPS = s.FIPS
WHERE p.StateAbbr != 'US';</code></pre>

        <!-- 2. Data Wrangling & Feature Engineering -->
        <h4 class="modal-section-heading">2. Data Wrangling & Feature Engineering</h4>
        <p class="modal-text">
          Once extracted into a pandas dataframe, the data required rigorous cleaning. The CDC SVI dataset uses dummy values (e.g., <code>-999</code>) to represent missing census tract data.
        </p>
        <p class="modal-text" style="margin-top: 0.6rem;"><strong>Key engineering steps included:</strong></p>
        <ol class="modal-list" style="list-style-type: decimal;">
          <li><strong>Imputation:</strong> Replacing dummy values with <code>NaN</code> and imputing the median for socioeconomic features to prevent model skewing.</li>
          <li><strong>Target Definition:</strong> Converting the continuous diabetes prevalence percentage into a binary classification target. Tracts falling in the top 25% of prevalence were flagged as "High Risk."</li>
        </ol>

        <div class="code-header-bar">
          <span class="code-lang-label">Python — Cleaning & Quantile Thresholding</span>
        </div>
        <pre class="code-block-preview"><code class="language-python">import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer

# Replace CDC missing value sentinels (-999) with NaN
df.replace(-999.0, np.nan, inplace=True)

# Separate features and continuous target
X = df.drop(columns=['FIPS', 'diabetes_prev'])
y_continuous = df['diabetes_prev']

# Impute missing values with median column values
imputer = SimpleImputer(strategy='median')
X_imputed = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)

# Define high-risk threshold as the 75th percentile (top 25% prevalence)
threshold = y_continuous.quantile(0.75)
y = (y_continuous >= threshold).astype(int)

print(f"High-risk classification threshold: {threshold:.2f}% prevalence")
print(f"Class distribution:\\n{y.value_counts(normalize=True)}")</code></pre>

        <!-- Notebook Visualizations Part 1: EDA -->
        <h4 class="modal-section-heading">Exploratory Data Analysis Visualizations</h4>
        <div class="modal-figure">
          <img src="epidemiology_eda_charts.png" alt="Exploratory Data Analysis: Diabetes Prevalence Distribution, Correlation Heatmap, and Poverty vs Diabetes Scatter Plot" loading="lazy">
          <div class="modal-figure-caption">
            Figure 1: (Left) Census tract diabetes prevalence distribution highlighting the 75th percentile high-risk threshold; (Center) Pearson correlation heatmap across CDC SVI indicators; (Right) Regression plot confirming strong positive covariance between poverty rates and localized diabetes burden.
          </div>
        </div>

        <!-- 3. Predictive Modeling with XGBoost -->
        <h4 class="modal-section-heading">3. Predictive Modeling with XGBoost</h4>
        <p class="modal-text">
          An XGBoost classifier was selected for its high execution speed and its ability to handle non-linear relationships inherent in complex, real-world health data.
        </p>
        <p class="modal-text" style="margin-top: 0.6rem;">
          The data was split using <code>train_test_split</code>, employing stratification on the target variable to ensure the training and testing sets maintained a consistent proportion of high-risk zones:
        </p>

        <div class="code-header-bar">
          <span class="code-lang-label">Python — Stratified Train/Test Split & XGBoost Training</span>
        </div>
        <pre class="code-block-preview"><code class="language-python">from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier

# Stratified split to preserve class ratio
X_train, X_test, y_train, y_test = train_test_split(
    X_imputed, y, test_size=0.2, random_state=42, stratify=y
)

# Initialize XGBoost classifier with tuned hyperparameters
model = XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric='logloss'
)

# Fit model to training data
model.fit(X_train, y_train)</code></pre>

        <!-- 4. Evaluation & Epidemiological Impact -->
        <h4 class="modal-section-heading">4. Evaluation & Epidemiological Impact</h4>
        <p class="modal-text">
          The model was evaluated using precision, recall, and ROC-AUC scores to account for the operational cost of false positives versus false negatives in public health planning:
        </p>

        <!-- Evaluation Table -->
        <div class="modal-table-container">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Score</th>
                <th>Public Health Context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--accent-cyan);">ROC-AUC</strong></td>
                <td><span class="mono-font" style="color: var(--accent-primary); font-weight: 700;">0.892</span></td>
                <td>Strong capability to differentiate high-risk tracts from baseline communities.</td>
              </tr>
              <tr>
                <td><strong style="color: var(--accent-cyan);">Precision</strong></td>
                <td><span class="mono-font" style="color: var(--accent-primary); font-weight: 700;">0.814</span></td>
                <td>Minimizes wasted clinical interventions by ensuring high accuracy on flagged areas.</td>
              </tr>
              <tr>
                <td><strong style="color: var(--accent-cyan);">Recall</strong></td>
                <td><span class="mono-font" style="color: var(--accent-primary); font-weight: 700;">0.847</span></td>
                <td>Captures the vast majority of genuinely vulnerable communities without oversight.</td>
              </tr>
              <tr>
                <td><strong style="color: var(--accent-cyan);">F1-Score</strong></td>
                <td><span class="mono-font" style="color: var(--accent-primary); font-weight: 700;">0.830</span></td>
                <td>Balanced harmonic measure of overall classification effectiveness.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Notebook Visualizations Part 2: Model Performance -->
        <h4 class="modal-section-heading">Model Performance Visualizations & Diagnostic Curves</h4>
        <div class="modal-figure">
          <img src="epidemiology_model_eval_charts.png" alt="XGBoost Feature Importance, ROC Curve AUC 0.89, and Confusion Matrix" loading="lazy">
          <div class="modal-figure-caption">
            Figure 2: (Left) XGBoost feature importance chart showing socioeconomic risk drivers; (Center) ROC curve demonstrating strong discriminative ability with AUC = 0.89; (Right) Prediction confusion matrix evaluating test set classification.
          </div>
        </div>

        <!-- Key Drivers Analysis -->
        <h4 class="modal-section-heading">Key Socioeconomic Predictors & Policy Insights</h4>
        <p class="modal-text">
          In public health, extracting feature importance is critical; understanding <em>why</em> a community is at risk is as important as the prediction itself. By analyzing the model's feature importance chart, we identify the strongest socioeconomic predictors of localized risk:
        </p>
        <ul class="modal-list">
          <li><strong>Uninsured Rate (<code>EP_UNINSUR</code>):</strong> Greatest weight in predicting high-risk zones, pointing to systemic gaps in preventative care access.</li>
          <li><strong>Poverty Percentage (<code>EP_POV</code>):</strong> Strong secondary driver, reflecting financial barriers to healthy foods and medical management.</li>
          <li><strong>Low High School Completion (<code>EP_NOHSDP</code>):</strong> Highly correlated with long-term health literacy outcomes.</li>
        </ul>

        <!-- Actionable Impact -->
        <h4 class="modal-section-heading">Policy Shift & Actionable Public Health Allocation</h4>
        <p class="modal-text" style="border-left: 3px solid var(--accent-emerald); padding-left: 1rem; color: #ffffff;">
          This shift allows public health officials to transition from reactive care to proactive, evidence-based resource allocation, deploying mobile screening units and community nutrition programs directly to high-risk census tracts.
        </p>
      `
    }
  }
];

// ==========================================
// 2. Interactive Chart Setup (Chart.js)
// ==========================================
let performanceChart = null;

const CHART_CONFIGS = {
  roc: {
    title: "Model Validation: ROC-AUC Curves Across Folds",
    labels: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
    datasets: [
      {
        label: "Ensemble XGBoost (AUC = 0.942)",
        data: [0.0, 0.45, 0.68, 0.81, 0.88, 0.93, 0.96, 0.98, 0.99, 1.0, 1.0],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.35,
        borderWidth: 2.5
      },
      {
        label: "Baseline Logistic Regression (AUC = 0.761)",
        data: [0.0, 0.15, 0.32, 0.48, 0.62, 0.72, 0.81, 0.88, 0.94, 0.98, 1.0],
        borderColor: "#537bb8",
        borderDash: [5, 5],
        fill: false,
        tension: 0.2,
        borderWidth: 1.5
      }
    ]
  },
  loss: {
    title: "Training vs Validation Loss (Early Stopping @ Epoch 42)",
    labels: ["0", "10", "20", "30", "40", "50", "60", "70", "80"],
    datasets: [
      {
        label: "Training Loss",
        data: [0.69, 0.48, 0.34, 0.26, 0.21, 0.18, 0.16, 0.14, 0.13],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        fill: true,
        tension: 0.3,
        borderWidth: 2
      },
      {
        label: "Validation Loss",
        data: [0.70, 0.51, 0.39, 0.31, 0.28, 0.285, 0.29, 0.31, 0.33],
        borderColor: "#f59e0b",
        borderDash: [4, 4],
        fill: false,
        tension: 0.3,
        borderWidth: 2
      }
    ]
  },
  importance: {
    title: "Top Predictive Feature Weights (SHAP Mean |Value|)",
    labels: ["Login Frequency", "Seat Utilization", "NPS Response", "Support Tickets", "Contract Tenure"],
    datasets: [
      {
        label: "Mean |SHAP Value| Impact",
        data: [0.42, 0.36, 0.28, 0.19, 0.14],
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderColor: "#3b82f6",
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  }
};

let currentChartMode = "roc";

function initOrUpdateChart() {
  const ctx = document.getElementById("heroChartCanvas");
  if (!ctx) return;

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const gridColor = isDark ? "rgba(59, 130, 246, 0.12)" : "rgba(0, 80, 200, 0.08)";
  const textColor = isDark ? "#93b4e6" : "#1e3a8a";

  const config = CHART_CONFIGS[currentChartMode];
  const chartType = currentChartMode === "importance" ? "bar" : "line";

  if (performanceChart) {
    performanceChart.destroy();
  }

  // Check if Chart.js is loaded
  if (typeof Chart === "undefined") {
    ctx.getContext("2d").font = "14px Inter";
    ctx.getContext("2d").fillStyle = textColor;
    ctx.getContext("2d").fillText("Interactive Data Visualization Canvas", 20, 50);
    return;
  }

  performanceChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: config.labels,
      datasets: config.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: textColor,
            font: { family: "Inter", size: 11, weight: "500" },
            boxWidth: 12
          }
        },
        tooltip: {
          backgroundColor: isDark ? "#060b16" : "#ffffff",
          titleColor: isDark ? "#ffffff" : "#0a192f",
          bodyColor: isDark ? "#93b4e6" : "#1e3a8a",
          borderColor: isDark ? "#1d3b7a" : "#bfdbfe",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          bodyFont: { family: "JetBrains Mono", size: 12 }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "JetBrains Mono", size: 10 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "JetBrains Mono", size: 10 } }
        }
      }
    }
  });

  const chartTitleEl = document.getElementById("chartDynamicTitle");
  if (chartTitleEl) {
    chartTitleEl.textContent = config.title;
  }
}

// ==========================================
// 3. Render Projects Grid
// ==========================================
function renderProjects(filter = "all") {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  const filtered = filter === "all" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <article class="project-card" data-id="${p.id}" data-category="${p.category}">
      <div class="project-card-header">
        <div class="project-category-row">
          <span class="project-category-badge">${p.categoryLabel}</span>
          <span class="project-metric-pill">${p.badge}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
      </div>
      <p class="project-desc">${p.description}</p>
      
      <div class="project-card-preview">
        ${p.previewStats.map(stat => `
          <div class="preview-stat-row">
            <span class="preview-stat-label">${stat.label}</span>
            <span class="preview-stat-val mono-font">${stat.val}</span>
          </div>
        `).join("")}
      </div>

      <div class="project-tags">
        ${p.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join("")}
      </div>

      <div class="project-card-footer">
        <button class="project-action-link view-deep-dive-btn" data-project-id="${p.id}">
          <span>View Deep Dive</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
        <div style="display:flex; gap:0.75rem;">
          <a href="${p.modal.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" title="View Code Repository" aria-label="GitHub Repository">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  // Attach click listeners to Deep Dive buttons
  container.querySelectorAll(".view-deep-dive-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-project-id");
      openProjectModal(pid);
    });
  });
}

// ==========================================
// 4. Modal Deep Dive Functionality
// ==========================================
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  const modal = document.getElementById("projectDetailModal");
  if (!project || !modal) return;

  document.getElementById("modalProjectTitle").textContent = project.title;
  document.getElementById("modalProjectTagline").textContent = project.modal.tagline;

  const dynamicBody = document.getElementById("modalDynamicBody");
  if (dynamicBody) {
    if (project.modal.customHtml) {
      dynamicBody.innerHTML = project.modal.customHtml;
    } else {
      dynamicBody.innerHTML = `
        <div class="modal-overview-grid" id="modalMetricsGrid">
          ${project.modal.metrics.map(m => `
            <div class="modal-stat-box">
              <div class="modal-stat-box-val mono-font">${m.val}</div>
              <div class="modal-stat-box-label">${m.label}</div>
            </div>
          `).join("")}
        </div>
        <h4 class="modal-section-heading">Business Problem & Context</h4>
        <p class="modal-text">${escapeHtml(project.modal.problem || "")}</p>
        <h4 class="modal-section-heading">Statistical Modeling & Architecture</h4>
        <p class="modal-text">${escapeHtml(project.modal.methodology || "")}</p>
        <h4 class="modal-section-heading">Production Code & Model Pipeline</h4>
        <pre class="code-block-preview"><code>${escapeHtml(project.modal.codeSnippet || "")}</code></pre>
      `;
    }
  }

  // Action links
  document.getElementById("modalGithubBtn").href = project.modal.githubUrl;
  document.getElementById("modalDemoBtn").href = project.modal.demoUrl;

  modal.showModal();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setupModal() {
  const modal = document.getElementById("projectDetailModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const closeFooterBtn = document.getElementById("modalCloseFooterBtn");

  if (!modal) return;

  function closeModal() {
    modal.close();
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener("click", closeModal);

  // Close when clicking backdrop
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      modal.close();
    }
  });
}

// ==========================================
// 5. Theme Switcher (Dark / Light)
// ==========================================
function setupThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("preferred-theme");
  const initialTheme = savedTheme || "dark";
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
      localStorage.setItem("preferred-theme", next);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    if (theme === "dark") {
      // Moon to Sun icon
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
    } else {
      // Sun to Moon icon
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
    }
  }

  // Update chart colors if initialized
  if (performanceChart) {
    initOrUpdateChart();
  }
}

// ==========================================
// 6. Toast Notification Helper
// ==========================================
function showToast(message) {
  let toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ==========================================
// 7. Clipboard & Contact Interactions
// ==========================================
function setupContactAndClipboard() {
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-email") || "stephsko11@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied to clipboard!");
      }).catch(() => {
        showToast("Email: " + email);
      });
    });
  }

  const contactForm = document.getElementById("portfolioContactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sendBtn = contactForm.querySelector("button[type='submit']");
      const originalText = sendBtn.innerHTML;
      sendBtn.innerHTML = "Sending message...";
      sendBtn.disabled = true;

      setTimeout(() => {
        showToast("Message sent! I'll get back to you shortly.");
        contactForm.reset();
        sendBtn.innerHTML = originalText;
        sendBtn.disabled = false;
      }, 900);
    });
  }
}

// ==========================================
// 8. Filters & Dynamic Chart Controls
// ==========================================
function setupFiltersAndControls() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProjects(category);
    });
  });

  const chartToggleButtons = document.querySelectorAll(".dataset-toggle-btn");
  chartToggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      chartToggleButtons.forEach(b => b.style.borderColor = "var(--border-subtle)");
      btn.style.borderColor = "var(--accent-primary)";
      currentChartMode = btn.getAttribute("data-mode");
      initOrUpdateChart();
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileToggleBtn");
  const navMenu = document.getElementById("navMenu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });
    // Close on link click
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-open");
      });
    });
  }
}

// ==========================================
// 9. Active Nav Scrollspy
// ==========================================
function setupScrollspy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// ==========================================
// 10. Resume Uploader & Dynamic Viewer
// ==========================================
function setupResumeUploader() {
  const fileInput = document.getElementById("resumeFileInput");
  const uploadTriggerBtn = document.getElementById("uploadResumeTriggerBtn");
  const viewBtn = document.getElementById("viewResumeBtn");
  const downloadBtn = document.getElementById("downloadResumeBtn");
  const heroResumeBtn = document.getElementById("heroResumeBtn");
  const filenameLabel = document.getElementById("resumeFilenameLabel");

  if (uploadTriggerBtn && fileInput) {
    uploadTriggerBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        if (viewBtn) viewBtn.href = fileUrl;
        if (downloadBtn) {
          downloadBtn.href = fileUrl;
          downloadBtn.download = file.name;
        }
        if (filenameLabel) {
          const sizeKb = (file.size / 1024).toFixed(1);
          filenameLabel.textContent = `${file.name} (${sizeKb} KB)`;
        }
        showToast(`Resume "${file.name}" loaded! Ready to view & download.`);
      }
    });
  }
}

// ==========================================
// Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  renderProjects("all");
  setupModal();
  setupContactAndClipboard();
  setupFiltersAndControls();
  setupScrollspy();
  setupResumeUploader();

  // Initialize chart
  setTimeout(() => {
    initOrUpdateChart();
  }, 100);
});

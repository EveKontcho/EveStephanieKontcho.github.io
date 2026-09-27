/**
 * Data Science & Analytics Portfolio - Core Interactive Engine
 * Clean, lightweight vanilla JavaScript with modern browser features
 */

// ==========================================
// 1. Projects Data Registry
// ==========================================
const PROJECTS_DATA = [
  {
    id: "customer-churn",
    title: "Predictive Customer Churn & LTV Engine",
    category: "ml",
    categoryLabel: "Machine Learning & AI",
    badge: "94.2% ROC-AUC",
    description: "End-to-end churn prediction pipeline using XGBoost and survival analysis, identifying high-risk enterprise accounts with interpretable SHAP explanations.",
    previewStats: [
      { label: "Dataset Scale", val: "1.4M Customer Records" },
      { label: "Revenue Saved", val: "$420K Projected / Year" }
    ],
    tags: ["Python", "XGBoost", "SHAP", "Scikit-Learn", "FastAPI"],
    modal: {
      tagline: "Proactive Retention Modeling for B2B Subscription Platforms",
      metrics: [
        { label: "ROC-AUC Score", val: "0.942" },
        { label: "False Positive Rate", val: "4.1%" },
        { label: "Inference Latency", val: "18ms" }
      ],
      problem: "A high-growth SaaS platform was experiencing silent churn in key accounts without early warning indicators, costing significant annual recurring revenue.",
      methodology: "Engineered 85+ behavioral and telemetry features across 180-day customer lifecycles. Implemented ensemble tree algorithms (XGBoost, LightGBM) validated with stratified K-fold cross-validation. Integrated TreeSHAP to provide account managers with actionable driver attributions for each at-risk score.",
      codeSnippet: `# XGBoost Training & SHAP Attribution Extraction
import xgboost as xgb
import shap

model = xgb.XGBClassifier(
    n_estimators=300,
    max_depth=5,
    learning_rate=0.03,
    subsample=0.85,
    eval_metric="auc"
)
model.fit(X_train, y_train, eval_set=[(X_val, y_val)], early_stopping_rounds=25)

# Calculate localized customer attribution
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)
print(f"Top Churn Risk Driver: {X_val.columns[shap_values.sum(axis=0).argmax()]}")`,
      githubUrl: "https://github.com",
      demoUrl: "https://github.com"
    }
  },
  {
    id: "retention-bi",
    title: "Enterprise SaaS Cohort Retention & Funnel BI",
    category: "analytics",
    categoryLabel: "Data Analytics & BI",
    badge: "3.8M Events/Day",
    description: "Automated dbt and Snowflake data modeling pipeline delivering executive dashboards that dissect activation cohorts and user lifetime engagement patterns.",
    previewStats: [
      { label: "ETL Latency", val: "Reduced by 68%" },
      { label: "Active Users Tracked", val: "250K+ Monthly" }
    ],
    tags: ["SQL", "Snowflake", "dbt", "Tableau", "Python"],
    modal: {
      tagline: "Scalable Dimensional Data Modeling & Growth Analytics",
      metrics: [
        { label: "Daily Event Volume", val: "3.8M+" },
        { label: "Query Speedup", val: "4.2x" },
        { label: "Data Quality Tests", val: "140 Passing" }
      ],
      problem: "Product and growth teams lacked unified visibility into customer activation funnels, causing discrepancies between marketing attribution and subscription telemetry.",
      methodology: "Architected a dimensional star schema in Snowflake with incremental dbt models. Constructed multi-touch attribution logic and cohort retention matrices, surfacing drop-off bottlenecks within 14 days of sign-up.",
      codeSnippet: `-- dbt Incremental Funnel Cohort Model
WITH events AS (
  SELECT
    user_id,
    event_timestamp,
    event_name,
    DATE_TRUNC('month', MIN(event_timestamp) OVER (PARTITION BY user_id)) AS cohort_month
  FROM {{ ref('stg_telemetry_events') }}
  {% if is_incremental() %}
    WHERE event_timestamp >= (SELECT MAX(event_timestamp) FROM {{ this }})
  {% endif %}
)
SELECT 
  cohort_month,
  DATEDIFF('month', cohort_month, DATE_TRUNC('month', event_timestamp)) AS month_number,
  COUNT(DISTINCT user_id) AS active_users
FROM events
GROUP BY 1, 2
ORDER BY 1, 2;`,
      githubUrl: "https://github.com",
      demoUrl: "https://github.com"
    }
  },
  {
    id: "market-sentiment",
    title: "Financial Market NLP & Sentiment Forecasting",
    category: "ml",
    categoryLabel: "Machine Learning & AI",
    badge: "88.7% F1-Score",
    description: "Fine-tuned FinBERT transformer model digesting live earnings transcripts, SEC 10-K filings, and news feeds to predict stock volatility movements.",
    previewStats: [
      { label: "Corpus Size", val: "50,000+ Transcripts" },
      { label: "Throughput", val: "120 docs/sec" }
    ],
    tags: ["PyTorch", "FinBERT", "HuggingFace", "Transformers", "Kafka"],
    modal: {
      tagline: "Domain-Adapted Transformer for Macroeconomic Signal Extraction",
      metrics: [
        { label: "F1 Sentiment Score", val: "0.887" },
        { label: "Corpus Processed", val: "12GB Raw Text" },
        { label: "Real-time Stream", val: "Kafka + Redis" }
      ],
      problem: "Disparate unstructured financial filings and market commentary required dozens of manual analyst hours to gauge corporate management sentiment and forward guidance.",
      methodology: "Preprocessed and tokenized quarterly earnings call transcripts. Fine-tuned FinBERT using masked language modeling and sequence classification with PyTorch. Deployed an asynchronous Kafka consumer pipeline extracting sentiment shifts and volatility indicators.",
      codeSnippet: `# FinBERT Sentiment Pipeline
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

def analyze_transcript_tone(paragraphs):
    inputs = tokenizer(paragraphs, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
        probabilities = torch.softmax(logits, dim=1)
    return probabilities.cpu().numpy() # [Positive, Negative, Neutral]`,
      githubUrl: "https://github.com",
      demoUrl: "https://github.com"
    }
  },
  {
    id: "healthcare-classifier",
    title: "Clinical Risk Stratification & Outcome Classifier",
    category: "ml",
    categoryLabel: "Machine Learning & AI",
    badge: "0.91 Sensitivity",
    description: "Deep learning TabNet classifier predicting 30-day patient hospital readmission risks, accounting for severe class imbalance and medical covariates.",
    previewStats: [
      { label: "Patient Cohort", val: "85,000 Admissions" },
      { label: "Focal Loss", val: "Imbalance Optimized" }
    ],
    tags: ["PyTorch", "TabNet", "Optuna", "Pandas", "Scikit-Learn"],
    modal: {
      tagline: "Interpretable Deep Learning for Healthcare Decision Support",
      metrics: [
        { label: "Sensitivity / Recall", val: "91.4%" },
        { label: "Specificity", val: "89.2%" },
        { label: "AUROC", val: "0.931" }
      ],
      problem: "Hospitals face severe penalties for preventable 30-day patient readmissions, but tabular electronic health records (EHR) suffer from extreme noise and missing values.",
      methodology: "Implemented self-supervised tabular deep learning (TabNet) with sequential attention. Utilized Bayesian hyperparameter optimization via Optuna and Focal Loss to counteract a 9:1 class imbalance, generating clinical risk confidence intervals.",
      codeSnippet: `# TabNet Model with Focal Loss for Imbalanced Medical Cohorts
from pytorch_tabnet.tab_model import TabNetClassifier
import torch.nn as nn

clf = TabNetClassifier(
    n_d=64, n_a=64, n_steps=5,
    gamma=1.5,
    lambda_sparse=1e-4,
    optimizer_fn=torch.optim.AdamW,
    optimizer_params=dict(lr=2e-2, weight_decay=1e-5),
    mask_type='entmax'
)
clf.fit(
    X_train=X_train, y_train=y_train,
    eval_set=[(X_val, y_val)],
    patience=20, max_epochs=150
)`,
      githubUrl: "https://github.com",
      demoUrl: "https://github.com"
    }
  },
  {
    id: "geospatial-mobility",
    title: "Urban Mobility & Logistics Demand Clustering",
    category: "analytics",
    categoryLabel: "Data Analytics & BI",
    badge: "15M GPS Points",
    description: "Spatial-temporal analytics engine leveraging Uber's H3 spatial indexes to optimize courier dispatch zones and dynamic demand surge zones.",
    previewStats: [
      { label: "Spatial Grid", val: "H3 Res-8 Hexagons" },
      { label: "Dispatch Latency", val: "-22% Transit Time" }
    ],
    tags: ["GeoPandas", "H3", "PySpark", "Kepler.gl", "PostGIS"],
    modal: {
      tagline: "High-Resolution Spatial-Temporal Optimization for On-Demand Delivery",
      metrics: [
        { label: "Trip Trajectories", val: "15.2M" },
        { label: "Hexagonal Cells", val: "42,000+" },
        { label: "Dispatch Efficiency", val: "+18.5%" }
      ],
      problem: "Delivery routing inefficiencies and stale dispatch boundaries led to high courier deadheading and customer wait times during peak weather spikes.",
      methodology: "Aggregated raw GPS telemetry into discrete H3 hexagonal bins using PySpark. Fitted spatio-temporal clustering and localized Poisson arrival models to predict hyper-local surge demand 30 minutes in advance.",
      codeSnippet: `# H3 Spatial Indexing & Geospatial Aggregation
import h3
import geopandas as gpd

def assign_hex_resolution(lat, lng, resolution=8):
    return h3.geo_to_h3(lat, lng, resolution)

df['h3_index'] = df.apply(lambda r: assign_hex_resolution(r.lat, r.lng), axis=1)
hex_summary = df.groupby(['h3_index', 'hour']).agg(
    order_count=('order_id', 'count'),
    avg_delivery_min=('duration_sec', lambda x: x.mean() / 60)
).reset_index()`,
      githubUrl: "https://github.com",
      demoUrl: "https://github.com"
    }
  },
  {
    id: "ab-testing-framework",
    title: "Bayesian A/B Testing & Causal Inference Suite",
    category: "pipeline",
    categoryLabel: "Data Engineering & Pipelines",
    badge: "Bayesian MCMC",
    description: "Statistical platform implementing Bayesian estimation and causal inference (Diff-in-Diff) to evaluate product experiments without p-hacking risks.",
    previewStats: [
      { label: "Sample Efficiency", val: "+35% Faster Decisions" },
      { label: "Experiments Run", val: "200+ A/B Tests" }
    ],
    tags: ["Python", "PyMC", "Statsmodels", "FastAPI", "Docker"],
    modal: {
      tagline: "Rigorous Probabilistic Experimentation Engine for Product Teams",
      metrics: [
        { label: "Decision Confidence", val: "95% HDI" },
        { label: "False Positive Guard", val: "Zero Peeking Bias" },
        { label: "API Response", val: "<35ms" }
      ],
      problem: "Traditional frequentist null hypothesis significance testing (NHST) suffered from widespread peeking biases and difficult business interpretation among stakeholders.",
      methodology: "Engineered a Bayesian experimentation service using PyMC. Calculated posterior probability distributions of uplift, expected loss, and high-density intervals (HDI), empowering non-technical PMs to make mathematically sound launch decisions.",
      codeSnippet: `# Bayesian Uplift Estimation with PyMC
import pymc as pm

with pm.Model() as model:
    # Prior Beta distributions for conversion rates
    p_control = pm.Beta("p_ctrl", alpha=10, beta=100)
    p_variant = pm.Beta("p_var", alpha=10, beta=100)
    
    # Observed conversions
    obs_ctrl = pm.Binomial("obs_c", n=n_ctrl, p=p_control, observed=conv_ctrl)
    obs_var = pm.Binomial("obs_v", n=n_var, p=p_variant, observed=conv_var)
    
    # Calculate relative uplift
    uplift = pm.Deterministic("uplift", (p_variant - p_control) / p_control)
    trace = pm.sample(draws=2000, return_inferencedata=True)`,
      githubUrl: "https://github.com",
      demoUrl: "https://github.com"
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

  // Render Stats Grid
  const statsContainer = document.getElementById("modalMetricsGrid");
  statsContainer.innerHTML = project.modal.metrics.map(m => `
    <div class="modal-stat-box">
      <div class="modal-stat-box-val mono-font">${m.val}</div>
      <div class="modal-stat-box-label">${m.label}</div>
    </div>
  `).join("");

  // Problem & Methodology
  document.getElementById("modalProblemStatement").textContent = project.modal.problem;
  document.getElementById("modalMethodology").textContent = project.modal.methodology;

  // Code Snippet
  document.getElementById("modalCodeBlock").textContent = project.modal.codeSnippet;

  // Action links
  document.getElementById("modalGithubBtn").href = project.modal.githubUrl;
  document.getElementById("modalDemoBtn").href = project.modal.demoUrl;

  modal.showModal();
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

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
          <strong>SQL (SQLite)</strong> | 
          <strong>Python (pandas, scikit-learn, XGBoost)</strong> | 
          <strong>Data Visualization</strong>
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
                <td><strong style="color: var(--text-primary);">Precision</strong></td>
                <td><span class="mono-font" style="color: var(--accent-blue); font-weight: 700;">0.814</span></td>
                <td>Minimizes wasted clinical interventions by ensuring high accuracy on flagged areas.</td>
              </tr>
              <tr>
                <td><strong style="color: var(--text-primary);">Recall</strong></td>
                <td><span class="mono-font" style="color: var(--accent-blue); font-weight: 700;">0.847</span></td>
                <td>Captures the vast majority of genuinely vulnerable communities without oversight.</td>
              </tr>
              <tr>
                <td><strong style="color: var(--text-primary);">F1-Score</strong></td>
                <td><span class="mono-font" style="color: var(--accent-blue); font-weight: 700;">0.830</span></td>
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
        <p class="modal-text" style="border-left: 3px solid var(--accent-blue); padding-left: 1rem; color: var(--text-primary); font-weight: 500;">
          This shift allows public health officials to transition from reactive care to proactive, evidence-based resource allocation, deploying mobile screening units and community nutrition programs directly to high-risk census tracts.
        </p>
      `
    }
  },
  {
    id: "caffeine-finder",
    title: "Caffeine Finder: Agile Project Management & Scrum Facilitation",
    category: "agile",
    categoryLabel: "Agile & Scrum Facilitation",
    badge: "87 Story Pts Delivered",
    description: "Facilitated a 7-person cross-functional Scrum team through a high-velocity 10-day sprint cycle. Managed a 29-item Product Backlog, executed Planning Poker estimation, tracked velocity via a Sprint Burndown Chart (100% of 87 story points completed), and led retrospectives.",
    previewStats: [
      { label: "Sprint Completion", val: "87 / 87 Pts" },
      { label: "Cross-Functional Team", val: "7 Members" }
    ],
    tags: ["Scrum Master", "Agile Framework", "Planning Poker", "Sprint Burndown", "Product Backlog", "Retrospectives"],
    modal: {
      tagline: "Cross-Functional Agile Leadership, Sprint Planning & Quantitative Burndown Analytics",
      metrics: [
        { label: "Story Points", val: "87 pts" },
        { label: "Product Backlog", val: "29 Stories" },
        { label: "Team Size", val: "7 Members" },
        { label: "Sprint Timeline", val: "10 Days" }
      ],
      githubUrl: "caffeine_finder_slides.pdf",
      demoUrl: "caffeine_finder_case_study.pdf",
      customHtml: `
        <!-- Quantitative Metrics Grid -->
        <div class="modal-overview-grid">
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">87 pts</div>
            <div class="modal-stat-box-label">Story Points Completed</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">29</div>
            <div class="modal-stat-box-label">Product Backlog Stories</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">7</div>
            <div class="modal-stat-box-label">Cross-Functional Team</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-box-val mono-font">10 Days</div>
            <div class="modal-stat-box-label">Sprint Timeline</div>
          </div>
        </div>

        <!-- Case Study Summary & CSM Credential Aim -->
        <h4 class="modal-section-heading">Professional Summary &amp; Certified ScrumMaster (CSM) Preparation</h4>
        <div class="tech-stack-pill-box">
          <span>Agile Framework:</span>
          <strong>Scrum Master Facilitation</strong> | 
          <strong>Planning Poker (Fibonacci)</strong> | 
          <strong>Sprint Burndown Analytics</strong> | 
          <strong>Continuous Retrospective</strong>
        </div>
        <p class="modal-text">
          This case study highlights my practical application of Agile methodologies, servant leadership, and Scrum facilitation. In preparation for the <strong>Certified ScrumMaster (CSM)</strong> credential, I facilitated a 7-person cross-functional team through a full 10-day sprint cycle to deliver a user-centric software solution for Louisiana State University (LSU) students.
        </p>

        <!-- Team Structure -->
        <h4 class="modal-section-heading">Cross-Functional Scrum Team Organization</h4>
        <div class="modal-table-container">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Scrum Role</th>
                <th>Team Member(s)</th>
                <th>Core Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--accent-emerald);">Scrum Master</strong></td>
                <td><strong>Eve Kontcho</strong></td>
                <td>Facilitated Scrum ceremonies (Sprint Planning, Daily Standups, Retrospective), cleared blockers, and monitored velocity using a Sprint Burndown Chart.</td>
              </tr>
              <tr>
                <td><strong>Product Owner</strong></td>
                <td>Aaliyah Ware</td>
                <td>Defined product vision, maintained customer alignment, prioritized the 29-item Product Backlog, and validated user story acceptance criteria.</td>
              </tr>
              <tr>
                <td><strong>Developers (5)</strong></td>
                <td>Thien Vu, Elizabeth Schlamel, Mika Devillier, Khalil Abdullah, Treylan Williams</td>
                <td>Cross-functional implementation covering geolocation mapping, API integrations, drink menu filters, UI components, and test automation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 1. Product Vision & Problem Space -->
        <h4 class="modal-section-heading">1. Product Vision &amp; Student Problem Space</h4>
        <p class="modal-text">
          University students juggle rigorous class schedules, study groups, tight budgets, and dietary restrictions. Prior to <em>Caffeine Finder</em>, students relied on fragmented apps, static campus directories, and word-of-mouth to find open coffee spots, resulting in wasted walking time and missed deals.
        </p>
        <p class="modal-text" style="margin-top: 0.6rem;">
          <strong>The Solution:</strong> A consolidated mobile platform aggregating nearby cafes, coffee shops, campus dining locations, vending areas, and sponsored events into a single, intuitive interface matching students' location, schedule, dietary preferences, and budget.
        </p>

        <!-- 2. Backlog Management & Requirements Gathering -->
        <h4 class="modal-section-heading">2. Backlog Management &amp; Requirements Gathering</h4>
        <p class="modal-text">
          As Scrum Master, I worked closely with the Product Owner to decompose high-level epics into <strong>29 granular, INVEST-compliant user stories</strong> across six core functional domains:
        </p>
        <ul class="modal-list">
          <li><strong>Core Geolocation &amp; Mapping (Stories 1, 4, 5, 6, 9):</strong> List nearby vendors, render labeled map pins, show real-time GPS position, sort by proximity, and launch turn-by-turn routing.</li>
          <li><strong>Location Profiles &amp; Real-Time Status (Stories 2, 3, 7, 8):</strong> Full addresses, operating hours, quick search by name, live Open/Closed badge, and "Open Now" filter.</li>
          <li><strong>Menus, Dietary Preferences &amp; Pricing (Stories 10, 11, 12, 13, 14, 15):</strong> Beverage menus, coffee/tea/energy drink filters, "Dairy-Free" tags, price tiers ($, $$, $$$), and estimated caffeine content.</li>
          <li><strong>Campus Life &amp; Events (Stories 16, 17, 18, 19):</strong> Upcoming campus caffeine events, admission costs, free event filters, and student discount badges.</li>
          <li><strong>Study Amenities (Stories 20, 21, 22):</strong> Study-focused filters for free high-speed Wi-Fi, indoor/outdoor customer seating, and accessible electrical outlets.</li>
          <li><strong>Engagement &amp; Moderation (Stories 23–29):</strong> Favoriting spots, push event reminders, star ratings, written reviews, crowd-sourced location submissions, and admin approval workflows.</li>
        </ul>

        <!-- 3. Planning Poker & Sprint Scoping -->
        <h4 class="modal-section-heading">3. Planning Poker Estimation &amp; Sprint Scoping (87 Story Points)</h4>
        <p class="modal-text">
          To build consensus on technical effort, I facilitated Planning Poker sessions using the Fibonacci sequence (1, 2, 3, 5, 8, 13, 20, 40). By encouraging open debate whenever developer estimates diverged, the team uncovered hidden technical hurdles early (e.g. background GPS battery drain vs. turn-by-turn routing modals).
        </p>
        <p class="modal-text" style="margin-top: 0.6rem;">
          To deliver a tangible Minimum Viable Product (MVP) within the 10-day sprint, the team scoped the top 10 prioritized user stories, committing to <strong>87 total story points</strong>:
        </p>

        <div class="modal-table-container">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Backlog Item</th>
                <th>User Story</th>
                <th>Planning Poker</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td><strong>Display caffeine locations</strong></td>
                <td>As a student, I want a list of nearby cafes, restaurants, and campus vendors selling caffeinated drinks so that I can compare my options.</td>
                <td><span class="mono-font" style="font-weight: 800;">20 pts</span></td>
              </tr>
              <tr>
                <td>#2</td>
                <td><strong>Display location details &amp; hours</strong></td>
                <td>As a student, I want each location profile to show its address, hour, and description so that I can decide where and when to visit.</td>
                <td><span class="mono-font" style="font-weight: 800;">5 pts</span></td>
              </tr>
              <tr>
                <td>#3</td>
                <td><strong>Search by location name</strong></td>
                <td>As a student, I want to search for a location by name so that I can quickly find a specific cafe, restaurant, or campus vendor.</td>
                <td><span class="mono-font" style="font-weight: 800;">5 pts</span></td>
              </tr>
              <tr>
                <td>#4</td>
                <td><strong>Display caffeine locations on a map</strong></td>
                <td>As a student, I want caffeine locations shown as labeled map pins so that I can compare where the available options are located.</td>
                <td><span class="mono-font" style="font-weight: 800;">8 pts</span></td>
              </tr>
              <tr>
                <td>#5</td>
                <td><strong>Display current position on map</strong></td>
                <td>As a student, I want my current position shown on the map so that I can use it as a reference for nearby caffeine locations.</td>
                <td><span class="mono-font" style="font-weight: 800;">13 pts</span></td>
              </tr>
              <tr>
                <td>#6</td>
                <td><strong>Sort locations by distance</strong></td>
                <td>As a student, I want locations ordered from nearest to farthest based on my current position so that I can choose the closest option.</td>
                <td><span class="mono-font" style="font-weight: 800;">5 pts</span></td>
              </tr>
              <tr>
                <td>#7</td>
                <td><strong>Show open or closed status</strong></td>
                <td>As a student, I want to know the current opened or closed status of the shop so I know if it is available at the time of search.</td>
                <td><span class="mono-font" style="font-weight: 800;">3 pts</span></td>
              </tr>
              <tr>
                <td>#8</td>
                <td><strong>Filter to open locations</strong></td>
                <td>As a student, I want an "Open Now" filter to hide any closed locations so only currently available options show in the search.</td>
                <td><span class="mono-font" style="font-weight: 800;">3 pts</span></td>
              </tr>
              <tr>
                <td>#9</td>
                <td><strong>Provide navigation directions</strong></td>
                <td>As a student, I want to open turn-by-turn directions to a selected location so that I can navigate there easily.</td>
                <td><span class="mono-font" style="font-weight: 800;">20 pts</span></td>
              </tr>
              <tr>
                <td>#10</td>
                <td><strong>Display drink menus</strong></td>
                <td>As a student, I want to view a location’s drink menu so that I can see whether it offers a beverage I want.</td>
                <td><span class="mono-font" style="font-weight: 800;">5 pts</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 4. Sprint Execution & Burndown Analytics -->
        <h4 class="modal-section-heading">4. Sprint Execution &amp; Burndown Velocity Monitoring</h4>
        <p class="modal-text">
          Across the 10-day cycle, I tracked sprint velocity daily using a <strong>Sprint Burndown Chart</strong> comparing the ideal linear burndown (8.7 pts/day) against actual points completed. Daily standups served to identify and remove blockers immediately, preventing bottlenecks in complex features like GPS positioning and turn-by-turn routing.
        </p>
        <p class="modal-text" style="border-left: 3px solid #059669; padding-left: 1rem; color: var(--text-primary); font-weight: 500; margin-top: 0.75rem;">
          <strong>Sprint Result:</strong> The team burned down all 87 story points right on schedule by Day 10, achieving 100% velocity fulfillment with zero unfinished backlog debt.
        </p>

        <!-- 5. Retrospective Ceremony -->
        <h4 class="modal-section-heading">5. Agile Retrospective &amp; Continuous Improvement</h4>
        <p class="modal-text">
          I facilitated the end-of-sprint retrospective ceremony, championing a blameless culture of reflection across three structured pillars:
        </p>
        <ul class="modal-list">
          <li><strong>What Went Right:</strong> Strong user story articulation, vibrant Planning Poker debates that built technical consensus, high team morale, and disciplined timeboxed meetings.</li>
          <li><strong>What Went Wrong:</strong> Discovered slight overlapping functionality between backlog stories; developers experienced difficulty phrasing complex backend API tasks purely as consumer user stories; communication was occasionally fragmented across personal chats.</li>
          <li><strong>Actionable Improvements Adopted:</strong> Implemented pre-sprint technical spikes to evaluate architectural feasibility before estimation; instituted strict Acceptance Criteria and Definition of Done (DoD); and consolidated all blocker tracking in a centralized repository board.</li>
        </ul>

        <!-- 6. Scrum Master Competencies -->
        <h4 class="modal-section-heading">Recruiter Takeaways: Core Competencies Demonstrated</h4>
        <ul class="modal-list">
          <li><strong>Servant Leadership:</strong> Empowered 5 developers and collaborated with the Product Owner to maintain alignment and high team velocity.</li>
          <li><strong>Quantitative Metric Governance:</strong> Managed sprint health using burndown trendlines, story points, and velocity metrics.</li>
          <li><strong>Agile Facilitation &amp; Coaching:</strong> Championed Scrum values, relative estimation, and continuous retrospective refinement.</li>
        </ul>
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
    title: "Model Validation: ROC-AUC Curves Across Folds (Test Set FIPS)",
    labels: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
    datasets: [
      {
        label: "XGBoost Chronic Disease Classifier (AUC = 0.892)",
        data: [0.0, 0.42, 0.65, 0.78, 0.85, 0.89, 0.93, 0.96, 0.98, 0.99, 1.0],
        borderColor: "#121212",
        backgroundColor: "rgba(18, 18, 18, 0.08)",
        fill: true,
        tension: 0.3,
        borderWidth: 2.5
      },
      {
        label: "Baseline Logistic Regression (AUC = 0.724)",
        data: [0.0, 0.15, 0.32, 0.48, 0.60, 0.70, 0.78, 0.85, 0.91, 0.96, 1.0],
        borderColor: "#767672",
        borderDash: [5, 5],
        fill: false,
        tension: 0.2,
        borderWidth: 1.5
      }
    ]
  },
  loss: {
    title: "Training vs Validation Binary Cross-Entropy Loss (Early Stopping @ Iter 48)",
    labels: ["0", "10", "20", "30", "40", "48", "60", "70", "80"],
    datasets: [
      {
        label: "Training Log-Loss",
        data: [0.69, 0.44, 0.32, 0.25, 0.20, 0.17, 0.15, 0.13, 0.12],
        borderColor: "#059669",
        backgroundColor: "rgba(5, 150, 105, 0.08)",
        fill: true,
        tension: 0.3,
        borderWidth: 2
      },
      {
        label: "Validation Log-Loss",
        data: [0.70, 0.48, 0.36, 0.30, 0.27, 0.265, 0.28, 0.30, 0.32],
        borderColor: "#d97706",
        borderDash: [4, 4],
        fill: false,
        tension: 0.3,
        borderWidth: 2
      }
    ]
  },
  importance: {
    title: "Top Socioeconomic Risk Drivers (SHAP Mean |Value| Impact)",
    labels: ["Uninsured Rate (EP_UNINSUR)", "Poverty Rate (EP_POV)", "No HS Diploma (EP_NOHSDP)", "Overall SVI (RPL_THEMES)", "Unemployment Rate (EP_UNEMP)"],
    datasets: [
      {
        label: "Mean |SHAP Value| (Impact on High-Risk Classification)",
        data: [0.44, 0.38, 0.29, 0.21, 0.16],
        backgroundColor: "rgba(18, 18, 18, 0.85)",
        borderColor: "#121212",
        borderWidth: 1,
        borderRadius: 6
      }
    ]
  }
};

let currentChartMode = "roc";

function initOrUpdateChart() {
  const ctx = document.getElementById("heroChartCanvas");
  if (!ctx) return;

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(26, 26, 26, 0.08)";
  const textColor = isDark ? "#D1D1CF" : "#1A1A1A";

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
      datasets: config.datasets.map(ds => {
        // Adapt colors dynamically to match sleek gallery stone / dark palette
        if (currentChartMode === "importance") {
          return {
            ...ds,
            backgroundColor: isDark ? "rgba(96, 165, 250, 0.85)" : "#121212",
            borderColor: isDark ? "#60A5FA" : "#121212"
          };
        }
        if (currentChartMode === "roc") {
          const isMain = ds.label.includes("XGBoost");
          return {
            ...ds,
            borderColor: isMain ? (isDark ? "#60A5FA" : "#121212") : (isDark ? "#888885" : "#767672"),
            backgroundColor: isMain ? (isDark ? "rgba(96, 165, 250, 0.15)" : "rgba(18, 18, 18, 0.06)") : undefined
          };
        }
        return ds;
      })
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
            font: { family: "Inter", size: 11, weight: "600" },
            boxWidth: 12
          }
        },
        tooltip: {
          backgroundColor: isDark ? "#222222" : "#ECEAE5",
          titleColor: isDark ? "#FFFFFF" : "#121212",
          bodyColor: isDark ? "#D1D1CF" : "#2A2A2A",
          borderColor: isDark ? "#444444" : "#1A1A1A",
          borderWidth: 1.5,
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
// 2b. Caffeine Finder Sprint Burndown Chart
// ==========================================
let burndownChart = null;

function initOrUpdateBurndownChart() {
  const ctx = document.getElementById("burndownChartCanvas");
  if (!ctx) return;

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(26, 26, 26, 0.08)";
  const textColor = isDark ? "#D1D1CF" : "#1A1A1A";

  if (burndownChart) {
    burndownChart.destroy();
  }

  if (typeof Chart === "undefined") return;

  burndownChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day 0", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
      datasets: [
        {
          label: "Ideal Burndown (8.7 pts/day)",
          data: [87, 78.3, 69.6, 60.9, 52.2, 43.5, 34.8, 26.1, 17.4, 8.7, 0],
          borderColor: isDark ? "#888885" : "#767672",
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: isDark ? "#888885" : "#767672",
          fill: false,
          tension: 0
        },
        {
          label: "Actual Burndown (Velocity Tracked)",
          data: [87, 79, 71, 62, 53, 44, 35, 26, 17, 8, 0],
          borderColor: isDark ? "#10B981" : "#059669",
          backgroundColor: isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(5, 150, 105, 0.08)",
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: isDark ? "#10B981" : "#059669",
          fill: true,
          tension: 0.15
        }
      ]
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
            font: { family: "Inter", size: 11, weight: "600" },
            boxWidth: 14
          }
        },
        tooltip: {
          backgroundColor: isDark ? "#222222" : "#ECEAE5",
          titleColor: isDark ? "#FFFFFF" : "#121212",
          bodyColor: isDark ? "#D1D1CF" : "#2A2A2A",
          borderColor: isDark ? "#444444" : "#1A1A1A",
          borderWidth: 1.5,
          padding: 10,
          cornerRadius: 8,
          bodyFont: { family: "JetBrains Mono", size: 12 },
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y} pts remaining`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "JetBrains Mono", size: 10 } }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "JetBrains Mono", size: 10 },
            stepSize: 20
          },
          title: {
            display: true,
            text: "Story Points",
            color: textColor,
            font: { family: "JetBrains Mono", size: 10, weight: "700" }
          }
        }
      }
    }
  });
}

function setupCaffeineSandbox() {
  const toggleButtons = document.querySelectorAll(".caffeine-toggle-btn");
  const subheadTitle = document.getElementById("caffeineDynamicTitle");
  const burndownPane = document.getElementById("caffeineBurndownContainer");
  const backlogPane = document.getElementById("caffeineBacklogContainer");
  const retroPane = document.getElementById("caffeineRetroContainer");

  const TITLES = {
    burndown: "Sprint Burndown Velocity: Tracking 87 Story Points to Zero Across 10 Days",
    backlog: "Sprint Backlog: 10 Prioritized User Stories Scoped via Planning Poker",
    retro: "Agile Retrospective: Inspect & Adapt Analysis for Continuous Delivery"
  };

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleButtons.forEach(b => b.classList.remove("active-toggle"));
      btn.classList.add("active-toggle");

      const mode = btn.getAttribute("data-caffeine-mode");
      if (subheadTitle && TITLES[mode]) {
        subheadTitle.textContent = TITLES[mode];
      }

      if (burndownPane) burndownPane.classList.toggle("is-hidden", mode !== "burndown");
      if (backlogPane) backlogPane.classList.toggle("is-hidden", mode !== "backlog");
      if (retroPane) retroPane.classList.toggle("is-hidden", mode !== "retro");

      if (mode === "burndown") {
        setTimeout(() => {
          initOrUpdateBurndownChart();
        }, 50);
      }
    });
  });
}

// ==========================================
// 3. Render Projects Grid & Bind Deep Dive Triggers
// ==========================================
function renderProjects(filter = "all") {
  const container = document.getElementById("projectsContainer");
  if (container) {
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
  }

  // Attach click listeners to all Deep Dive buttons across the entire page (including Slide 7)
  document.querySelectorAll(".view-deep-dive-btn").forEach(btn => {
    btn.onclick = () => {
      const pid = btn.getAttribute("data-project-id") || "predictive-epidemiology";
      openProjectModal(pid);
    };
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
  const githubBtn = document.getElementById("modalGithubBtn");
  const demoBtn = document.getElementById("modalDemoBtn");
  if (githubBtn) {
    githubBtn.href = project.modal.githubUrl;
    if (project.id === "caffeine-finder") {
      githubBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M3 9h18"></path>
          <path d="M9 21V9"></path>
        </svg>
        <span>Deliverable Slides (PDF)</span>
      `;
    } else {
      githubBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        <span>Source Code (.ipynb)</span>
      `;
    }
  }

  if (demoBtn) {
    demoBtn.href = project.modal.demoUrl;
    if (project.id === "caffeine-finder") {
      demoBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <span>Case Study (PDF)</span>
      `;
    } else {
      demoBtn.innerHTML = `
        <span>Interactive Notebook</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      `;
    }
  }

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
  const initialTheme = savedTheme || "light";
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
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
  if (burndownChart) {
    initOrUpdateBurndownChart();
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

      const cards = document.querySelectorAll(".project-feature-card");
      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      if (category === "all" || category === "ml") {
        setTimeout(() => {
          if (performanceChart) performanceChart.resize();
        }, 60);
      }
      if (category === "all" || category === "agile") {
        setTimeout(() => {
          if (burndownChart) {
            burndownChart.resize();
          } else {
            initOrUpdateBurndownChart();
          }
        }, 60);
      }
    });
  });

  const chartToggleButtons = document.querySelectorAll(".dataset-toggle-btn");
  chartToggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      chartToggleButtons.forEach(b => {
        b.style.borderColor = "var(--border-subtle)";
        b.style.fontWeight = "600";
      });
      btn.style.borderColor = "var(--border-dark)";
      btn.style.fontWeight = "800";
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
  setupCaffeineSandbox();
  setupScrollspy();
  setupResumeUploader();

  // Initialize charts
  setTimeout(() => {
    initOrUpdateChart();
    initOrUpdateBurndownChart();
  }, 100);
});

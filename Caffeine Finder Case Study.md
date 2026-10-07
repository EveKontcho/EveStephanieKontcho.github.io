# Case Study: Agile Project Management & Scrum Facilitation (Caffeine Finder)

**Author:** Eve-Stephanie Yamdjieu Kontcho  
**Program:** B.S. Information Systems and Analytics, Louisiana State University  
**Credential Goal:** Certified ScrumMaster (CSM) Candidate  
**Date:** October 2026  

---

## Professional Summary

This case study demonstrates the practical application of Agile methodologies, servant leadership, and Scrum facilitation in delivering a user-centric software solution. As a candidate preparing for the Certified ScrumMaster (CSM) credential, I led a 7-person cross-functional team through a full 10-day sprint cycle. This deliverable demonstrates core ScrumMaster competencies: product backlog grooming, Planning Poker estimation, velocity monitoring via burndown tracking, obstacle removal, and retrospective-driven continuous process improvement.

---

## 1. Project Overview & Product Vision

* **Product Vision:** *Caffeine Finder* is a campus-tailored mobile application engineered to help Louisiana State University (LSU) students rapidly identify and evaluate nearby caffeine sources, including cafes, coffee shops, campus dining locations, vending areas, and sponsored campus events offering caffeinated beverages.
* **Problem Space:** University students often face tight schedules, budget constraints, dietary restrictions (dairy-free, oat milk), and a need for study spaces with specific amenities (reliable Wi-Fi, seating, and electrical outlets). Prior to *Caffeine Finder*, students had to consult multiple disjointed apps and websites to ascertain hours, distance, pricing, and availability.
* **The Objective:** Consolidate geographic location, real-time operating hours, dietary preferences, price points, and study amenities into one intuitive, mobile-optimized experience to streamline student daily decision-making.
* **My Role (Scrum Master):** Facilitated an Agile team consisting of:
  * **Scrum Master:** Eve Kontcho (Facilitation, Impediment Removal, Velocity Tracking)
  * **Product Owner:** Aaliyah Ware (Vision, Requirements, Backlog Ordering)
  * **Developers:** Thien Vu, Elizabeth Schlamel, Mika Devillier, Khalil Abdullah, Treylan Williams (Cross-Functional Engineering Team)

---

## 2. Product Backlog Architecture & Requirements Gathering

To ensure user-centricity and traceability, the team established a comprehensive Product Backlog comprising **29 distinct user stories** mapped across six core functional domains:

### Category A: Core Geolocation & Interactive Mapping
1. **Display caffeine locations (20 pts):** As a student, I want a list of nearby cafes, restaurants, and campus vendors selling caffeinated drinks so that I can compare my options.
4. **Display caffeine locations on a map (8 pts):** As a student, I want caffeine locations shown as labeled map pins so that I can compare where the available options are located.
5. **Display current position on the map (13 pts):** As a student, I want my current position shown on the map so that I can use it as a reference for nearby caffeine locations.
6. **Sort locations by distance (5 pts):** As a student, I want locations ordered from nearest to farthest based on my current position so that I can choose the closest option.
9. **Provide navigation directions (20 pts):** As a student, I want to open turn-by-turn directions to a selected location so that I can navigate there easily.

### Category B: Location Profiles & Operating Hours
2. **Display location details and hours (5 pts):** As a student, I want each location profile to show its address, hour, and description so that I can decide where and when to visit.
3. **Search by location name (5 pts):** As a student, I want to search for a location by name so that I can quickly find a specific cafe, restaurant, or campus vendor.
7. **Show open or closed status (3 pts):** As a student, I want to know the current opened or closed status of the shop so I know if it is available at the time of search.
8. **Filter to open locations (3 pts):** As a student, I want an "Open Now" filter to hide any closed locations so only the currently available options show in the search.

### Category C: Menu Details, Pricing & Dietary Preferences
10. **Display drink menus (5 pts):** As a student, I want to view a location's drink menu so that I can see whether it offers a beverage I want.
11. **Filter by beverage type (4 pts):** As a student, I want to filter locations by coffee, tea, or energy drinks so that I can find my preferred beverage type.
12. **Display dietary options (13 pts):** As a student, I want menus labeled "Dairy-Free" and other dietary options so that I can choose suitable drinks.
13. **Display estimated drink prices (3 pts):** As a student, I want estimated prices easily accessible for drinks at each location so that I can make easy price comparisons.
14. **Filter by price range (2 pts):** As a student, I want to find options within my budget with a price filter for locations so that I can choose a location I can afford.
15. **Display estimated caffeine content (5 pts):** As a student, I want to view estimated caffeine content of beverages so that I can make informed personal health choices.

### Category D: Campus Life & Event Discovery
16. **Display campus caffeine events (40 pts):** As a student, I want to view upcoming campus events providing caffeine in their drink options so that I can plan which events to attend.
17. **Display event details and costs (20 pts):** As a student, I want information on events such as admission price so that I can plan for the cost.
18. **Identify and filter free events (2 pts):** As a student, I want free events displayed and included on the price filter so that I can find free campus offerings.
19. **Display student discounts (13 pts):** As a student, I want locations to show student discounts and eligibility requirements so that I can receive lower prices.

### Category E: Study Amenities & Campus Workspaces
20. **Filter by Wi-Fi availability (2 pts):** As a student, I want to filter locations with free Wi-Fi so that I can find a place to study online.
21. **Filter by seating availability (5 pts):** As a student, I want to filter for locations with customer seating so that I can find a place to study.
22. **Filter by outlet availability (15 pts):** As a student, I want to filter for locations with electrical outlets so that I can charge my devices while studying.

### Category F: Social Engagement & Governance Workflows
23. **Save favorite locations (3 pts):** As a student, I want to save locations so that I can quickly access places I visit again.
24. **Save campus events (3 pts):** As a student, I want to save caffeine events so that I can keep track of events I plan to attend.
25. **Receive event reminders (5 pts):** As a student, I want a notification before a saved event starts so that I don't miss scheduled gatherings.
26. **Rate locations (13 pts):** As a student, I want to give a location a star rating after I visit so other students can assess quality.
27. **Review locations (2 pts):** As a student, I want to write a review about drinks, pricing, and study atmosphere to inform the community.
28. **Submit a location or event (13 pts):** As a student or campus vendor, I want to submit a new location or event to keep the directory updated.
29. **Review submitted information (0.5 pts):** As an administrator, I want to approve, reject, or edit submitted entries so the database remains accurate and trustworthy.

---

## 3. Planning Poker Estimation & Sprint Scoping

### Fibonacci-Based Planning Poker
As Scrum Master, I facilitated Planning Poker sessions with the five developers and the Product Owner to calibrate task complexity, technical dependencies, and developmental effort. Using the Fibonacci scale (1, 2, 3, 5, 8, 13, 20, 40):
* Outlier estimates were systematically debated to surface hidden technical assumptions (e.g., GPS background polling vs. static map pins).
* Larger epics (like Event Management at 40 pts and Turn-by-Turn Routing at 20 pts) were closely scrutinized.

### 10-Day Sprint Backlog Scoping (87 Story Points)
To deliver a functional Minimum Viable Product (MVP) within the 10-day sprint cycle, the team committed to the top 10 prioritized user stories:

| Priority | Backlog Item | User Story | Story Points |
| :---: | :--- | :--- | :---: |
| **1** | Display caffeine locations | List nearby cafes, restaurants, campus vendors | **20** |
| **2** | Display location details & hours | Profiles showing address, hours, descriptions | **5** |
| **3** | Search by location name | Quick search bar filtering vendors by name | **5** |
| **4** | Display caffeine locations on map | Geolocation pins displaying active options | **8** |
| **5** | Display current position on map | Real-time GPS user location reference | **13** |
| **6** | Sort locations by distance | Distance calculation sorting closest to farthest | **5** |
| **7** | Show open or closed status | Real-time status indicators based on local time | **3** |
| **8** | Filter to open locations | "Open Now" toggle hiding currently closed shops | **3** |
| **9** | Provide navigation directions | Turn-by-turn routing modal to selected vendor | **20** |
| **10** | Display drink menus | Menu listing with beverage catalog | **5** |
| **TOTAL**| **10 Scoped Deliverables** | **Sprint Commitment** | **87 Points** |

---

## 4. Sprint Execution & Burndown Analytics

* **Timeline:** 10 Days
* **Total Points:** 87 Story Points
* **Daily Velocity Target:** 8.7 Points/Day
* **Outcome:** 100% Completion (87 of 87 Points Burned Down to 0)

### Sprint Burndown Metrics
The team maintained an active Sprint Burndown Chart tracking **Ideal Burndown** against **Actual Burndown**:

| Day | Ideal Remaining (Pts) | Actual Remaining (Pts) | Status / Milestones |
| :---: | :---: | :---: | :--- |
| **Day 0** | 87.0 | 87.0 | Sprint kickoff & environment alignment |
| **Day 1** | 78.3 | 79.0 | Search bar & profile wireframes established |
| **Day 2** | 69.6 | 71.0 | Real-time status logic & Open Now filter delivered |
| **Day 3** | 60.9 | 62.0 | Distance calculation algorithm finalized |
| **Day 4** | 52.2 | 53.0 | Drink menu modal structure completed |
| **Day 5** | 43.5 | 44.0 | Mid-sprint check; location list rendering completed |
| **Day 6** | 34.8 | 35.0 | Map pins integrated with vendor database |
| **Day 7** | 26.1 | 26.0 | GPS positioning validated on test devices |
| **Day 8** | 17.4 | 17.0 | Turn-by-turn routing API integration initiated |
| **Day 9** | 8.7 | 8.0 | End-to-end integration & routing error handling |
| **Day 10** | 0.0 | 0.0 | **Sprint Goal Achieved:** All 10 user stories verified |

As Scrum Master, monitoring the burndown daily allowed me to proactively identify pacing bottlenecks, protect developer focus, and ensure the team avoided end-of-sprint technical debt.

---

## 5. Agile Ceremonies & Retrospective

At the conclusion of the sprint, I facilitated the Sprint Retrospective ceremony to assess team performance and implement continuous improvement actions:

### 1. What Went Right
* **User Story Framing:** Features and user stories were well-articulated from the student's perspective.
* **Planning Poker Collaboration:** High engagement and healthy technical debate during estimation sessions.
* **Team Dynamic & Alignment:** High trust and shared ownership across developers and the Product Owner.
* **Meeting Productivity:** Standups and ceremonies adhered strictly to timeboxes, maintaining momentum.

### 2. Challenges & Bottlenecks Identified
* **Backlog Overlap:** Initial feature proposals contained subtle overlaps (e.g., location profile vs. drink menu vs. dietary tags).
* **Technical User Story Complexity:** Developers initially struggled to capture backend database integration and routing logic purely through consumer-facing user stories.
* **Communication Channel Fragmentation:** Critical updates were occasionally split across ad-hoc chat channels rather than centralized documentation.

### 3. Actionable Continuous Improvement Plan
* **Pre-Planning Technical Spikes:** Introduce brief technical refinement sessions prior to sprint planning to evaluate architectural feasibility and external API constraints before estimation.
* **Granular Acceptance Criteria:** Establish strict Definition of Ready (DoR) and Definition of Done (DoD) with clear functional acceptance criteria for complex user stories.
* **Centralized Communication Protocol:** Consolidate sprint blockers and technical documentation in the project backlog board for instant visibility.

---

## 6. Demonstrated Scrum Master Competencies

* **Servant Leadership:** Facilitated team consensus, resolved procedural ambiguities, and empowered cross-functional developers without micro-management.
* **Empirical Process Control:** Applied transparency, inspection, and adaptation across daily tracking and retrospective analysis.
* **Quantitative Sprint Tracking:** Interpreted burndown curves to monitor velocity trends and guide sprint commitment.
* **Agile Coaching:** Coached team members on writing INVEST-compliant user stories and practicing relative estimation via Planning Poker.

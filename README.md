# 🧩 Provider Distribution Engine (Project 1)

Specialized **Google Apps Script** for automated distribution of game providers across promotional sections (Top/Recommended) with strict "No-Duplicate-in-Line" logic.

## 📌 Overview
The script takes a raw list of providers and intelligently populates two target grids. It ensures that the same provider never appears twice in the same horizontal "line" (row of 6 slots) to maintain visual diversity on the platform.

## 🚀 Key Logic
*   **Dual-Slot Allocation:** Attempts to place each provider twice within a section for maximum exposure.
*   **Performance-Based Priority:** 
    *   **High-Performance:** First 20 providers are prioritized for the "Golden Lines" (Rows 1-3).
    *   **Standard:** Other providers are filled into remaining slots (Rows 4-6) first.
*   **Line-Aware Validation:** Before placing a provider, the script scans its current 6-slot line to prevent duplicates.
*   **Grid Consistency:** Maintains the structure of both `Top` and `Recommended` sections independently.

## 🛠 Tech Stack
*   **Language:** Google Apps Script (JavaScript)
*   **Engine:** V8 Runtime
*   **Data Structure:** Matrix manipulation (JSON parsing for deep cloning)

## 📊 Configuration (CONFIG)
| Parameter | Range/Value | Description |
| :--- | :--- | :--- |
| **sourceRange** | `Q2:Q101` | Raw list of providers. |
| **topRange** | `D2:D37` | Target grid for "Top" section (36 slots). |
| **recRange** | `D38:D73` | Target grid for "Recommended" section (36 slots). |
| **lineSize** | `6` | Number of slots per horizontal line. |
| **priorityLimit** | `20` | Threshold for "High-Performance" status. |

## ⚙️ Setup
1.  **Sheet Name:** Set the sheet name in `ss.getSheetByName("")` (currently empty in your code).
2.  **Run:** Execute `distributeProvidersProject1()`.
3.  **Result:** The script will clear nothing; it only fills **empty** cells or replaces values based on the logic, then alerts "Done!".

> [!WARNING]  
> If a provider cannot be placed due to line constraints, the script will skip the second slot to avoid breaking the "No-Duplicate" rule.

---
*Optimized for automated lobby management and UI consistency.*

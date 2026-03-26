// ============================================================
// CYSE 411 — Mid-Term Exam V2 | Q5 Starter File
// Incident Tracker Application

// Application State
const ACCEPTED_SEVERITIES = ["low", "medium", "high", "critical"];
const ACCEPTED_FILTERS = ["all", "low", "medium", "high", "critical"];

let currentFilter = "all";


// ============================================================
// Q5.A — Secure Async Fetch with HTTP Status Checking

async function fetchIncidents() {
    try {
        const res = await fetch("/api/incidents");

        if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            return [];
        }

        return data;
    } catch (err) {
        console.error("Fetch failed:", err);
        return [];
    }
}


// ============================================================
// Q5.B — Safe Incident Rendering

function renderIncidents(incidents) {
    const container = document.getElementById("incident-list");
    container.textContent = "";

    if (!Array.isArray(incidents)) {
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Unable to load incidents.";
        container.appendChild(errorMsg);
        return;
    }

    incidents.forEach((incident) => {
        if (
            !incident ||
            typeof incident.title !== "string" ||
            incident.title.trim() === "" ||
            !ACCEPTED_SEVERITIES.includes(incident.severity)
        ) {
            console.warn("Invalid incident skipped:", incident);
            return;
        }

        const li = document.createElement("li");

        const title = document.createElement("span");
        title.textContent = incident.title.trim();

        const severity = document.createElement("span");
        severity.textContent = " (" + incident.severity + ")";

        li.appendChild(title);
        li.appendChild(severity);

        container.appendChild(li);
    });
}


// ============================================================
// Q5.C — Secure Dashboard State Management

function loadDashboardState() {
    const raw = localStorage.getItem("dashboardState");

    try {
        const state = JSON.parse(raw);

        if (!state || !ACCEPTED_FILTERS.includes(state.filter)) {
            return { filter: "all" };
        }

        return { filter: state.filter };
    } catch (e) {
        return { filter: "all" };
    }
}

function saveDashboardState(filterValue) {
    if (!ACCEPTED_FILTERS.includes(filterValue)) {
        filterValue = "all";
    }

    const state = {
        filter: filterValue
    };

    localStorage.setItem("dashboardState", JSON.stringify(state));
}

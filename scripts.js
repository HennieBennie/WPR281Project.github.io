if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}
let issues = JSON.parse(localStorage.getItem("issues")) || [];

if (issues.length === 0) {
    issues = [
        {
            id: 1,
            summary: "Login button not working",
            description: "Clicking login does nothing",
            status: "open",
            priority: "high",
            identifiedBy: "Admin",
            personID: "1",
            personName: "John",
            personSurname: "Doe",
            personEmail: "john@email.com",
            personUsername: "jdoe",
            projectID: "101",
            projectName: "Bug Tracker",
            entryDate: "2026-04-10T10:00:00",
            targetDate: "2026-04-20",
            resolutionDate: null,
            resolutionSummary: ""
        },
        {
            id: 2,
            summary: "Page crashes on submit",
            description: "Form crashes when submitting empty data",
            status: "resolved",
            priority: "medium",
            identifiedBy: "Tester",
            personID: "2",
            personName: "Alice",
            personSurname: "Smith",
            personEmail: "alice@email.com",
            personUsername: "asmith",
            projectID: "102",
            projectName: "Website",
            entryDate: "2026-04-01T09:00:00",
            targetDate: "2026-04-05",
            resolutionDate: "2026-04-04",
            resolutionSummary: "Added validation checks"
        },
        {
            id: 3,
            summary: "Slow loading dashboard",
            description: "Dashboard takes too long to load",
            status: "in progress",
            priority: "low",
            identifiedBy: "Admin",
            personID: "3",
            personName: "Bob",
            personSurname: "Brown",
            personEmail: "bob@email.com",
            personUsername: "bbrown",
            projectID: "101",
            projectName: "Bug Tracker",
            entryDate: "2026-04-12T11:00:00",
            targetDate: "2026-04-25",
            resolutionDate: null,
            resolutionSummary: ""
        },
        {
            id: 4,
            summary: "Incorrect total calculation",
            description: "Totals are wrong in reports",
            status: "open",
            priority: "high",
            identifiedBy: "Finance",
            personID: "4",
            personName: "Eve",
            personSurname: "White",
            personEmail: "eve@email.com",
            personUsername: "ewhite",
            projectID: "103",
            projectName: "Accounting System",
            entryDate: "2026-03-28T08:30:00",
            targetDate: "2026-04-02",
            resolutionDate: null,
            resolutionSummary: ""
        },
        {
            id: 5,
            summary: "Profile picture not uploading",
            description: "Upload fails silently",
            status: "resolved",
            priority: "low",
            identifiedBy: "User",
            personID: "5",
            personName: "Chris",
            personSurname: "Green",
            personEmail: "chris@email.com",
            personUsername: "cgreen",
            projectID: "102",
            projectName: "Website",
            entryDate: "2026-04-03T14:00:00",
            targetDate: "2026-04-06",
            resolutionDate: "2026-04-05",
            resolutionSummary: "Fixed API endpoint"
        },
        {
            id: 6,
            summary: "Search not returning results",
            description: "Search always returns empty",
            status: "open",
            priority: "medium",
            identifiedBy: "QA",
            personID: "6",
            personName: "David",
            personSurname: "Black",
            personEmail: "david@email.com",
            personUsername: "dblack",
            projectID: "101",
            projectName: "Bug Tracker",
            entryDate: "2026-04-15T10:30:00",
            targetDate: "2026-04-22",
            resolutionDate: null,
            resolutionSummary: ""
        },
        {
            id: 7,
            summary: "Notifications not sending",
            description: "Users do not receive notifications",
            status: "in progress",
            priority: "high",
            identifiedBy: "Admin",
            personID: "7",
            personName: "Nina",
            personSurname: "Jones",
            personEmail: "nina@email.com",
            personUsername: "njones",
            projectID: "104",
            projectName: "Messaging System",
            entryDate: "2026-04-11T13:00:00",
            targetDate: "2026-04-18",
            resolutionDate: null,
            resolutionSummary: ""
        },
        {
            id: 8,
            summary: "Error 500 on reports",
            description: "Server error when generating reports",
            status: "resolved",
            priority: "high",
            identifiedBy: "Support",
            personID: "8",
            personName: "Liam",
            personSurname: "Taylor",
            personEmail: "liam@email.com",
            personUsername: "ltaylor",
            projectID: "103",
            projectName: "Accounting System",
            entryDate: "2026-04-02T07:45:00",
            targetDate: "2026-04-04",
            resolutionDate: "2026-04-03",
            resolutionSummary: "Fixed backend query"
        },
        {
            id: 9,
            summary: "UI misalignment",
            description: "Buttons overlap on mobile",
            status: "open",
            priority: "low",
            identifiedBy: "Designer",
            personID: "9",
            personName: "Olivia",
            personSurname: "King",
            personEmail: "olivia@email.com",
            personUsername: "oking",
            projectID: "102",
            projectName: "Website",
            entryDate: "2026-04-14T09:15:00",
            targetDate: "2026-04-21",
            resolutionDate: null,
            resolutionSummary: ""
        },
        {
            id: 10,
            summary: "Data not saving",
            description: "User data not persisted",
            status: "open",
            priority: "high",
            identifiedBy: "Admin",
            personID: "10",
            personName: "Mark",
            personSurname: "Lee",
            personEmail: "mark@email.com",
            personUsername: "mlee",
            projectID: "101",
            projectName: "Bug Tracker",
            entryDate: "2026-04-16T12:00:00",
            targetDate: "2026-04-23",
            resolutionDate: null,
            resolutionSummary: ""
        }
    ];
    localStorage.setItem("issues", JSON.stringify(issues));
}


//save info to ticket
function saveBug() {
    // Get values
    let summary = document.getElementById("summary").value.trim();
    let description = document.getElementById("description").value.trim();
    let identifiedBy = document.getElementById("person").value.trim();
    let projectID = document.getElementById("projectID").value.trim();
    let projectName = document.getElementById("projectName").value.trim();
    let priority = document.getElementById("priority").value;
    let targetDate = document.getElementById("targetDate").value;

    // Validation
    let errors = [];

    if (!summary) errors.push("Summary is required");
    if (!description) errors.push("Description is required");
    if (!identifiedBy) errors.push("Identified By is required");
    if (!projectID) errors.push("Project ID is required");
    if (!projectName) errors.push("Project Name is required");
    if (!targetDate) errors.push("Target Date is required");

    // Date validation
    // FIX: proper date comparison
    let today = new Date();
    let tDate = new Date(targetDate);

    if (targetDate && tDate < today.setHours(0,0,0,0)) {
        errors.push("Target date cannot be in the past");
    }

    // If errors exist → stop
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // Generate a new ID based on the highest existing ID
    let newId = 1;
    if (issues.length > 0) {
        newId = Math.max(...issues.map(bug => bug.id)) + 1;
    }

    let newBug = {
        id: newId,
        summary,
        description,
        identifiedBy,
        projectID,
        projectName,
        priority,
        status: "open",
        entryDate: new Date().toISOString(),
        targetDate,
        resolutionDate: null,
        resolutionSummary: "",

        personID: document.getElementById("personID").value,
        personName: document.getElementById("personName").value,
        personSurname: document.getElementById("personSurname").value,
        personEmail: document.getElementById("personEmail").value,
        personUsername: document.getElementById("personUsername").value
    };
    issues.push(newBug);
    localStorage.setItem("issues", JSON.stringify(issues));
    
    // Show confirmation popup and redirect
    window.location.href = "index.html";
    alert("Ticket created successfully!");
}

//display summary of ticket
function displayDetail(id) {
if (!id) return;
  window.location.href = `BugDetails.html?id=${id}`;  
};


// Tab functionality

function openTab(evt, tabName) {
    // Hide all tab content
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove active class from all buttons
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the selected tab and mark button as active
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "block";
    selectedTab.classList.add("active");
    evt.currentTarget.className += " active";

    // Filter and display bugs based on the selected tab
    displayBugsSum(tabName);
}

// Display bugs filtered by tab
function displayBugsSum(tabName) {
    // Determine which container and filter to use
    let containerId = "All";
    let filterFn = (bug) => !bug.status || bug.status.toLowerCase() !== "resolved"; // Default: show all (excluding resolved)

    if (tabName === "High") {
        containerId = "High";
        filterFn = (bug) => bug.priority && bug.priority.toLowerCase() === "high" && (!bug.status || bug.status.toLowerCase() !== "resolved");
    } else if (tabName === "Medium") {
        containerId = "Medium";
        filterFn = (bug) => bug.priority && bug.priority.toLowerCase() === "medium" && (!bug.status || bug.status.toLowerCase() !== "resolved");
    } else if (tabName === "Low") {
        containerId = "Low";
        filterFn = (bug) => bug.priority && bug.priority.toLowerCase() === "low" && (!bug.status || bug.status.toLowerCase() !== "resolved");
    } else if (tabName === "InProgress") {
        containerId = "InProgress";
        filterFn = (bug) => bug.status && bug.status.toLowerCase() === "in progress";
    } else if (tabName === "Resolved") {
        containerId = "Resolved";
        filterFn = (bug) => bug.status && bug.status.toLowerCase() === "resolved";
    }

    let container = document.getElementById(containerId);
    container.innerHTML = "";

    // Add header row
    const header = document.createElement("div");
    header.className = "tabgrid";
    header.innerHTML = `
        <div class="hasBorder">Summary</div>
        <div class="hasBorder">Description</div>
        <div class="hasBorder">Identified By</div>
        <div class="hasBorder">Project</div>
        <div class="hasBorder">Assigned To</div>
        <div class="hasBorder">Priority</div>
        <div class="hasBorder">Status</div>
        <div class="hasBorder">Date Identified</div>
        <div class="hasBorder">Target Date</div>
    `;
    container.appendChild(header);

    issues.filter(filterFn).forEach(bug => {
        let ticket = document.createElement("div");

        ticket.innerHTML = `
         <div class="tabgrid">

            <div class="summaryDiv">${bug.summary}</div>
            <div class="descriptionDiv">${bug.description}</div>

            <div class="personDiv">${bug.identifiedBy}</div>

            <div class="projectDiv">${bug.projectID} - ${bug.projectName}</div>

            <div class="assignedToDiv">
                ${bug.personName} ${bug.personSurname}
            </div>

            <div class="priorityDiv">${bug.priority}</div>
            <div class="statusDiv">
                ${bug.status === "resolved" ? "Resolved" : bug.status}
            </div>

            <div class="dateIdentifiedDiv">
                ${bug.entryDate?.split("T")[0]}
            </div>

            <div class="targetDateDiv">${bug.targetDate?.split("T")[0] || bug.targetDate}</div>

            <div>
                <button class="button" onclick="displayDetail(${bug.id})">View Bug</button>
            </div>

        </div>`;
        container.appendChild(ticket);
    });
};


window.onload = function () {
    displayBugsSum("All");
    document.getElementById("defaultOpen").click();
};
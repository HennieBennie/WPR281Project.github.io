let issues = JSON.parse(localStorage.getItem("issues")) || [];

if (issues.length === 0) {
    issues = [
        {
            id: 1,
            summary: "Example Bug",
            description: "Example description",
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
            entryDate: new Date().toISOString(),
            targetDate: "2026-04-20",
            resolutionDate: null,
            resolutionSummary: ""
        }
    ];
    localStorage.setItem("issues", JSON.stringify(issues));
}


//save info to ticket
function saveBug() {
    let newBug ={
        id:  document.getElementById("ID").value,
        summary: document.getElementById("summary").value,
        description: document.getElementById("description").value,
        identifiedBy: document.getElementById("person").value,
        personID: document.getElementById("personID").value,
        personName: document.getElementById("personName").value,
        personSurname: document.getElementById("personSurname").value,
        personEmail: document.getElementById("personEmail").value,
        personUsername: document.getElementById("personUsername").value,
         projectID: document.getElementById("projectID").value,
        projectName: document.getElementById("projectName").value,
        priority: document.getElementById("priority").value,
        status: "open",
        entryDate: new Date().toISOString(),
        targetDate: document.getElementById("targetDate").value,
        resolutionDate: null,
        resolutionSummary: ""
    };
    issues.push(newBug);
    localStorage.setItem("issues", JSON.stringify(issues));
    location.reload();
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
    let containerId = "bugList";
    let filterFn = (bug) => !bug.status || bug.status.toLowerCase() !== "resolved"; // Default: show all (excluding resolved)

    if (tabName === "High") {
        containerId = "High";
        filterFn = (bug) => bug.priority && bug.priority.toLowerCase() === "high" && (!bug.status || bug.status.toLowerCase() !== "resolved");
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

            <div class="projectDiv">${bug.projectName}</div>

            <div class="assignedToDiv">
                ${bug.personName} ${bug.personSurname}
            </div>

            <div class="priorityDiv">${bug.priority}</div>
            <div class="statusDiv">${bug.status}</div>

            <div class="dateIdentifiedDiv">
                ${bug.entryDate?.split("T")[0]}
            </div>

            <div class="targetDateDiv">${bug.targetDate}</div>

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
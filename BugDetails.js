let issues = JSON.parse(localStorage.getItem("issues")) || [];

let link = new URLSearchParams(window.location.search);
let id = Number(link.get("id"));

let bug = issues.find(bug => bug.id === id);

let container = document.getElementById("bugDetails");

if(bug) {  
    let resolutionHTML = "";

    if (bug.status === "resolved") {
        resolutionHTML = `
            <p class="form-label">Resolution Details:</p>
            <p>Resolved Date: ${bug.resolutionDate}</p>
            <p>Resolution Summary: ${bug.resolutionSummary}</p>
    `;
}
    container.innerHTML = `
    <div class="editForm">
    <div class="div1">
        <p class="form-label">Ticket ID:</p>
        <p>${bug.id}</p>
    </div>
    <div class="div2">
        <p class="form-label">Summary:</p>
        <p>${bug.summary}</p>
    </div>
    <div class="div3">
        <p class="form-label">Status:</p>
        <p>${bug.status}</p>
    </div>
    ${resolutionHTML}
    <div class="div4">
        <p class="form-label">Description:</p>
        <p>${bug.description}</p>
    </div>
    <div class="div5">
        <p class="form-label">Identified by:</p>
        <p>${bug.identifiedBy}</p>
    </div>
    <div class="div6">
        <p class="form-label">Assigned Name:</p>
        <p>${bug.personName}</p>
    </div>
    <div class="div7">
        <p class="form-label">Assigned Surname:</p>
        <p>${bug.personSurname}</p>
    </div>
    <div class="div8">
        <p class="form-label">Person ID:</p>
        <p>${bug.personID}</p>
    </div>
    <div class="div9">
        <p class="form-label">Person Email:</p>
        <p>${bug.personEmail}</p>
    </div>
    <div class="div10">
        <p class="form-label">Person Username:</p>
        <p>${bug.personUsername}</p>
    </div>
    <div class="div11">
        <p class="form-label">Project ID:</p>
        <p>${bug.projectID}</p>
    </div>
    <div class="div12">
        <p class="form-label">Project Name:</p>
        <p>${bug.projectName}</p>
    </div>
    <div class="div13">
        <p class="form-label">Date identified:</p>
        <p>${bug.entryDate}</p>
    </div>
    <div class="div14">
        <p class="form-label">Target date:</p>
        <p>${bug.targetDate}</p>
    </div>
    <button class="button" onclick="EditDetails(${bug.id})">Edit</button>
    ${
        bug.status !== "resolved"
        ? `<button class="button" onclick="ResolveIssue(${bug.id})">Resolve</button>`
        : ""
    }
    </div>
        `;
    
    } else {
        container.innerHTML = "<p>Bug not found</p>";
    };
function EditDetails(id) {
    let EditContainer = document.getElementById("bugDetails");
    let bug = issues.find(b => b.id === id);
    if (!bug) return;//returns if there is a null crash
    EditContainer.innerHTML = `
    <div class="editForm">
        <div class="div1">
            <p class="form-label">Summary:</p>
            <input id="summary-${id}" placeholder="summary" value="${bug.summary}">
        </div>

        <div class="div2">
            <p class="form-label">Description:</p>
            <textarea id="description-${id}" placeholder="description">${bug.description}</textarea>
        </div>

        <div class="div3">
            <p class="form-label">Identified by:</p>
            <input id="person-${id}" placeholder="Identified by" value="${bug.identifiedBy}"><br>
        </div>

        <div class="div4">
            <p class="form-label">Status:</p>
            <select id="status-${id}">
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="overdue">Overdue</option>
            </select>
        </div>

        <div class="div5">
            <p class="form-label">Project ID:</p>
            <input id="projectID-${id}" placeholder="project ID" value="${bug.projectID}">
            <p class="form-label">Project Name:</p>
            <input id="projectName-${id}" placeholder="project name" value="${bug.projectName}">
        </div>

        <div class="div6">
            <p class="form-label">Priority:</p>
            <select id="priority-${id}">
                <option value="low" ${bug.priority === "low" ? "selected" : ""}>Low</option>
                <option value="medium" ${bug.priority === "medium" ? "selected" : ""}>Medium</option>
                <option value="high" ${bug.priority === "high" ? "selected" : ""}>High</option>
            </select>
        </div>

        <div class="div7">
            <p class="form-label">Assigned Name:</p>
            <input id="personName-${id}" placeholder="Name" value="${bug.personName}"><br>
            <p class="form-label">Assigned Surname:</p>
            <input id="personSurname-${id}" placeholder="Name" value="${bug.personSurname}"><br>
            <p class="form-label">Person ID:</p>
            <input id="personID-${id}" placeholder="Name" value="${bug.personID}"><br>
            <p class="form-label">Person Email:</p>
            <input id="personEmail-${id}" placeholder="Email" value="${bug.personEmail}"><br>
            <p class="form-label">Person Username:</p>
            <input id="personUsername-${id}" placeholder="Username" value="${bug.personUsername}"><br>
        </div>

        <div class="div8">
            <p class="form-label">Date identified:</p>
            <input id="entryDate-${id}" type="date" value="${bug.entryDate?.split("T")[0]}"><br>
        </div>

        <div class="div9">
            <p class="form-label">Target date:</p>
            <input id="targetDate-${id}" type="date" value="${bug.targetDate?.split("T")[0]}"><br>
        </div>

        <div class="div10">
            <button class="button" onclick="saveEdit(${id})">Save</button>
        </div>
    </div>
    `;  
    
};
function ResolveIssue(id) {
    let resolveContainer = document.getElementById("resolveBug");
    let bug = issues.find(b => b.id === id);
    if (!bug) return;//returns if there is a null crash
    resolveContainer.innerHTML = `
    <input id="resolveSummary-${id}" placeholder="Resolution summary" value=""><br>
    <input id="resolvedDate-${id}" type="date" value=""><br> 
    <button class="button" onclick="saveResolution(${id})">Save</button>   
    `;

};
function saveEdit(id) {
    let bug = issues.find(b => b.id === id);
     if (!bug) return;

    let summary = document.getElementById(`summary-${id}`).value.trim();
    let description = document.getElementById(`description-${id}`).value.trim();
    let identifiedBy = document.getElementById(`person-${id}`).value.trim();
    let status = document.getElementById(`status-${id}`).value;

    let projectID = document.getElementById(`projectID-${id}`).value.trim();
    let projectName = document.getElementById(`projectName-${id}`).value.trim();

    let priority = document.getElementById(`priority-${id}`).value;


    let entryDate = document.getElementById(`entryDate-${id}`).value;
    let targetDate = document.getElementById(`targetDate-${id}`).value;

    let errors = [];

    if (!summary) errors.push("Summary is required");
    if (!description) errors.push("Description is required");
    if (!identifiedBy) errors.push("Identified By is required");

    if (!projectID) errors.push("Project ID is required");
    if (!projectName) errors.push("Project Name is required");

    // Date validation
    if (targetDate && entryDate) {
        let tDate = new Date(targetDate);
        let eDate = new Date(entryDate);

        if (tDate < eDate) {
            errors.push("Target date cannot be before entry date");
        }
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    bug.summary = summary;
    bug.description = description;
    bug.identifiedBy = identifiedBy;
    bug.status = status;

    bug.projectID = projectID;
    bug.projectName = projectName;
    bug.priority = priority;

    bug.entryDate = entryDate;
    bug.targetDate = targetDate;

    bug.personID = document.getElementById(`personID-${id}`).value;
    bug.personName = document.getElementById(`personName-${id}`).value;
    bug.personSurname = document.getElementById(`personSurname-${id}`).value;
    bug.personEmail = document.getElementById(`personEmail-${id}`).value;
    bug.personUsername = document.getElementById(`personUsername-${id}`).value;
    localStorage.setItem("issues", JSON.stringify(issues));
    location.reload();
};
function saveResolution(id) {
    let bug = issues.find(b => b.id === id);
    if (!bug) return;//returns if there is a null crash
    bug.resolutionSummary = document.getElementById(`resolveSummary-${id}`).value;
    bug.resolutionDate = document.getElementById(`resolvedDate-${id}`).value;
    bug.status = "resolved" 
    localStorage.setItem("issues", JSON.stringify(issues));
   
    history.back();
    location.reload(true);
};

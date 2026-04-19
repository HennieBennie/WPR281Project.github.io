let issues = JSON.parse(localStorage.getItem("issues")) || [];

let link = new URLSearchParams(window.location.search);
let id = Number(link.get("id"));

let bug = issues.find(bug => bug.id === id);

let container = document.getElementById("bugDetails");

if(bug) {  
    let resolutionHTML = "";

    if (bug.status === "resolved") {
        resolutionHTML = `
            <h4>Resolution Details</h4>
            <p>Resolved Date: ${bug.resolutionDate}</p>
            <p>Resolution Summary: ${bug.resolutionSummary}</p>
    `;
}
    container.innerHTML = `
    <p>Ticket ID:${bug.id}</p>
    <p>Summary:${bug.summary}</p>
    <p>Status:${bug.status}</p>
    ${resolutionHTML}
    <p>Description:${bug.description}</p>
    <p>Identified by:${bug.identifiedBy}</p>
    <p>Assigned to:</p>
    <p>${bug.personName}</p>
    <p>${bug.personSurname}</p>
    <p>${bug.personID}</p>
    <p>${bug.personEmail}</p>
    <p>${bug.personUsername}</p>
    <p>Project's details:</p>
    <p>${bug.projectID}</p>
    <p>${bug.projectName}</p>
    <p>Date identified:${bug.entryDate}</p>
    <p>Target date:${bug.targetDate}</p>
    <button class="button" onclick="EditDetails(${bug.id})">Edit</button>
    ${
        bug.status !== "resolved"
        ? `<button class="button" onclick="ResolveIssue(${bug.id})">Resolve</button>`
        : ""
    }
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
            <p class="form-label">Project details:</p>
            <p>Project ID:</p>
            <input id="projectID-${id}" placeholder="project ID" value="${bug.projectID}">
            <p>Project name:</p>
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
            <p class="form-label">Assigned to:</p>
            <p class="form-label">Name:</p>
            <input id="personName-${id}" placeholder="Name" value="${bug.personName}"><br>
            <p class="form-label">Surname:</p>
            <input id="personSurname-${id}" placeholder="Name" value="${bug.personSurname}"><br>
            <p class="form-label">Person ID:</p>
            <input id="personID-${id}" placeholder="Name" value="${bug.personID}"><br>
            <p class="form-label">Email:</p>
            <input id="personEmail-${id}" placeholder="Email" value="${bug.personEmail}"><br>
            <p class="form-label">Username:</p>
            <input id="personUsername-${id}" placeholder="Username" value="${bug.personUsername}"><br>
        </div>

        <div class="div8">
            <p class="form-label">Entry Date:</p>
            <input id="entryDate-${id}" type="date" value="${bug.entryDate?.split("T")[0]}"><br>
        </div>

        <div class="div9">
            <p class="form-label" >Target Date:</p>
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
    bug.summary = document.getElementById(`summary-${id}`).value;
    bug.status = document.getElementById(`status-${id}`).value;
    bug.description = document.getElementById(`description-${id}`).value;
    bug.identifiedBy = document.getElementById(`person-${id}`).value;
    bug.personID = document.getElementById(`personID-${id}`).value;
    bug.personName = document.getElementById(`personName-${id}`).value;
    bug.personSurname = document.getElementById(`personSurname-${id}`).value;
    bug.personEmail = document.getElementById(`personEmail-${id}`).value;
    bug.personUsername = document.getElementById(`personUsername-${id}`).value;
    bug.projectID= document.getElementById(`projectID-${id}`).value;
    bug.projectName = document.getElementById(`projectName-${id}`).value;
    bug.priority = document.getElementById(`priority-${id}`).value;
    bug.entryDate = document.getElementById(`entryDate-${id}`).value;
    bug.targetDate = document.getElementById(`targetDate-${id}`).value;

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

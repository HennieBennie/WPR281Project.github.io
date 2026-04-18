/*
info wat gesave moet word:
id
summary
status
description
identified by
assigned to(person id, person email, person username, person name, person surname)
project(project id, project name)
priority
entry date
target date
resolved date 
resolution summary
profile pic of person?
 */
console.log("Loaded");
let issues = JSON.parse(localStorage.getItem("issues")) || [];

let link = new URLSearchParams(window.location.search);
let id = Number(link.get("id"));

let bug = issues.find(bug => bug.id === id);

let container = document.getElementById("bugDetails");

if(bug) {  
    container.innerHTML = `
    <p>Ticket ID:${bug.id}</p>
    <p>Summary:${bug.summary}</p>
    <p>Status:${bug.status}</p>
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
    <button onclick=EditDetails(${bug.id})>Edit</button>
    <button onClick=ResolveIssue(${bug.id})>Resolve</button>
    `;} else {
        container.innerHTML = "<p>Bug not found</p>";
    };
function EditDetails(id) {
    let EditContainer = document.getElementById("bugDetails");
    let bug = issues.find(b => b.id === id);
    EditContainer.innerHTML = `
    <input id="summary-${id}" placeholder="summary" value="${bug.summary}"><br>
    <input id="description-${id}" placeholder="description" value="${bug.description}"><br>
    <input id="person-${id}" placeholder="Identified by" value="${bug.identifiedBy}"><br>

    <select id="status-${id}">
        <option value="open">Open</option>
        <option value="resolved">Resolved</option>
        <option value="overdue">Overdue</option>
    </select>

    <p>Project details:</p>
    <input id="projectID-${id}" placeholder="project ID" value="${bug.projectID}"><br>
    <input id="projectName-${id}" placeholder="project name" value="${bug.projectName}"><br>

    <select id="priority-${id}">
      <option value="low" ${bug.priority === "low" ? "selected" : ""}>Low</option>
      <option value="medium" ${bug.priority === "medium" ? "selected" : ""}>Medium</option>
      <option value="high" ${bug.priority === "high" ? "selected" : ""}>High</option>
    </select><br>

    <p>Assigned to:</p>
    <input id="personName-${id}" placeholder="Name" value="${bug.personName}"><br>
    <input id="personSurname-${id}" placeholder="Name" value="${bug.personSurname}"><br>
    <input id="personID-${id}" placeholder="Name" value="${bug.personID}"><br>
    <input id="personEmail-${id}" placeholder="Name" value="${bug.personEmail}"><br>
    <input id="personUsername-${id}" placeholder="Name" value="${bug.personUsername}"><br>
    <input id="entryDate-${id}" type="date" value="${bug.entryDate?.split("T")[0]}"><br>
    <input id="targetDate-${id}" type="date" value="${bug.targetDate?.split("T")[0]}"><br>

    <button onclick="saveEdit(${id})">Save</button>
    `;  
    
};
function ResolveIssue(id) {
    let resolveContainer = document.getElementById("resolveBug");
    let bug = issues.find(b => b.id === id);
    resolveContainer.innerHTML = `
    <input id="resolveSummary-${id}" placeholder="Resolution summary" value=""><br>
    <input id="resolvedDate-${id}" type="date" value=""><br> 
    <button onclick="saveResolution(${id})">Save</button>   
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
    bug.resolutionSummary = document.getElementById(`resolveSummary-${id}`).value;
    bug.resolutionDate = document.getElementById(`resolvedDate-${id}`).value;
    bug.status = "resolved"
    localStorage.setItem("issues", JSON.stringify(issues));
    location.reload();
   

};

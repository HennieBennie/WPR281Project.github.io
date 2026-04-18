console.log("Loaded");
let issues = JSON.parse(localStorage.getItem("issues")) || [];

let link = new URLSearchParams(window.location.search);
let id = Number(link.get("id"));

let bug = issues.find(bug => bug.id === id);

let container = document.getElementById("bugDetails");

if(bug) {  
    container.innerHTML = `
    <p>Summary:${bug.summary}</p>
    <p>Description:${bug.description}</p>
    <p>Identified by:${bug.identifiedBy}</p>
    <p>Assigned to:${bug.assignedTo}</p>
    <p>Project:${bug.project}</p>
    <p>Status:${bug.status}</p>
    <p>Target date:${bug.targetDate}</p>
    `;} else {
        container.innerHTML = "<p>Bug not found</p>";
    }


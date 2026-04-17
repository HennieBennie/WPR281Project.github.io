let issues = JSON.parse(localStorage.getItem("issues")) || [];
localStorage.setItem("issues", JSON.stringify(issues));

if (issues.length === 0) {
    issues = [
        {
            id: 1,
            summary: "Example Bug",
            status: "open",
            priority: "high"
        }
    ];
    localStorage.setItem("issues", JSON.stringify(issues));
}
function showBug() {

};
function saveBug() {

};
function saveBug() {
    let newBug ={id: Date.now(),
    summary: document.getElementById("summary").value,
    description: document.getElementById("description").value,
    identifiedBy: document.getElementById("person").value,
    project: document.getElementById("project").value,
    assignedTo: document.getElementById("assignedTo").value,
    priority: document.getElementById("priority").value,
    status: "open",
    dateIdentified: new Date().toISOString(),
    targetDate: document.getElementById("targetDate").value,
    resolvedDate: null,
    resolutionSummary: ""
    };
    issues.push(newBug);
    localStorage.setItem("issues", JSON.stringify(issues));

    displayBugs();
}
function displayBugsSum() {};

function displayDetail() {};
function saveEdit() {};

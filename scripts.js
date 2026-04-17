let issues = JSON.parse(localStorage.getItem("issues")) || [];


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
//Form to insert data
function showBugForm() {

};

//save info to ticket
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

    
}
//display summary of ticket
function displayBugsSum() {
    let container = document.getElementById("bugList");
    container.innerHTML = "";

    issues.forEach(bug => {
        let ticket = document.createElement("div");

        ticket.innerHTML =`
        ${bug.summary} | ${bug.identifiedBy} | ${bug.project} | ${bug.assignedTo} | ${bug.priority} | ${bug.status} | ${bug.dateIdentified} | ${bug.targetDate}
        `;
        container.appendChild(ticket);
    });
};
//Display ALL of ticket
function displayDetail() {};
//save to ticket
function saveEdit() {};

// Display tickets by page
//moet ek die displayBugsSum function hier insit?

function generateItem(summary, description, identifiedBy, project, assignedTo, priority, status, dateIdentified, targetDate) {
        const newDiv = document.createElement("div");
        newDiv.id = 'myDiv';
        newDiv.className = 'highlight';
        newDiv.innerHTML = 'Hello, I am a dynamically created div!';

        // Apply some inline styles
        newDiv.style.width = '200px';
        newDiv.style.height = '50px';
        newDiv.style.backgroundColor = 'skyblue';
        newDiv.style.textAlign = 'center';
        newDiv.style.lineHeight = '50px';
        newDiv.style.fontWeight = 'bold';

    newDiv.addEventListener('click', () => {
        alert('Clicked');

    });
    document.body.appendChild(newDiv);    
    
    
}

// Tab functionality

function openTab(evt, tabName) {
    // Hide all tab content
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all buttons
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the selected tab and mark button as active
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//check as jy met die saamstem
window.onload = function () {
    displayBugsSum();
    document.getElementById("defaultOpen").click();
};
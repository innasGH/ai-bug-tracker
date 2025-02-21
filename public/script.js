document.getElementById("bugForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    const response = await fetch("http://localhost:3002/report-bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority })
    });

    const result = await response.json();
    alert(result.message);
    loadBugs();
});

async function loadBugs() {
    const response = await fetch("http://localhost:3002/bugs");
    const bugs = await response.json();
    const bugList = document.getElementById("bugList");
    bugList.innerHTML = "";

    bugs.forEach(bug => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${bug.title}</strong> - ${bug.priority} - 
            <select class="status-dropdown" data-id="${bug.id}">
                <option value="Open" ${bug.status === "Open" ? "selected" : ""}>Open</option>
                <option value="In Progress" ${bug.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Resolved" ${bug.status === "Resolved" ? "selected" : ""}>Resolved</option>
            </select>
            <button class="update-status" data-id="${bug.id}">Update</button>
        `;
        bugList.appendChild(li);
    });

    // Attach event listeners to update status
    document.querySelectorAll(".update-status").forEach(button => {
        button.addEventListener("click", async function() {
            const bugId = this.getAttribute("data-id");
            const newStatus = this.previousElementSibling.value;  // Get selected status

            await fetch(`http://localhost:3002/update-bug/${bugId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            loadBugs();  // Refresh the list after update
        });
    });
}

loadBugs();


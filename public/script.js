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
        li.textContent = `${bug.title} - ${bug.priority} - ${bug.status}`;
        bugList.appendChild(li);
    });
}

loadBugs();

cat > script.js <<'EOF'
const form = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");
const message = document.getElementById("message");

let tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

function displayTickets() {
    if (!tickets.length) {
        ticketList.textContent = "No tickets submitted yet.";
        return;
    }

    ticketList.innerHTML = tickets.map(t => `
        <div class="ticket">
            <h3>${escapeHTML(t.subject)}</h3>
            <p>Ticket ID: ${t.id}</p>
            <p>Customer: ${escapeHTML(t.name)}</p>
            <p>Priority: ${t.priority}</p>
            <p>Status: ${t.status}</p>
        </div>
    `).join("");
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;"
    })[c]);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const ticket = {
        id: "TKT-" + Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        category: document.getElementById("category").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value,
        status: "Open"
    };

    tickets.unshift(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    message.textContent = "Ticket submitted! ID: " + ticket.id;

    form.reset();
    displayTickets();
});

displayTickets();
EOF
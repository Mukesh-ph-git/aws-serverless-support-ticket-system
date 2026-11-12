
const API_URL = "https://l51zpbva13.execute-api.us-east-1.amazonaws.com/tickets";

const form = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");
const message = document.getElementById("message");

let tickets = [];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

function displayTickets() {
    if (!tickets.length) {
        ticketList.textContent = "No tickets submitted yet.";
        return;
    }

    ticketList.innerHTML = tickets.map(ticket => `
        <div class="ticket">
            <h3>${escapeHTML(ticket.subject)}</h3>
            <p>Ticket ID: ${escapeHTML(ticket.ticketId)}</p>
            <p>Customer: ${escapeHTML(ticket.fullName)}</p>
            <p>Priority: ${escapeHTML(ticket.priority)}</p>
            <p>Status: ${escapeHTML(ticket.status)}</p>
        </div>
    `).join("");
}

async function loadTickets() {
    ticketList.textContent = "Loading tickets...";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Unable to load tickets");
        }

        tickets = await response.json();
        displayTickets();

    } catch (error) {
        console.error(error);
        ticketList.textContent = "Unable to load tickets. Please try again.";
    }
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Submitting...";

    const ticket = {
        fullName: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        category: document.getElementById("category").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value.trim()
    };

    message.textContent = "Submitting ticket...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Submission failed");
        }

        message.textContent =
            "Ticket submitted successfully! ID: " + result.ticket.ticketId;

        form.reset();

        await loadTickets();

    } catch (error) {
        console.error(error);
        message.textContent = "Error: " + error.message;

    } finally {
        button.disabled = false;
        button.textContent = "Submit Ticket";
    }
});

loadTickets();

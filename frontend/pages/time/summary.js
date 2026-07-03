const summaryDate = document.getElementById("summaryDate");
const summarySlots = document.getElementById("summarySlots");
const totalSlots = document.getElementById("totalSlots");

// MUST BE SAME GLOBAL ARRAY (NO COPY)
const selectedSlots = window.selectedSlots;

const selectedDate = localStorage.getItem("selectedDate");

// show date safely
summaryDate.innerText = selectedDate || "No date selected";

// MAIN SUMMARY FUNCTION
function updateSummary() {

    summarySlots.innerHTML = "";

    // empty state
    if (selectedSlots.length === 0) {

        const empty = document.createElement("li");
        empty.className = "empty-slot";
        empty.innerText = "No slots selected";

        summarySlots.appendChild(empty);

        totalSlots.innerText = 0;
        return;
    }

    // render slots
    selectedSlots.forEach(slot => {

        const li = document.createElement("li");
        li.innerText = slot;
        summarySlots.appendChild(li);

    });

    totalSlots.innerText = selectedSlots.length;
}

// CONFIRM BOOKING
function confirmBooking() {

    if (selectedSlots.length === 0) {
        alert("Select at least one slot");
        return;
    }

    localStorage.setItem(
        "selectedSlots",
        JSON.stringify(selectedSlots)
    );

    alert(
        `Booking Confirmed!\nDate: ${selectedDate}\nSlots: ${selectedSlots.join(", ")}`
    );
}

// initial render
updateSummary();
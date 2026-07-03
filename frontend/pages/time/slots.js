window.selectedSlots = [];
const selectedSlots = window.selectedSlots;

const slotsContainer = document.getElementById("slots");

const times = [
    "12:00 AM - 1:00 AM",
    "1:00 AM - 2:00 AM",
    "2:00 AM - 3:00 AM",
    "3:00 AM - 4:00 AM",
    "4:00 AM - 5:00 AM",
    "5:00 AM - 6:00 AM",
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
    "10:00 PM - 11:00 PM",
    "11:00 PM - 12:00 AM"
];

function renderSlots() {
    slotsContainer.innerHTML = "";
    times.forEach(time => createSlot(time));
}

function createSlot(time) {
    const div = document.createElement("div");
    div.className = "slot";
    div.innerText = time;

    div.onclick = () => toggleSlot(time, div);

    slotsContainer.appendChild(div);
}

function toggleSlot(time, el) {

    if (selectedSlots.includes(time)) {
        selectedSlots.splice(selectedSlots.indexOf(time), 1);
        el.classList.remove("selected");
    } else {
        selectedSlots.push(time);
        el.classList.add("selected");
    }

    updateSummary();
}

renderSlots();
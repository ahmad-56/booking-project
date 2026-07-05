let currentDate = new Date();
let selectedDate = "";

function renderCalendar() {
    const datesContainer = document.getElementById("dates");
    const monthYear = document.getElementById("monthYear");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.innerText = `${months[month]} ${year}`;
    datesContainer.innerHTML = "";

    let startIndex = (firstDay === 0) ? 6 : firstDay - 1;

    for (let i = 0; i < startIndex; i++) {
        const empty = document.createElement("div");
        empty.classList.add("empty");
        datesContainer.appendChild(empty);
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let day = 1; day <= lastDate; day++) {

        const dateEl = document.createElement("div");
        dateEl.classList.add("date");
        dateEl.innerText = day;

        const thisDate = new Date(year, month, day);

        if (thisDate < today) {
            dateEl.style.opacity = "0.4";
            dateEl.style.pointerEvents = "none";
        } else {

            dateEl.addEventListener("click", () => {

                // remove old selection
                document.querySelectorAll(".date")
                    .forEach(d => d.classList.remove("selected"));

                dateEl.classList.add("selected");

                // FORMAT DATE
                selectedDate = thisDate.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // UPDATE UI
                updateSummary(selectedDate);
                animateSummary(selectedDate);

                document.getElementById("doneBtn").style.display = "block";
            });
        }

        datesContainer.appendChild(dateEl);
    }
}

function updateSummary(date) {
    document.getElementById("summaryDate").innerText = date;
    localStorage.setItem("selectedDate", date);
}

function animateSummary(date) {
    const box = document.getElementById("summaryBox");

    box.classList.add("active");

    const el = document.getElementById("summaryDate");
    el.classList.remove("highlight");
    void el.offsetWidth;
    el.classList.add("highlight");
}

function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    renderCalendar();
}

function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    renderCalendar();
}

function resetCalendar() {
    selectedDate = "";

    document.querySelectorAll(".date")
        .forEach(d => d.classList.remove("selected"));

    document.getElementById("summaryDate").innerText = "Not selected";

    document.getElementById("doneBtn").style.display = "none";
}

function goToTime() {
    if (!selectedDate) {
        alert("Please select a date first!");
        return;
    }

    localStorage.setItem("selectedDate", selectedDate);
    window.location.href = "../time/time.html";
}

renderCalendar();

/* CLOCK */
function updateDateTime() {
    const now = new Date();

    document.getElementById("datetime").innerHTML =
        now.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) + " | " +
        now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
}

setInterval(updateDateTime, 1000);
updateDateTime();
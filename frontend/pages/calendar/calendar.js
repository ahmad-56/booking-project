let currentDate = new Date();
let selectedDateText = "";

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

    monthYear.innerText = months[month] + " " + year;

    datesContainer.innerHTML = "";

    let startIndex = (firstDay === 0) ? 6 : firstDay - 1;

    for (let i = 0; i < startIndex; i++) {
        let empty = document.createElement("div");
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

                document.querySelectorAll(".date")
                    .forEach(d => d.classList.remove("selected"));

                dateEl.classList.add("selected");

                const selected = new Date(year, month, day);

                selectedDateText = selected.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const box = document.getElementById("chosenBox");
                box.innerText = "Selected Date: " + selectedDateText;
                box.classList.add("show");

                document.getElementById("doneBtn").style.display = "block";

                const timeSection = document.getElementById("timeSection");
                timeSection.style.display = "block";

                timeSection.scrollIntoView({ behavior: "smooth" });
            });
        }

        datesContainer.appendChild(dateEl);
    }
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

renderCalendar();

/* RESET */
function resetCalendar() {
    selectedDateText = "";

    document.querySelectorAll(".date")
        .forEach(d => d.classList.remove("selected"));

    document.getElementById("chosenBox").innerText = "";
    document.getElementById("chosenBox").classList.remove("show");

    document.getElementById("doneBtn").style.display = "none";

    document.getElementById("timeSection").style.display = "none";
}

/* CLOCK */
function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const date = now.toLocaleDateString('en-GB', options);
    const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    document.getElementById("datetime").innerHTML =
        `${date} | ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

/* DONE BUTTON */
function goToTime() {
    if (!selectedDateText) {
        alert("Please select a date first!");
        return;
    }

    localStorage.setItem("selectedDate", selectedDateText);

    window.location.href = "../time/time.html";
}
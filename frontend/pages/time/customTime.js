const customBtn = document.getElementById("customBtn");
const customBox = document.getElementById("customTimeBox");
const addBtn = document.getElementById("addCustomTime");

customBtn.onclick = () => {
    customBox.style.display =
        customBox.style.display === "block" ? "none" : "block";
};

addBtn.onclick = () => {

    let h = document.getElementById("customHour").value;
    let m = document.getElementById("customMinute").value;
    let p = document.getElementById("customPeriod").value;

    // validation
    if (h === "" || m === "") {
        alert("Fill time properly");
        return;
    }

    h = parseInt(h);
    m = parseInt(m);

    if (h < 1 || h > 12 || m < 0 || m > 59) {
        alert("Invalid time");
        return;
    }

    const formatted = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")} ${p}`;

    const exists = selectedSlots.some(s => s.includes(formatted));
    if (exists) {
        alert("Slot already exists");
        return;
    }

    // add custom slot
    selectedSlots.push(formatted);

    // create UI
    createSlot(formatted);

    updateSummary();
};
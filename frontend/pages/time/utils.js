function timeToMinutes(t) {
    const [time, period] = t.split(" ");
    let [h, m] = time.split(":").map(Number);

    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    return h * 60 + m;
}

function formatTime(h, m, period) {
    h = String(h).padStart(2, "0");
    m = String(m).padStart(2, "0");
    return `${h}:${m} ${period}`;
}
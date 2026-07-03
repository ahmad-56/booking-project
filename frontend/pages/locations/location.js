const categories = [
    { value: "doctor", label: "Doctor" },
    { value: "salon", label: "Salon" },
    { value: "tutor", label: "Tutor" },
    { value: "other", label: "Other" }
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const doneBtn = document.getElementById("doneBtn");

function renderDropdown(query) {
    const selectedValue = categorySelect.value;
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = normalizedQuery
        ? categories.filter((item) => item.label.toLowerCase().includes(normalizedQuery))
        : categories;

    categorySelect.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = !selectedValue || !filtered.some((item) => item.value === selectedValue);
    placeholder.textContent = "Select an option";
    categorySelect.appendChild(placeholder);

    if (filtered.length === 0) {
        const noMatch = document.createElement("option");
        noMatch.disabled = true;
        noMatch.textContent = "No matches found";
        categorySelect.appendChild(noMatch);
        return;
    }

    filtered.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = item.label;
        if (item.value === selectedValue) {
            option.selected = true;
            placeholder.selected = false;
        }
        categorySelect.appendChild(option);
    });
}

searchInput.addEventListener("input", (event) => {
    renderDropdown(event.target.value);
});

doneBtn.addEventListener("click", () => {
    if (!categorySelect.value) {
        categorySelect.focus();
        return;
    }

    window.location.href = "../calendar/calendar.html";
});

renderDropdown("");

const students = [[]];
var curr = 0;

const button = document.getElementById("toggleBtn");
const content = document.getElementById("content");
button.addEventListener("click", () => {
  content.style.display = "block";
  button.style.display = "none";
});

const next = document.getElementById("next");
const prev = document.getElementById("prev");
prev.addEventListener("click", () => {
    if (curr == 0) {
        students.unshift([]);
    }
    else {
        curr -= 1;
    }
    day.setDate(day.getDate() - 1);
    renderStudents();
    document.getElementById("date").textContent = "Attendance for section 1 on " + day.toDateString() + ":";
});

next.addEventListener("click", () => {
    if (curr == students.length - 1) {
        students.push([]);
    }
    curr += 1;
    day.setDate(day.getDate() + 1);
    renderStudents();
    document.getElementById("date").textContent = "Attendance for section 1 on " + day.toDateString() + ":";
});

var day = new Date();
document.getElementById("date").textContent = "Attendance for section 1 on " + day.toDateString() + ":";

document.getElementById("myForm").addEventListener("submit", function (e) {
e.preventDefault(); // stop page refresh

const form = e.target;
const student = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    present: false,
};
if (student.firstName !== "" && student.lastName !== "") {
    students[curr].push(student);
    form.reset();

    renderStudents();
}
});

function renderStudents() {
    const output = document.getElementById("output");

    output.innerHTML = students[curr].map((p, index) => `
        <label>
            <input 
                type="checkbox"
                data-index="${index}"
                ${p.present ? "checked" : ""}
            >
            ${p.firstName} ${p.lastName}
        </label>
        <br>
    `).join("");
}

document.getElementById("output").addEventListener("change", e => {
    if (e.target.type === "checkbox") {
        const index = e.target.dataset.index;
        students[curr][index].present = e.target.checked;
    }
});
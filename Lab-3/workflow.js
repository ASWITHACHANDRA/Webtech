// Requirement: Store user input temporarily in variables
let formData = {};

function updateProgressBar(step) {
    const bar = document.getElementById('progressBar');
    bar.style.width = (step / 4) * 100 + "%";
}

function nextStage(current) {
    let isValid = false;
    const err = document.getElementById(`err${current}`);

    // Requirement: Strict validation at each stage
    if (current === 1) {
        const name = document.getElementById('fullName').value;
        if (name.length > 3) {
            formData.name = name;
            isValid = true;
        } else { err.innerText = "Name must be longer than 3 characters."; }
    } 
    else if (current === 2) {
        const reg = document.getElementById('regNo').value;
        if (reg.startsWith("22")) {
            formData.regNo = reg;
            isValid = true;
        } else { err.innerText = "Reg No must start with '22'."; }
    } 
    else if (current === 3) {
        const role = document.getElementById('userRole').value;
        if (role !== "") {
            formData.role = role;
            isValid = true;
            displaySummary(); // Prepare stage 4
        } else { err.innerText = "Please select a role."; }
    }

    // Requirement: Show/hide stages based on navigation
    if (isValid) {
        err.innerText = "";
        document.getElementById(`stage${current}`).classList.remove('active');
        document.getElementById(`stage${current + 1}`).classList.add('active');
        updateProgressBar(current + 1);
    }
}

function prevStage(current) {
    document.getElementById(`stage${current}`).classList.remove('active');
    document.getElementById(`stage${current - 1}`).classList.add('active');
    updateProgressBar(current - 1);
}

function displaySummary() {
    const summary = document.getElementById('summary');
    summary.innerHTML = `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Reg No:</strong> ${formData.regNo}</p>
        <p><strong>Role:</strong> ${formData.role}</p>
    `;
}

// Requirement: Prevent submission if any stage fails
document.getElementById('workflowForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Data successfully submitted to the server!");
    console.log("Final Data Object:", formData);
});


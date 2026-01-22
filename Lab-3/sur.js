// Requirement: Structure to store questions and types 
const surveyData = [
    {
        id: "q1",
        question: "Enter your Student ID:",
        type: "text",
        required: true,
        limit: 10 // Max characters
    },
    {
        id: "q2",
        question: "How satisfied are you with the lab facilities?",
        type: "radio",
        required: true,
        options: ["Excellent", "Good", "Average", "Poor"]
    },
    {
        id: "q3",
        question: "Which programming languages do you know? (Select at least 2)",
        type: "checkbox",
        required: true,
        minSelection: 2,
        options: ["JavaScript", "Java", "Python", "C++", "PHP"]
    }
];

const questionsArea = document.getElementById('questionsArea');

// Requirement: Dynamically generate form fields 
function buildSurvey() {
    surveyData.forEach((q, index) => {
        const block = document.createElement('div');
        block.className = 'question-block';

        const label = document.createElement('label');
        label.innerText = `${index + 1}. ${q.question}`;
        if (q.required) label.classList.add('mandatory');
        block.appendChild(label);

        const error = document.createElement('div');
        error.id = `error-${q.id}`;
        error.className = 'error-msg';
        
        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = q.id;
            block.appendChild(input);
        } else {
            const optionsGroup = document.createElement('div');
            optionsGroup.className = 'options-group';
            q.options.forEach(opt => {
                const optLabel = document.createElement('label');
                optLabel.style.fontWeight = 'normal';
                const optInput = document.createElement('input');
                optInput.type = q.type;
                optInput.name = q.id;
                optInput.value = opt;
                optLabel.appendChild(optInput);
                optLabel.append(` ${opt}`);
                optionsGroup.appendChild(optLabel);
            });
            block.appendChild(optionsGroup);
        }

        block.appendChild(error);
        questionsArea.appendChild(block);
    });
}

// Requirement: Client-side validation for mandatory, limits, and selections [cite: 32, 33]
function validateSurvey() {
    let isValid = true;

    surveyData.forEach(q => {
        const errorEl = document.getElementById(`error-${q.id}`);
        let questionValid = true;
        let message = "";

        if (q.type === 'text') {
            const val = document.getElementById(q.id).value.trim();
            if (q.required && val === "") {
                questionValid = false;
                message = "This field is mandatory.";
            } else if (q.limit && val.length > q.limit) {
                questionValid = false;
                message = `Maximum ${q.limit} characters allowed.`;
            }
        } else if (q.type === 'radio') {
            const checked = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !checked) {
                questionValid = false;
                message = "Please select an option.";
            }
        } else if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (q.required && q.minSelection && checkedCount < q.minSelection) {
                questionValid = false;
                message = `Please select at least ${q.minSelection} options.`;
            }
        }

        // Requirement: Manipulate DOM to show inline validation 
        if (!questionValid) {
            errorEl.innerText = message;
            errorEl.style.display = 'block';
            isValid = false;
        } else {
            errorEl.style.display = 'none';
        }
    });

    return isValid;
}

// Requirement: Prevent submission until validated [cite: 35]
document.getElementById('dynamicSurvey').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateSurvey()) {
        alert("Survey submitted successfully!");
        console.log("Validation Passed");
    }
});

// Initialize builder
buildSurvey();
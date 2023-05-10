const sampleData = [
    {
        step: 1,
        valid: false,
        content: "<p>Content for step 1</p>",
    },
    {
        step: 2,
        valid: false,
        content: "<p>Content for step 2</p>",
    },
    {
        step: 3,
        valid: false,
        content: "<p>Content for step 3</p>",
    },
    {
        step: 4,
        valid: false,
        content: "<p>Content for step 4</p>",
    },
];

let stepsHTML = "";
for (let i = 0; i < sampleData.length; i++) {
    stepsHTML += `<div class="item">
                    <div id="circle-number-${i}">
                        <div class="circle" id="circle-${i}">
                            <span class="number" id="number-${i}">
                                ${sampleData[i].step}
                            </span>
                        </div>
                        </div>
                        <div class="line ${
                            i === sampleData.length - 1 ? "hide" : ""
                        }" id="line-${i}"></div>
                </div>`;
}

const progressBarEl = document.getElementById("progress-bar");
progressBarEl.innerHTML = stepsHTML;

const stepContentEl = document.getElementById("step-content");
const confirmEl = document.getElementById("confirm");

let currentStep = 0;
const primaryColor = "#4390f4";
const invalidColor = "red";

// Highlight circle
function highlightCircle(color, step) {
    const circleEl = document.getElementById("circle-" + step);
    const numberEl = document.getElementById("number-" + step);

    circleEl.style.border = "4px solid " + color;
    numberEl.style.color = color;
}

// Highlight line
function highlightLine(color, step) {
    const lineEl = document.getElementById("line-" + step);
    lineEl.style.backgroundColor = color;
}

// Highlight the first step by default
highlightCircle(primaryColor, currentStep);
stepContentEl.innerHTML = sampleData[currentStep].content;
const currentEl = document.getElementById("circle-number-" + currentStep);
currentEl.classList.add("highlight_circle");

function nextStep() {
    const val = confirmEl.checked;
    sampleData[currentStep].valid = val;

    if (!sampleData[currentStep].valid) {
        highlightCircle(invalidColor, currentStep);
        highlightLine(invalidColor, currentStep);
    } else {
        highlightCircle(primaryColor, currentStep);
        highlightLine(primaryColor, currentStep);
    }

    // ALL STEPS VISITED
    if (currentStep + 1 === sampleData.length) {
        let isValid = sampleData.filter((step) => !step.valid).length === 0;

        if (isValid) {
            // All fields are valid
            document.getElementById("container").innerHTML =
                "<h1>Successful</h1>";
        }

        return;
    }
    const prevHighlightEl = document.getElementById(
        "circle-number-" + currentStep
    );
    prevHighlightEl.classList.remove("highlight_circle");

    currentStep++;

    const currHighlightEl = document.getElementById(
        "circle-number-" + currentStep
    );
    currHighlightEl.classList.add("highlight_circle");

    highlightCircle(primaryColor, currentStep);
    stepContentEl.innerHTML = sampleData[currentStep].content;
    confirmEl.checked = sampleData[currentStep].valid;
}

function prevStep() {
    if (currentStep === 0) {
        return;
    }
    const val = confirmEl.checked;
    sampleData[currentStep].valid = val;

    if (!sampleData[currentStep].valid) {
        highlightCircle(invalidColor, currentStep);
    } else {
        highlightCircle(primaryColor, currentStep);
    }

    const prevHighlightEl = document.getElementById(
        "circle-number-" + currentStep
    );
    prevHighlightEl.classList.remove("highlight_circle");

    currentStep--;

    const currHighlightEl = document.getElementById(
        "circle-number-" + currentStep
    );
    currHighlightEl.classList.add("highlight_circle");

    stepContentEl.innerHTML = sampleData[currentStep].content;
    confirmEl.checked = sampleData[currentStep].valid;
}

confirmEl.addEventListener("change", function (e) {
    const val = e.currentTarget.checked;
    if (val) {
        highlightCircle(primaryColor, currentStep);
        highlightLine(primaryColor, currentStep);
    } else {
        highlightCircle(invalidColor, currentStep);
        highlightLine(invalidColor, currentStep);
    }
});

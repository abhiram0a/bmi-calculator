document.addEventListener("DOMContentLoaded", function () {
    const unitToggle = document.getElementById("unit-toggle");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    unitToggle.addEventListener("change", toggleHeightInput);
    darkModeToggle.addEventListener("change", toggleDarkMode);
});

function toggleHeightInput() {
    const unit = document.getElementById("unit-toggle").value;
    const metricHeight = document.getElementById("height-input");
    const imperialHeight = document.getElementById("imperial-height-input");

    if (unit === "imperial") {
        metricHeight.classList.add("hidden");
        imperialHeight.classList.remove("hidden");
    } else {
        metricHeight.classList.remove("hidden");
        imperialHeight.classList.add("hidden");
    }
}

function calculateBMI() {
    let weight = parseFloat(document.getElementById("weight").value);
    let unit = document.getElementById("unit-toggle").value;
    let bmi;

    if (unit === "metric") {
        let height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to m
        if (!weight || !height || height <= 0 || weight <= 0) {
            displayError();
            return;
        }
        bmi = weight / (height * height);
    } else {
        let feet = parseFloat(document.getElementById("feet").value);
        let inches = parseFloat(document.getElementById("inches").value);
        let heightInInches = feet * 12 + inches;

        if (!weight || !feet || heightInInches <= 0 || weight <= 0) {
            displayError();
            return;
        }
        bmi = (weight / (heightInInches * heightInInches)) * 703;
    }

    displayBMI(bmi);
}

function displayBMI(bmi) {
    const category = document.getElementById("bmi-category");
    const progressBar = document.getElementById("progress-bar");
    let message, color, width;

    if (bmi < 18.5) {
        message = "Underweight";
        color = "red";
        width = "25%";
    } else if (bmi < 25) {
        message = "Normal Weight";
        color = "green";
        width = "50%";
    } else if (bmi < 30) {
        message = "Overweight";
        color = "orange";
        width = "75%";
    } else {
        message = "Obese";
        color = "darkred";
        width = "100%";
    }

    category.innerHTML = `Your BMI is ${bmi.toFixed(1)} : <strong>${message}</strong>`;
    category.style.color = color;
    progressBar.style.background = color;
    progressBar.style.width = width;
}

function displayError() {
    document.getElementById("bmi-category").textContent = "Please enter valid numbers!";
    document.getElementById("bmi-category").style.color = "red";
    document.getElementById("progress-bar").style.width = "0";
}

function resetForm() {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("feet").value = "";
    document.getElementById("inches").value = "";
    document.getElementById("bmi-category").textContent = "";
    document.getElementById("progress-bar").style.width = "0";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

const form = document.querySelector("form");

const resultsContainer = document.createElement("div");
const title = document.createElement("h2");
const caloriesPerDay = document.createElement("div");
const cpdNum = document.createElement("p");
const cpdText = document.createElement("p");
const caloriesPerWeek = document.createElement("div");
const cpwNum = document.createElement("p");
const cpwText = document.createElement("p");
const explanation = document.createElement("p");

document.body.append(resultsContainer);
resultsContainer.append(title, caloriesPerDay, caloriesPerWeek, explanation)
caloriesPerDay.append(cpdNum, cpdText);
caloriesPerWeek.append(cpwNum, cpwText);


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = form.elements.age.value;
    const height = form.elements.height.value;
    const weight = form.elements.weight.value;
    const activity = form.elements.activity.value;    
    const gender = form.elements.gender.value;
    const result = calculateBMI(gender,age, height, weight, activity) 
    displayResults(result)
})

const calculateBMI = (sex, age, height, weight, activity) => {
    const ageToNum = parseInt(age) * 5;
    const heightToNum = parseInt(height) * 6.25;
    const weightToNum = parseInt(weight) * 10;
    const activityToNum = parseFloat(activity);
    let result;
    if(sex === "male") result = (weightToNum + heightToNum - ageToNum + 5) * activityToNum
    if(sex === "female") result = (weightToNum + heightToNum - ageToNum -161) * activityToNum
    return Math.floor(result)
}

//Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
//Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

const displayResults = (calories) => {
    title.innerText = "Your Maintenance Calories";
    cpdNum.innerText = calories;
    cpdText.innerText = "calories per day";
    cpwNum.innerText = calories * 7;
    cpwText.innerText = "calories per week";
    explanation.innerText = `Based on your stats, the best estimate for your maintenance calories is
    ${calories} calories per day based on the Mifflin-St Jeor Formula, which is widely known to be the most accurate.`
} 
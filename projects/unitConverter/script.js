
let inputNum = document.getElementById("inputNum");
let length = document.getElementById("length");
let volume = document.getElementById("volume");
let mass = document.getElementById("mass");
let convert = document.getElementById("convert");

convert.addEventListener("click", function() {
    length.innerHTML = `
    ${inputNum.value} meters = ${(inputNum.value * 3.28084).toFixed(3)} feet | 
    ${inputNum.value} feet = ${(inputNum.value * 0.3048).toFixed(3)} meters
    `

    volume.innerHTML = `
    ${inputNum.value} liters = ${(inputNum.value * 0.264172).toFixed(3)} gallons | 
    ${inputNum.value} gallons = ${(inputNum.value * 3.78541).toFixed(3)} liters
    `

    mass.innerHTML = `
    ${inputNum.value} kilos = ${(inputNum.value * 2.20462).toFixed(3)} pounds | 
    ${inputNum.value} pounds = ${(inputNum.value * 0.453592).toFixed(3)} kilos
    `
});
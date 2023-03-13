const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clear = document.getElementById("clear-btn");

// Calculate first and second values depemding on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

// Function for decimal number
function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;

  // If no decimal, add one - ako ne ukljucuje ovu tacku tj. decimal
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    // Obavezno staviti ovo, jer u suprotnom necu restartovati operator
    operatorValue = operator;
    return;
  }

  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Event Listener
clear.addEventListener("click", resetAll);

// Kratko objasnjenje:
// inputBtns mi je niz, jer sam koristio querySelectorAll i dobio nazad sva dugmad
// Mogu da prosledim f-ju inputBtn.value, jer sam u HTML fajlu svakom elementu dodelio value
// Da bih pozvao nad svakim dugmetom event listener, kao drugi parametar stavim Arrow f-ju, () => sendNumberValue(inputBtn.value)
// Ako je displayValue jednako 0 zamenjujem 0 sa brojem, a ako nije jednak 0, vec imam neki broj, onda dodajem taj broj na displayValue
// Proveravam da li postoji decimal, ako ne postoji stavljam na taj broj koji je prikazan na ekranu sa tackom, da bude decimal
// Napravio sam objekat sa poljima, gde je key neki operator, a value sta radi zapravo taj operator, tipa firstNumber + secondNumber
// U f-ji useOperator, pod else prosledim da je objekat calculate jednak indeksu od keya iz samog objekta, to je operator i stavim kao parametre firstValue i currentValue, gde je firstValue prvi broj, a currentValue drugi broj
// Da bih mogao da nastavim racunanje, stavim da mi je firstValue jednak calculation, to znaci da je prvi broj jednak onom poslednjem i da na poslednji broj dodajem novi broj

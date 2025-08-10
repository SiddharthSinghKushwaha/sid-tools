const quotes = [
  "Believe in yourself. You are stronger than you think.",
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Start where you are. Use what you have. Do what you can.",
  "You don't have to be perfect to be amazing.",
  "Every accomplishment starts with the decision to try.",
  "Stay focused. Go after your dreams and keep moving toward your goals.",
  "Be the energy you want to attract.",
  "Doubt kills more dreams than failure ever will.",
  "Progress, not perfection."
];

let currentIndex = 0;

const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote-text");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function displayQuote(index) {
  quoteText.textContent = quotes[index];
  quoteBox.classList.remove("fade");
  void quoteBox.offsetWidth; // trigger reflow to restart animation
  quoteBox.classList.add("fade");
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % quotes.length;
  displayQuote(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  displayQuote(currentIndex);
});

displayQuote(currentIndex); // initial load

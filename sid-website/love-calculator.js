document.getElementById("calculate-btn").addEventListener("click", () => {
  const name1 = document.getElementById("name1").value.trim().toLowerCase().replace(/[^a-z]/g, '');
  const name2 = document.getElementById("name2").value.trim().toLowerCase().replace(/[^a-z]/g, '');

  const resultBox = document.getElementById("result");

  if (!name1 || !name2) {
    resultBox.innerHTML = "Please enter both names 💔";
    return;
  }

  const keyword = "truelove";
  const combined = name1 + name2;
  let countString = "";

  for (let char of keyword) {
    const regex = new RegExp(char, 'g');
    const count = (combined.match(regex) || []).length;
    countString += count;
  }

  // Reduce to two-digit number
  let reduced = countString;
  while (reduced.length > 2) {
    let temp = '';
    for (let i = 0; i < reduced.length - 1; i++) {
      const sum = parseInt(reduced[i]) + parseInt(reduced[i + 1]);
      temp += sum % 10;
    }
    reduced = temp;
  }

  const score = parseInt(reduced);
  let message = "";

  if (score >= 80) message = "💖 Perfect match!";
  else if (score >= 60) message = "💘 Strong bond!";
  else if (score >= 40) message = "💡 Getting there!";
  else if (score >= 20) message = "🤔 Needs effort!";
  else message = "💔 Not a match, but never lose hope!.";

  resultBox.innerHTML = `Love Score: <strong>${score}%</strong><br>${message}`;
});

document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("name1").value = "";
  document.getElementById("name2").value = "";
  document.getElementById("result").innerHTML = "";
});

// Auto-clear result when typing new names
document.getElementById('name1').addEventListener('input', () => {
  document.getElementById('result').textContent = '';
});

document.getElementById('name2').addEventListener('input', () => {
  document.getElementById('result').textContent = '';
});

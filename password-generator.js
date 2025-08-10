document.addEventListener("DOMContentLoaded", () => {
  const lengthSlider = document.getElementById("length");
  const lengthValue = document.getElementById("length-value");
  const passwordField = document.getElementById("password");
  const generateBtn = document.getElementById("generate");
  const copyBtn = document.getElementById("copy");

  const uppercase = document.getElementById("uppercase");
  const lowercase = document.getElementById("lowercase");
  const numbers = document.getElementById("numbers");
  const symbols = document.getElementById("symbols");

  const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerSet = "abcdefghijklmnopqrstuvwxyz";
  const numberSet = "0123456789";
  const symbolSet = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
  });

  generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthSlider.value);
    let charPool = "";

    if (uppercase.checked) charPool += upperSet;
    if (lowercase.checked) charPool += lowerSet;
    if (numbers.checked) charPool += numberSet;
    if (symbols.checked) charPool += symbolSet;

    if (!charPool) {
      passwordField.value = "Please select at least one character set.";
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * charPool.length);
      password += charPool.charAt(rand);
    }

    passwordField.value = password;
  });

  copyBtn.addEventListener("click", () => {
    if (!passwordField.value || passwordField.value.includes("Please select")) return;
    passwordField.select();
    navigator.clipboard.writeText(passwordField.value);
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
});

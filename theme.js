function setTheme(theme) {
  document.body.classList.remove("light", "dark", "neon");
  document.body.classList.add(theme);
  localStorage.setItem("selectedTheme", theme);

  // Force redraw particle color
  if (typeof getParticleColor === 'function') {
    // Wait a moment to let class apply
    setTimeout(() => {
      // You can force re-render here if needed
    }, 50);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme") || "neon";
  setTheme(savedTheme);
});

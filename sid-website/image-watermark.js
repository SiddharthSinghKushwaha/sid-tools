const imageUpload = document.getElementById("imageUpload");
const originalImage = document.getElementById("originalImage");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const watermarkText = document.getElementById("watermarkText");
const fontSizeInput = document.getElementById("fontSize");
const opacityInput = document.getElementById("opacity");
const colorPicker = document.getElementById("colorPicker");
const positionSelect = document.getElementById("position");

const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

let uploadedImage = new Image();
let imageReady = false;

function updateCanvas() {
  if (!imageReady) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  const text = watermarkText.value.trim();
  if (!text) return;

  const fontSize = parseInt(fontSizeInput.value);
  const opacity = parseFloat(opacityInput.value);
  const color = colorPicker.value;
  const position = positionSelect.value;

  ctx.font = `${fontSize}px Courier New`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;

  const textWidth = ctx.measureText(text).width;
  const textHeight = fontSize;
  let x = 10, y = textHeight + 10;

  if (position === "top-right") {
    x = canvas.width - textWidth - 10;
  } else if (position === "bottom-left") {
    y = canvas.height - 10;
  } else if (position === "bottom-right") {
    x = canvas.width - textWidth - 10;
    y = canvas.height - 10;
  } else if (position === "center") {
    x = (canvas.width - textWidth) / 2;
    y = (canvas.height + textHeight) / 2;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage.onload = () => {
      imageReady = true;
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;
      originalImage.src = uploadedImage.src;
      updateCanvas(); // initial render
    };
    uploadedImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// Live preview on changes
[watermarkText, fontSizeInput, opacityInput, colorPicker, positionSelect]
  .forEach(input => input.addEventListener("input", updateCanvas));

downloadBtn.addEventListener("click", () => {
  if (!imageReady) return;
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
});

resetBtn.addEventListener("click", () => {
  imageUpload.value = "";
  watermarkText.value = "";
  fontSizeInput.value = 24;
  opacityInput.value = 0.5;
  colorPicker.value = "#ffffff";
  positionSelect.value = "top-left";
  
  imageReady = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.height = 0;
  originalImage.src = "";
});

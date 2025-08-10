let originalImage = null;

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const convertBtn = document.getElementById('convert-btn');
const targetSizeInput = document.getElementById('target-size');
const canvas = document.getElementById('preview-canvas');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('download-link');

dropArea.addEventListener('click', () => fileInput.click());

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.borderColor = 'lime';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.borderColor = 'var(--accent-color)';
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleImage(file);
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file && file.type.startsWith('image/')) {
    handleImage(file);
  }
});

function handleImage(file) {
  const fileInfo = document.getElementById('file-info');
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  fileInfo.textContent = `${file.name} — ${sizeMB} MB`;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById("reset-btn").addEventListener("click", () => {
  originalImage = null;
  fileInput.value = null;
  canvas.style.display = "none";
  document.getElementById("file-info").textContent = "";
  downloadLink.style.display = "none";
});



convertBtn.addEventListener('click', () => {
  if (!originalImage) return alert("Please upload an image first!");

  const input = targetSizeInput.value.toLowerCase().trim();
  const sizeMatch = input.match(/^(\d+)(kb|mb)$/);
  if (!sizeMatch) {
    return alert("Enter size like 200KB or 1MB");
  }

  const sizeValue = parseInt(sizeMatch[1]);
  const sizeUnit = sizeMatch[2];
  const targetBytes = sizeUnit === 'mb' ? sizeValue * 1024 * 1024 : sizeValue * 1024;

  // Draw image on canvas
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.drawImage(originalImage, 0, 0);

  let quality = 1.0;
  let output = "";

  function tryCompress() {
    output = canvas.toDataURL("image/jpeg", quality);
    if (output.length * 0.75 > targetBytes && quality > 0.1) {
      quality -= 0.05;
      tryCompress();
    }
  }

  tryCompress();

  canvas.style.display = 'block';
  downloadLink.href = output;
  downloadLink.style.display = 'inline-block';
});

const dropZone = document.getElementById('drop-zone');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const formatSelect = document.getElementById('formatSelect');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const downloadSection = document.getElementById('download-section');
const uploadAgainBtn = document.getElementById('uploadAgainBtn');

let uploadedImage = null;

// Highlight on drag
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

// Drop file
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  handleImage(file);
});

// Click opens file input
dropZone.addEventListener('click', () => {
  imageInput.click();
});

// Handle manual file input
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  handleImage(file);
});

function handleImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Please upload a valid image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedImage = new Image();
    uploadedImage.onload = () => {
      preview.src = uploadedImage.src;
      preview.style.display = 'block';
      downloadSection.style.display = 'none';
      uploadAgainBtn.style.display = 'inline-block';
    };
    uploadedImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

convertBtn.addEventListener('click', () => {
  if (!uploadedImage) {
    alert("Upload an image first.");
    return;
  }

  const ctx = canvas.getContext('2d');
  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;
  ctx.drawImage(uploadedImage, 0, 0);

  const selectedFormat = formatSelect.value;
  const dataURL = canvas.toDataURL(selectedFormat);

  downloadLink.href = dataURL;
  downloadLink.download = `converted-image.${selectedFormat.split('/')[1]}`;
  downloadSection.style.display = 'block';
});

uploadAgainBtn.addEventListener('click', () => {
  uploadedImage = null;
  preview.src = '';
  preview.style.display = 'none';
  imageInput.value = '';
  downloadSection.style.display = 'none';
  uploadAgainBtn.style.display = 'none';
});

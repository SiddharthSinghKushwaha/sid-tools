const upload = document.getElementById('upload');
const uploadedImg = document.getElementById('uploaded-img');
const cropBox = document.getElementById('crop-box');
const cropBtn = document.getElementById('crop-btn');
const resetBtn = document.getElementById('reset-btn');
const imageContainer = document.getElementById('image-container');

let startX, startY, startWidth, startHeight;
let isDragging = false;
let isResizing = false;
let currentResizer;

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    uploadedImg.src = evt.target.result;
    uploadedImg.style.display = 'block';
    cropBox.style.display = 'block';

    // After image loads, center crop box
    uploadedImg.onload = () => {
      cropBox.style.left = uploadedImg.width / 4 + 'px';
      cropBox.style.top = uploadedImg.height / 4 + 'px';
      cropBox.style.width = uploadedImg.width / 2 + 'px';
      cropBox.style.height = uploadedImg.height / 2 + 'px';
    };
  };
  reader.readAsDataURL(file);
});

// Drag move
cropBox.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('resizer')) {
    isResizing = true;
    currentResizer = e.target;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(cropBox).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(cropBox).height, 10);
    return;
  }

  isDragging = true;
  startX = e.clientX - cropBox.offsetLeft;
  startY = e.clientY - cropBox.offsetTop;
});

document.addEventListener('mousemove', function (e) {
  if (isDragging) {
    cropBox.style.left = e.clientX - startX + 'px';
    cropBox.style.top = e.clientY - startY + 'px';
  }

  if (isResizing) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (currentResizer.classList.contains('bottom-right')) {
      cropBox.style.width = startWidth + dx + 'px';
      cropBox.style.height = startHeight + dy + 'px';
    } else if (currentResizer.classList.contains('bottom-left')) {
      cropBox.style.width = startWidth - dx + 'px';
      cropBox.style.left = cropBox.offsetLeft + dx + 'px';
      cropBox.style.height = startHeight + dy + 'px';
    } else if (currentResizer.classList.contains('top-right')) {
      cropBox.style.width = startWidth + dx + 'px';
      cropBox.style.height = startHeight - dy + 'px';
      cropBox.style.top = cropBox.offsetTop + dy + 'px';
    } else if (currentResizer.classList.contains('top-left')) {
      cropBox.style.width = startWidth - dx + 'px';
      cropBox.style.left = cropBox.offsetLeft + dx + 'px';
      cropBox.style.height = startHeight - dy + 'px';
      cropBox.style.top = cropBox.offsetTop + dy + 'px';
    }
  }
});

document.addEventListener('mouseup', function () {
  isDragging = false;
  isResizing = false;
});

// Crop & Download
cropBtn.addEventListener('click', () => {
  const img = uploadedImg;
  if (!img.src) return;

  const canvas = document.createElement('canvas');
  const scaleX = img.naturalWidth / img.width;
  const scaleY = img.naturalHeight / img.height;

  const cropX = parseInt(cropBox.style.left) - img.offsetLeft;
  const cropY = parseInt(cropBox.style.top) - img.offsetTop;
  const cropW = parseInt(cropBox.style.width);
  const cropH = parseInt(cropBox.style.height);

  canvas.width = cropW * scaleX;
  canvas.height = cropH * scaleY;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, cropX * scaleX, cropY * scaleY, cropW * scaleX, cropH * scaleY, 0, 0, canvas.width, canvas.height);

  const link = document.createElement('a');
  link.download = 'cropped-image.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Reset
resetBtn.addEventListener('click', () => {
  uploadedImg.src = '';
  uploadedImg.style.display = 'none';
  cropBox.style.display = 'none';
  upload.value = '';
});

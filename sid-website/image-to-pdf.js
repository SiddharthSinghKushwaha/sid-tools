const uploadArea = document.getElementById("upload-area");
const fileInput = document.getElementById("image-input");
const uploadBtn = document.getElementById("upload-btn");
const preview = document.getElementById("preview");
const convertBtn = document.getElementById("convert-pdf-btn");
const downloadLink = document.getElementById("download-link");
const clearBtn = document.getElementById("clear-btn");

let images = [];

uploadArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  images = images.concat([...e.target.files]);
  renderPreview();
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const newFiles = [...e.dataTransfer.files].filter(file => file.type.startsWith("image/"));
  images = images.concat(newFiles);
  renderPreview();
});


uploadArea.addEventListener("dragleave", () => {
  uploadArea.style.borderColor = "var(--accent-color)";
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  images = [...e.dataTransfer.files].filter(file => file.type.startsWith("image/"));
  renderPreview();
});

function renderPreview() {
  preview.innerHTML = "";
  images.forEach(imgFile => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(imgFile);
    preview.appendChild(img);
  });
}

convertBtn.addEventListener("click", async () => {
  if (!images.length) {
    alert("Please upload images first!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for (let i = 0; i < images.length; i++) {
    const imgFile = images[i];
    const imgData = await toDataURL(imgFile);
    const img = new Image();
    img.src = imgData;

    await new Promise(resolve => {
      img.onload = () => {
        const width = pdf.internal.pageSize.getWidth();
        const height = (img.height / img.width) * width;
        if (i > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, width, height);
        resolve();
      };
    });
  }

  const pdfBlob = pdf.output("blob");
  downloadLink.href = URL.createObjectURL(pdfBlob);
  downloadLink.style.display = "inline-block";
});

function toDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

clearBtn.addEventListener("click", () => {
  images = [];
  preview.innerHTML = "";
  fileInput.value = "";
  downloadLink.style.display = "none";
});

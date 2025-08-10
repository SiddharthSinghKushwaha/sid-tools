const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const downloadLink = document.getElementById("download-link");
const qrContainer = document.getElementById("qr-container");

let qrCode = new QRCodeStyling({
  width: 256,
  height: 256,
  type: "canvas",
  data: "",
  image: "",
  dotsOptions: {
    color: "#000",
    type: "square"
  },
  backgroundOptions: {
    color: "#ffffff"
  }
});

generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim();
  if (!text) {
    alert("Enter a valid URL or text.");
    return;
  }

  // Update data
  qrCode.update({ data: text });

  // Clear container first
  qrContainer.innerHTML = "";
  qrCode.append(qrContainer);

  // Delay to ensure canvas is ready
  setTimeout(() => {
    qrCode.getRawData("png").then(blob => {
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.style.display = "inline-block";
    });
  }, 500);
});

resetBtn.addEventListener("click", () => {
  qrInput.value = "";
  qrContainer.innerHTML = "";
  downloadLink.style.display = "none";
});

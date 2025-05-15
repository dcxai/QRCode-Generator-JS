"use strict";

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
  // Get references to DOM elements
  const qrForm = document.getElementById("qrForm");
  const qrText = document.getElementById("qrText");
  const qrcodeContainer = document.getElementById("qrcode");
  const saveButton = document.getElementById("saveButton");

  // Listen for form submission to generate QR Code
  qrForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Clear any previous QR Code and hide the save button
    qrcodeContainer.innerHTML = "";
    saveButton.style.display = "none";

    // Get the input text
    const text = qrText.value.trim();
    if (text === "") {
      alert("Please enter some text or URL.");
      return;
    }

    // Create a new QR Code using qrcodejs
    // Options can be adjusted as needed
    new QRCode(qrcodeContainer, {
      text: text,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    
    // Delay showing the save button to ensure the QR code has been rendered
    setTimeout(() => {
      // Check if a canvas element was generated
      const canvasEl = qrcodeContainer.querySelector("canvas");
      const imgEl = qrcodeContainer.querySelector("img");
      
      if (canvasEl || imgEl) {
        // Show the save button
        saveButton.style.display = "block";
      }
    }, 500);
  });

  // Listen for click event on the save button
  saveButton.addEventListener("click", function() {
    let dataUrl = "";
    // Try to find a canvas element first
    const canvasEl = qrcodeContainer.querySelector("canvas");
    // If canvas exists, use its dataURL; otherwise look for an image
    if (canvasEl) {
      dataUrl = canvasEl.toDataURL("image/png");
    } else {
      const imgEl = qrcodeContainer.querySelector("img");
      if (imgEl) {
        dataUrl = imgEl.src;
      }
    }
    
    if (dataUrl === "") {
      alert("No QR code available to save.");
      return;
    }
    
    // Create a temporary anchor element for downloading the image
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "qrcode.png";
    // Append the anchor to the body and trigger a click, then remove it
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  });
});

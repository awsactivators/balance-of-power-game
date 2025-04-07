function startScanner() {
    document.getElementById("scanner").style.display = "block";
    document.getElementById("closeScanner").style.display = "block";

    const html5QrCode = new Html5Qrcode("scanner");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
            html5QrCode.stop().then(() => {
                // If the message is a full valid URL starting with http(s), use it directly
                if (qrCodeMessage.startsWith("http://") || qrCodeMessage.startsWith("https://")) {
                  window.location.href = qrCodeMessage;
                }
        
                // If the message is a relative path like balance-of-power-game/location-object.html?1000
                else if (qrCodeMessage.startsWith("balance-of-power-game")) {
                  window.location.href = `${window.location.origin}/${qrCodeMessage}`;
                }
        
                // If the message is just a 4-digit code like 
                else if (/^\d{4}$/.test(qrCodeMessage.trim())) {
                  const code = qrCodeMessage.trim();
                  window.location.href = `${window.location.origin}/balance-of-power-game/location-object.html?${code}`;
                }
        
                else {
                  alert("Invalid QR code format. It must contain a valid ID or path.");
                }
              });
        },
        errorMessage => {
          console.warn("QR scan error", errorMessage);
        }
      ).catch(err => {
        console.error("Error starting scanner", err);
    });

    // Store reference for stopping
    window.html5QrCodeInstance = html5QrCode;
}

function showScanner() {
    const scannerDiv = document.createElement("div");
    scannerDiv.id = "scanner";
    document.body.appendChild(scannerDiv);
  
    const html5QrCode = new Html5Qrcode("scanner");
  
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      qrCodeMessage => {
        html5QrCode.stop().then(() => {
          window.location.href = `location-object.html?${qrCodeMessage}`;
        });
      },
      errorMessage => {
        console.warn("QR Code scan error", errorMessage);
      }
    ).catch(err => {
      console.error("Unable to start scanner", err);
    });
  
    // Store for stopping later (if needed)
    window.html5QrCodeInstance = html5QrCode;
  }
  

function stopScanner() {
    if (window.html5QrCodeInstance) {
        window.html5QrCodeInstance.stop().then(() => {
            document.getElementById("scanner").style.display = "none";
            document.getElementById("closeScanner").style.display = "none";
        });
    }
}

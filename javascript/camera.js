function startScanner() {
    document.getElementById("scanner").style.display = "block";
    document.getElementById("closeScanner").style.display = "block";

    const html5QrCode = new Html5Qrcode("scanner");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
            html5QrCode.stop().then(() => {
                window.location.href = qrCodeMessage;
            });
        },
        errorMessage => {
            console.warn("QR Code scan error", errorMessage);
        }
    ).catch(err => {
        console.error("Error starting scanner", err);
    });

    // Store reference for stopping
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

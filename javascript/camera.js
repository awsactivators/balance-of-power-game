function startScanner() {
    document.getElementById("scanner").style.display = "block";

    const html5QrCode = new Html5Qrcode("scanner");

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;

            html5QrCode.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: 250
                },
                qrCodeMessage => {
                    console.log(`Scanned: ${qrCodeMessage}`);

                    // Stop scanner before redirect
                    html5QrCode.stop().then(() => {
                        document.getElementById("scanner").style.display = "none";
                        // Redirect user to scanned URL
                        window.location.href = qrCodeMessage;
                    }).catch(err => {
                        console.error("Failed to stop scanner", err);
                    });
                },
                errorMessage => {
                    console.warn(`QR Code scan error: ${errorMessage}`);
                }
            ).catch(err => {
                console.error("Unable to start scanning", err);
            });
        }
    }).catch(err => {
        console.error("Camera access failed", err);
    });
}
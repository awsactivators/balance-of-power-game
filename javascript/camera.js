document.getElementById('startCamera').addEventListener('click', async () => {
    const video = document.getElementById('videoElement');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('Could not access the camera. Please check permissions.');
    }
});
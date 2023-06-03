let mediaRecorder;
let recordedChunks = [];

// Function to handle the start recording button click
function startRecording() {
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.start();
        })
        .catch(function (error) {
            console.error('Error accessing media devices:', error);
        });

    // Update button states
    document.getElementById('start-button').disabled = true;
    document.getElementById('stop-button').disabled = false;
}

// Function to handle the stop recording button click
function stopRecording() {
    mediaRecorder.stop();
    // Update button states
    document.getElementById('start-button').disabled = false;
    document.getElementById('stop-button').disabled = true;
}

// Function to handle data available event
function handleDataAvailable(event) {
    recordedChunks.push(event.data);
    if (mediaRecorder.state === 'inactive') {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const recordedVideo = document.getElementById('recorded-video');
        recordedVideo.src = URL.createObjectURL(blob);
        recordedChunks = [];
    }
}

// Event listeners for the start and stop buttons
document.getElementById('start-button').addEventListener('click', startRecording);
document.getElementById('stop-button').addEventListener('click', stopRecording);

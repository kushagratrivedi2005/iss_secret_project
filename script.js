const dropArea = document.getElementById('drop-area');
const imageUpload = document.getElementById('imageUpload');
const uploadedImagesContainer = document.getElementById('uploadedImages');

imageUpload.addEventListener('change', handleImageUpload);

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('drag-over');

    const files = event.dataTransfer.files;
    handleFiles(files);
});

function handleImageUpload(event) {
    const files = event.target.files;
    handleFiles(files);
}

document.getElementById('backgroundMusic').addEventListener('change', function() {
    const audioPreview = document.getElementById('audioPreview');
    const fileInput = this;
    
    if (fileInput.files.length > 0) {
        const audioFile = URL.createObjectURL(fileInput.files[0]);
        audioPreview.src = audioFile;
    } else {
        audioPreview.src = '';
    }
});


function handleFiles(files) {
    let storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    
    for (const file of files) {
        const img = document.createElement('img');
        const imageUrl = URL.createObjectURL(file);

        img.src = imageUrl;
        uploadedImagesContainer.appendChild(img);

        storedImages.push(imageUrl);
    }

    // Save the updated image URLs to local storage
    localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
}

const durationInput = document.getElementById('duration');
const selectedDuration = parseInt(durationInput.value, 10); // Convert to integer

// Use selectedDuration when creating the video
createVideo(selectedDuration);


// Add more JavaScript for other functionalities

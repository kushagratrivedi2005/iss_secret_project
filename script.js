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

    // Clear the uploadedImagesContainer before adding new images
    uploadedImagesContainer.innerHTML = '';

    for (const file of files) {
        const imgContainer = document.createElement('div'); // Container for each image
        imgContainer.classList.add('image-container');

        const img = document.createElement('img');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-button');

        const imageUrl = URL.createObjectURL(file);

        img.src = imageUrl;
        img.style.width = '100px'; // Set the width of the image (adjust as needed)
        img.style.height = '100px'; // Set the height of the image (adjust as needed)
        img.style.objectFit = 'cover'; // Maintain aspect ratio within fixed dimensions
        imgContainer.appendChild(img);
        imgContainer.appendChild(removeBtn);
        uploadedImagesContainer.appendChild(imgContainer);

        storedImages.push(imageUrl);

        // Attach a click event to the remove button
        removeBtn.addEventListener('click', function() {
            // Remove the image container from the DOM
            imgContainer.remove();

            // Remove the corresponding image URL from the storedImages array
            storedImages = storedImages.filter((url) => url !== imageUrl);

            // Save the updated image URLs to local storage
            localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
        });
    }

    // Save the updated image URLs to local storage
    localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
}

const durationInput = document.getElementById('duration');
const selectedDuration = parseInt(durationInput.value, 10); // Convert to integer

function applyOutputSettings() {
    // Get selected resolution and quality
    var selectedResolution = document.getElementById("resolution").value;
    var selectedQuality = document.getElementById("quality").value;

    // Use the selected values as needed (you may send them to the server or use them client-side)
    console.log("Selected Resolution: ", selectedResolution);
    console.log("Selected Quality: ", selectedQuality);

    // Add logic to apply settings (e.g., send an API request, update video preview, etc.)
    // This can be done using AJAX, fetch API, or other methods depending on your setup.
}


// Use selectedDuration when creating the video
createVideo(selectedDuration);

// Add more JavaScript for other functionalities

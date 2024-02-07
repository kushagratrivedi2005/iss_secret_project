    
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

        // Don't clear the container here
        // uploadedImagesContainer.innerHTML = '';

        for (const file of files) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            const img = document.createElement('img');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-button');

            const imageUrl = URL.createObjectURL(file);

            img.src = imageUrl;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            imgContainer.appendChild(img);
            imgContainer.appendChild(removeBtn);
            uploadedImagesContainer.appendChild(imgContainer);

            storedImages.push(imageUrl);


            removeBtn.addEventListener('click', function () {
                imgContainer.remove();
                storedImages = storedImages.filter((url) => url !== imageUrl);
                localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
            });
        }

        localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
    }

    const durationInput = document.getElementById('duration');
    const selectedDuration = parseInt(durationInput.value, 10);

    function applyOutputSettings() {
        var selectedResolution = document.getElementById("resolution").value;
        var selectedQuality = document.getElementById("quality").value;
        console.log("Selected Resolution: ", selectedResolution);
        console.log("Selected Quality: ", selectedQuality);
    }

    createVideo(selectedDuration);
});

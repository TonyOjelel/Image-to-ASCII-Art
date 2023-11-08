const imageInput = document.getElementById('imageInput');
const outputCanvas = document.getElementById('outputCanvas');
const asciiArtContainer = document.getElementById('asciiArtContainer');
const convertButton = document.getElementById('convertButton');

convertButton.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (file) {
        if (file.type.startsWith('image')) {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = function (e) {
                img.src = e.target.result;
                img.onload = function () {
                    outputCanvas.width = img.width;
                    outputCanvas.height = img.height;
                    const ctx = outputCanvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = ctx.getImageData(0, 0, img.width, img.height);

                    // Process imageData to ASCII art here (you can use a library or write your own algorithm).

                    asciiArtContainer.textContent = convertImageDataToASCII(imageData);
                };
            };

            reader.readAsDataURL(file);
        } else if (file.type === 'image/gif') {
            // Handle GIF conversion using gif.js library
            // You'll need to implement the GIF processing logic here.
        } else {
            alert('Unsupported file format. Please upload an image or GIF.');
        }
    }
});

// You need to implement the function convertImageDataToASCII to convert imageData to ASCII art.
function convertImageDataToASCII(imageData) {
    const { data, width, height } = imageData;
    const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

    let asciiArt = '';
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        // Map brightness to ASCII characters
        const asciiIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
        const asciiChar = asciiChars[asciiIndex];

        asciiArt += asciiChar;

        // Add line breaks at the end of each row
        if ((i / 4 + 1) % width === 0) {
            asciiArt += '\n';
        }
    }

    return asciiArt;
}


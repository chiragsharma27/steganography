function encodeText() {
    const textToEncode = document.getElementById('textToEncode').value;
    const coverImage = document.getElementById('coverImage').files[0];
  
    if (!textToEncode || !coverImage) {
      alert('Please enter text and select a cover image.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const image = new Image();
      image.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        ctx.font = '16px Arial';
        ctx.fillText(textToEncode, 10, 20); // Adjust position as needed
  
        const encodedImage = canvas.toDataURL('image/jpeg');
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = encodedImage;
        downloadLink.download = 'encoded_image.jpg';
        downloadLink.style.display = 'block';
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(coverImage);
  }
  
  function decodeText() {
    const encodedImage = document.getElementById('encodedImage').files[0];
  
    if (!encodedImage) {
      alert('Please select an encoded image.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const image = new Image();
      image.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        let decodedText = '';
        for (let i = 0; i < pixels.length; i += 4) {
          decodedText += String.fromCharCode(pixels[i]);
        }
  
        document.getElementById('decodedText').value = decodedText;
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(encodedImage);
  }
  
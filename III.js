function encodeImage() {
    const hiddenImage = document.getElementById('hiddenImage').files[0];
    const coverImage = document.getElementById('coverImage').files[0];
  
    if (!hiddenImage || !coverImage) {
      alert('Please select both the hidden image and cover image.');
      return;
    }
  
    const readerHidden = new FileReader();
    readerHidden.onload = function() {
      const readerCover = new FileReader();
      readerCover.onload = function() {
        const hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = hiddenImage.width;
        hiddenCanvas.height = hiddenImage.height;
        const hiddenContext = hiddenCanvas.getContext('2d');
        hiddenContext.drawImage(hiddenImage, 0, 0);
        
        const coverCanvas = document.createElement('canvas');
        coverCanvas.width = coverImage.width;
        coverCanvas.height = coverImage.height;
        const coverContext = coverCanvas.getContext('2d');
        coverContext.drawImage(coverImage, 0, 0);
        
        coverContext.drawImage(hiddenCanvas, 0, 0);
        
        const encodedImage = coverCanvas.toDataURL('image/jpeg');
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = encodedImage;
        downloadLink.download = 'encoded_image.jpg';
        downloadLink.style.display = 'block';
      };
      readerCover.readAsDataURL(coverImage);
    };
    readerHidden.readAsDataURL(hiddenImage);
  }
  
  function decodeImage() {
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
  
        let decodedImageData = [];
        for (let i = 0; i < pixels.length; i += 4) {
          decodedImageData.push(pixels[i]);
        }
  
        const decodedImageArray = new Uint8Array(decodedImageData);
        const blob = new Blob([decodedImageArray], { type: 'image/jpeg' });
        const decodedImageUrl = URL.createObjectURL(blob);
        const decodedImage = document.getElementById('decodedImage');
        decodedImage.src = decodedImageUrl;
        decodedImage.style.display = 'block';
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(encodedImage);
  }
  
import React from 'react';

const DownloadButton = ({ image, adjustments }) => {
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for images from other origins
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // Apply CSS filters to the canvas
      ctx.filter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturate}%)`;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'propic-edited-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.onerror = (err) => {
      console.error('Image loading failed:', err);
      alert('Failed to load image for download. Please ensure the image is accessible.');
    };
  };

  return (
    <button onClick={handleDownload} className="download-button" disabled={!image}>
      Download Image
    </button>
  );
};

export default DownloadButton;

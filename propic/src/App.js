import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import Sidebar from './components/Sidebar';

function App() {
  const [image, setImage] = useState(null);
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
  });

  const handleAdjustmentChange = (adjustment, value) => {
    setAdjustments((prev) => ({
      ...prev,
      [adjustment]: value,
    }));
  };

  const imageStyle = {
    filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturate}%)`,
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>ProPic Photo Editor</h1>
      </header>
      <main className="editor-layout">
        <Sidebar
          image={image}
          adjustments={adjustments}
          onAdjustmentChange={handleAdjustmentChange}
        />
        <div className="main-content">
          {!image && <ImageUploader onImageUpload={setImage} />}
          {image && (
            <div className="image-container">
              <img src={image} alt="Uploaded" style={imageStyle} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

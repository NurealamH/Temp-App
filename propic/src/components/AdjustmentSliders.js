import React from 'react';

const AdjustmentSliders = ({ adjustments, onAdjustmentChange }) => {
  return (
    <div className="adjustment-sliders">
      <div className="slider-group">
        <label>Brightness</label>
        <input
          type="range"
          min="0"
          max="200"
          value={adjustments.brightness}
          onChange={(e) => onAdjustmentChange('brightness', e.target.value)}
        />
      </div>
      <div className="slider-group">
        <label>Contrast</label>
        <input
          type="range"
          min="0"
          max="200"
          value={adjustments.contrast}
          onChange={(e) => onAdjustmentChange('contrast', e.target.value)}
        />
      </div>
      <div className="slider-group">
        <label>Saturation</label>
        <input
          type="range"
          min="0"
          max="200"
          value={adjustments.saturate}
          onChange={(e) => onAdjustmentChange('saturate', e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdjustmentSliders;

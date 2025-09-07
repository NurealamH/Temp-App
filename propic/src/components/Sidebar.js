import React from 'react';
import AdjustmentSliders from './AdjustmentSliders';
import DownloadButton from './DownloadButton';
import './Sidebar.css';

const Sidebar = ({ image, adjustments, onAdjustmentChange }) => {
  return (
    <aside className="sidebar">
      <div>
        <h2>Editing Tools</h2>
        <AdjustmentSliders
          adjustments={adjustments}
          onAdjustmentChange={onAdjustmentChange}
        />
      </div>
      <DownloadButton image={image} adjustments={adjustments} />
    </aside>
  );
};

export default Sidebar;

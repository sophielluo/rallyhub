import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {children}
        <button className="popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
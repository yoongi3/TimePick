import React from 'react';
import './Popup.css';
type Props = {
    message: string;
    onClose: () => void;
}

const Popup = ({message, onClose}: Props ) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Popup;
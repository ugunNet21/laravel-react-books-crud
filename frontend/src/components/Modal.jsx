import "./Modal.css"; // Create a CSS file for styling the modal

// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, book }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{book.title}</h2>
                <h3>Author: {book.author}</h3>
                <p>{book.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

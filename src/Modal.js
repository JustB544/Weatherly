import React, { Children } from "react";
import './Modal.css';

function Modal({children, name, endModal}){
    return (
        <div className="ModalBackground">
            <div className="Modal">
                <div>
                    <span className="exit" onClick={endModal}>&times;</span>
                    <h2>{name}</h2>
                </div>
                {Children.toArray(children)}
            </div>
        </div>
    );
}

export default Modal;
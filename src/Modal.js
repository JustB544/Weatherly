import React, { Children } from "react";
import './Modal.css';
import 'font-awesome/css/font-awesome.min.css';

function Modal({children, name, endModal, height}){
    return (
        <div className="ModalBackground">
            <div className="Modal" style={{maxHeight: height}}>
                <div>
                    <span className="fa fa-close exit" onClick={endModal}></span>
                    <h2 style={{margin: "11px 0"}}>{name}</h2>
                </div>
                {Children.toArray(children)}
            </div>
        </div>
    );
}

export default Modal;
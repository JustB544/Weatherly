import React from "react";
import Modal from "./Modal";
import './SearchModal.css';
import SettingsForm from "./SettingsForm";


function SettingsModal({endModal}){

    return (
        <Modal name="Settings" endModal={endModal} height={471}>
            <SettingsForm />
        </Modal>
    );
}

export default SettingsModal;
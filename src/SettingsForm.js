import React, {useContext, useState} from "react";
import { useLocalStorage } from "./hooks";
import SettingsContext from "./SettingsContext";
import './SettingsForm.css';

function SettingsForm() {
    const {settings, setSettings} = useContext(SettingsContext);
    const [formData, setFormData] = useState(settings);

    const updatedSettings = JSON.stringify(settings) === JSON.stringify(formData);

    function handleSubmit(evt){
        evt.preventDefault();
        if (updatedSettings){
            return;
        }
        setSettings(formData);
    }

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(fData => ({...fData, [name]: value}));
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <form className="SettingsForm" onSubmit={handleSubmit}>
                <div className="SettingsFormOption">
                    <label htmlFor="speed" className="SettingsFormLabel">Speed</label>
                    <div className="SettingsFormSelect">
                        <select name="speed" onChange={handleChange} value={formData.speed}>
                            <option value="mph">mph</option>
                            <option value="kph">kph</option>
                        </select>
                    </div>
                </div>
                <div className="SettingsFormOption">
                    <label htmlFor="temperature" className="SettingsFormLabel">Temperature</label>
                    <div className="SettingsFormSelect">
                        <select name="temperature" onChange={handleChange} value={formData.temperature}>
                            <option value="f">Fahrenheit</option>
                            <option value="c">Celsius</option>
                        </select>
                    </div>
                </div>
                <div className="SettingsFormOption">
                    <label htmlFor="pressure" className="SettingsFormLabel">Pressure</label>
                    <div className="SettingsFormSelect">
                        <select name="pressure" onChange={handleChange} value={formData.pressure}>
                            <option value="in">inHg</option>
                            <option value="mb">mbar</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className={`SettingsFormSave ${(updatedSettings) ? "SettingsFormSaveGray": "SettingsFormSaveBlue"}`}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default SettingsForm;
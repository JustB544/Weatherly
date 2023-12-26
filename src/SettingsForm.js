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
        <form className="SettingsForm" onSubmit={handleSubmit}>
            <label htmlFor="speed">Speed: 
                <select name="speed" onChange={handleChange} value={formData.speed}>
                    <option value="mph">mph</option>
                    <option value="kph">kph</option>
                </select>
            </label>
            <label htmlFor="temperature">Temperature: 
                <select name="temperature" onChange={handleChange} value={formData.temperature}>
                    <option value="f">Fahrenheit</option>
                    <option value="c">Celsius</option>
                </select>
            </label>
            <label htmlFor="pressure">Pressure: 
                <select name="pressure" onChange={handleChange} value={formData.pressure}>
                    <option value="in">inHg</option>
                    <option value="mb">mbar</option>
                </select>
            </label>
            <div>
                <button className={`SettingsFormSave ${(updatedSettings) ? "SettingsFormSaveGray": "SettingsFormSaveBlue"}`}>Save</button>
            </div>
        </form>
    )
}

export default SettingsForm;
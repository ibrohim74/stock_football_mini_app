import React, { useState, useEffect } from 'react';
import "./settings.css";

const Settings = () => {
    // Load settings from localStorage with default values
    const [vibrationEnabled, setVibrationEnabled] = useState(() => {
        const storedVibration = localStorage.getItem('settings_vibr');
        return storedVibration !== null ? storedVibration === 'true' : true; // Default to true
    });

    const [soundEnabled, setSoundEnabled] = useState(() => {
        const storedSound = localStorage.getItem('settings_mute');
        return storedSound !== null ? storedSound === 'true' : true; // Default to true
    });

    // Save settings to localStorage when they are updated
    useEffect(() => {
        localStorage.setItem('settings_vibr', vibrationEnabled);
    }, [vibrationEnabled]);

    useEffect(() => {
        localStorage.setItem('settings_mute', soundEnabled);
    }, [soundEnabled]);

    const toggleVibration = () => setVibrationEnabled(prev => !prev);
    const toggleSound = () => setSoundEnabled(prev => !prev);

    return (
        <div className="settings">
            <div className="settings_box">
                <div className="settings_vibr settings_item" onClick={toggleVibration}>
                    Vibration: {vibrationEnabled ? "On" : "Off"}
                </div>
                <div className="settings_mute settings_item" onClick={toggleSound}>
                    Sound: {soundEnabled ? "On" : "Off"}
                </div>
            </div>
        </div>
    );
};

export default Settings;

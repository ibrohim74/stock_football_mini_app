import React, { useState, useEffect } from 'react';
import "./settings.css";

const Settings = () => {
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Save settings to localStorage when they are updated
    useEffect(() => {
        localStorage.setItem('settings_vibr', vibrationEnabled);
        localStorage.setItem('settings_mute', soundEnabled);
    }, [vibrationEnabled, soundEnabled]);

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

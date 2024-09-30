import React, {useState, useEffect} from 'react';
import "./settings.css";
import phone from "../../assets/imgs/perspective_matte-51-128x128.png"
import sound from "../../assets/imgs/perspective_matte-109-128x128.png"
import {Dropdown, Space} from "antd";
import {languages} from "../../utils/lang/langs.jsx";
import {DownOutlined} from "@ant-design/icons";
import {useLanguage} from "../../utils/lang/LangContext.jsx";

import {useNavigate, useParams} from "react-router-dom";


const Settings = () => {
    const {handleLanguageChange, selectedLanguage} = useLanguage();
    const [vibrationEnabled, setVibrationEnabled] = useState(() => {
        const storedVibration = localStorage.getItem('settings_vibr');
        return storedVibration !== null ? storedVibration === 'true' : true;
    });

    const [soundEnabled, setSoundEnabled] = useState(() => {
        const storedSound = localStorage.getItem('settings_mute');
        return storedSound !== null ? storedSound === 'true' : true;
    });
    const {user_id} = useParams()


    useEffect(() => {
        localStorage.setItem('settings_vibr', vibrationEnabled);
    }, [vibrationEnabled]);

    useEffect(() => {
        localStorage.setItem('settings_mute', soundEnabled);
    }, [soundEnabled]);

    const toggleVibration = () => setVibrationEnabled(prev => !prev);

    const navigate = useNavigate();
    useEffect(() => {
        window.Telegram.WebApp.onEvent("backButtonClicked" , ()=>{
            navigate(`/${user_id}`)
        })
    }, [user_id]);

    return (
        <div className={'sett'}>

            <div className="settings">

                <div className="settings_box">
                    <div className="settings_vibr settings_item" onClick={toggleVibration}>
                        <img loading={"lazy"} src={phone} alt=""/>
                        {vibrationEnabled ? "On" : "Off"}
                    </div>
                </div>
                <div className="settings_lang">
                    <Dropdown
                        menu={{
                            items: languages,
                            onClick: handleLanguageChange,
                        }}
                        trigger={["click"]}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {selectedLanguage.icon} {selectedLanguage.label} <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>

    );
};

export default Settings;

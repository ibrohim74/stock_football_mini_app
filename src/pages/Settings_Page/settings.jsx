import React, { useState, useEffect } from 'react';
import "./settings.css";
import phone from "../../assets/imgs/perspective_matte-51-128x128.png";
import { Dropdown, Space } from "antd";
import { languages } from "../../utils/lang/langs.jsx";
import { DownOutlined } from "@ant-design/icons";
import { useLanguage } from "../../utils/lang/LangContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import UZ from "../../assets/icons/uz.svg"
import RU from "../../assets/icons/ru.svg"
import instagram from "../../assets/instagram.png"
import telegram from "../../assets/telegram.png"


import BackTab from "../../component/backTab/BackTab.jsx";
const Settings = () => {
    const { handleLanguageChange, selectedLanguage } = useLanguage();
    const { user_id ,language} = useParams();
    const navigate = useNavigate();

    const [vibrationEnabled, setVibrationEnabled] = useState(() => {
        const storedVibration = localStorage.getItem('settings_vibr');
        return storedVibration === 'true'; // No need for null check as it defaults to false
    });

    const [soundEnabled, setSoundEnabled] = useState(() => {
        const storedSound = localStorage.getItem('settings_mute');
        return storedSound === 'true'; // Same here
    });

    useEffect(() => {
        localStorage.setItem('settings_vibr', vibrationEnabled);
    }, [vibrationEnabled]);

    useEffect(() => {
        localStorage.setItem('settings_mute', soundEnabled);
    }, [soundEnabled]);

    const toggleVibration = () => setVibrationEnabled(prev => !prev);


    return (
        <div className='sett'>
            <BackTab back_url={`/${user_id}/${language}`}/>
            <div className="settings">

                <div className="settings_box">
                    <div
                        className="settings_vibr settings_item"
                        onClick={toggleVibration}
                        role="button"
                        aria-label={`Vibration is ${vibrationEnabled ? "on" : "off"}`}
                    >
                        <img loading="lazy" src={phone} alt="Vibration setting icon"/>
                        {vibrationEnabled ? "On" : "Off"}
                    </div>

                </div>
                <button onClick={() => window.localStorage.clear()}>Clear</button>
                <div className="settings_lang">
                    <Dropdown
                        menu={{
                            items: languages.map(lang => ({
                                key: lang.code,
                                label: lang.label,
                                icon: lang.icon,
                                onClick: () => handleLanguageChange(lang.code), // Pass the language code directly
                            })),
                        }}
                        trigger={["click"]}
                    >
                        <a onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                            <Space>
                                {selectedLanguage === "uz" && <><img src={UZ} alt=""/> O'zbekcha </>}
                                {selectedLanguage === "rus" && <><img src={RU} alt=""/> Русский </>}
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>

                </div>
                <div className="settings_footer">
                    <a href={"https://www.instagram.com/stockfootball_uz/"} className="settings_footer_item"><img src={instagram} alt=""/>Instagram</a>
                    <a href={"https://t.me/+dU0VUUqbfWI0ZWIy "} className="settings_footer_item"><img src={telegram} alt=""/>Telegram</a>
                </div>
            </div>


        </div>
    );
};

export default Settings;

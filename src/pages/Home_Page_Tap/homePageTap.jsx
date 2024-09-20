import React, { useState, useEffect } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { INDEX, SETTINGS, TAP } from "../../utils/const.jsx";
import BackTab from "../../component/backTab/BackTab.jsx";
import volteg from "../../assets/icons/high-voltage.png"
const MAX_ENERGY = 200; // Energiyaning maksimum qiymati

const HomePageTap = () => {
    const [score, setScore] = useState(665);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [energy, setEnergy] = useState(MAX_ENERGY);
    const [ballPressed, setBallPressed] = useState(false); // Animatsiya uchun state
    const { user_id } = useParams();

    const handleStart = (event) => {
        const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
        const touchLength = touches.length;

        // Agar energiya tugagan bo'lsa, bosishni to'xtatish
        if (energy <= 0) return;

        // Qolgan energiya asosida nechta barmoq ruxsat etilishini hisoblang
        const allowedTouches = Math.min(touchLength, energy);
        setTouchCount(allowedTouches);

        const rect = event.currentTarget.getBoundingClientRect();

        // Animatsiyalar uchun yangi joylar
        const newAnimations = Array.from({ length: allowedTouches }).map((_, index) => {
            const touch = touches[index];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            return {
                id: Date.now() + index,
                x: x,
                y: y,
            };
        });

        setAnimations(prev => [...prev, ...newAnimations]);
        setBallPressed(true); // Ball bosilganda animatsiya boshlansin

        // Animatsiyalarni 0.5 sekunddan so'ng olib tashlang
        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
            setBallPressed(false); // Animatsiya tugadi
        }, 500);
    };

    const handleEnd = async () => {
        try {
            await setScore(prevScore => prevScore + touchCount);
            await setEnergy(prevEnergy => Math.max(0, prevEnergy - touchCount)); // Energiyani kamaytirish
            await setTouchCount(0);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // Har 3 soniyada energiya regeneratsiyasi
        const intervalId = setInterval(() => {
            setEnergy(prevEnergy => Math.min(MAX_ENERGY, prevEnergy + 1)); // Har 3 soniyada 1 energiya qo'shiladi
        }, 800);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-page">
            <div className="home-page_user_settings">
                <div className="home-page_user">
                    <BackTab back_url={`${INDEX}${user_id}`} />
                    <span className={"home-page_user_icon"}><UserOutlined /></span>
                    Xasanov Ibroxim
                </div>
                <Link to={`${TAP}${user_id}/${SETTINGS}`} className="home-page_settings"><SettingOutlined /></Link>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>Ballaringiz</p>
                        <h1>{score}</h1>
                    </div>
                    <div className="ball-score">
                        <p>Bugungi sovolar</p>
                        <h1>{dailyBonus}/20</h1>
                    </div>
                </div>
                <div className="tap_ball"
                     onTouchStart={handleStart}
                     onTouchEnd={handleEnd}
                     // onMouseDown={handleStart}    // Sichqoncha bosilganda
                     // onMouseUp={handleEnd}        // Sichqoncha qo'yilganda
                     onContextMenu={(e) => e.preventDefault()} // O'ng bosishni bloklash
                     style={{ position: "relative", overflow: "hidden" }} // Koptokdan tashqariga chiqmaslik uchun
                >
                    <img src={ball}
                         alt="ball"
                         className={`ball-image ${ballPressed ? 'pressed' : ''}`} // Animatsiya qo'shildi
                         draggable="false"
                         onContextMenu={(e) => e.preventDefault()} // O'ng bosishni bloklash
                    />
                    {animations.map(animation => (
                        <div
                            key={animation.id}
                            className="ball-animation"
                            style={{ left: `${animation.x}px`, top: `${animation.y}px` }} // Animatsiya barmoq bosilgan joyda boshlansin
                        >
                            <div className="small-ball"></div> {/* Kichik koptok */}
                        </div>
                    ))}
                </div>
                <div className="tap_ball_energy">
                    <div className="energy_info">
                        <img src={volteg} alt="volteg"  />
                        <p>{energy}/{MAX_ENERGY}</p>
                    </div>

                    <div className="energy_line">
                        <span style={{
                            width: `${(energy / MAX_ENERGY) * 100}%`
                        } // Energiyani to'g'ri hisoblash
                        }></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageTap;

import React, { useState, useEffect, useRef } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { Link, useParams } from "react-router-dom";
import $API from "../../utils/https.jsx";
import user_img from "../../assets/icon/xsxxa.webp";
import AppBar from "../../component/App_bar/app_bar.jsx";
import clickSound from "../../assets/ui-click-43196.mp3";
import volteg from "../../assets/icon/spark.webp";
import { useTranslation } from "react-i18next";
import { Tour } from "antd";

const HomePageTap = () => {
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [ballPressed, setBallPressed] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { user_id } = useParams();
    const timerRef = useRef(null);
    const { t } = useTranslation();
    const [openTour, setOpenTour] = useState(false);
    const [userData, setUserData] = useState({
        score: 0,
        tapBonus: 1,
        energy: 0,
        maxEnergy: 200,
        username: '',
        status: '',
        limitCoin: 30,
    });

    const getCoinData = async () => {
        try {
            const res = await $API.get(`/users/${user_id}`);
            const user = res.data.user_data;
            const status = res.data.status;
            setUserData({
                score: user.coins,
                tapBonus: user.bonus,
                energy: user.energy,
                maxEnergy: user.max_energy,
                username: user.username,
                status: status.name,
                limitCoin: status.limit_coin,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCoinData();
        updateServer();
    }, [user_id]);

    useEffect(() => {
        const savedVibration = localStorage.getItem('settings_vibr');
        const savedSound = localStorage.getItem('settings_mute');

        setVibrationEnabled(savedVibration === 'true' || savedVibration === null);
        setSoundEnabled(savedSound === 'true' || savedSound === null);

        if (savedVibration === null) {
            localStorage.setItem('settings_vibr', 'true');
        }
        if (savedSound === null) {
            localStorage.setItem('settings_mute', 'true');
        }
    }, []);

    const updateServer = async (newScore, newEnergy) => {
        try {
            await $API.patch(`/users/${user_id}`, {
                coins: newScore,
                energy: newEnergy
            });
            getCoinData();
        } catch (e) {
            console.log(e);
        }
    };

    const debounceUpdate = (newScore, newEnergy) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            updateServer(newScore, newEnergy);
        }, 1000);
    };

    const handleStart = (event) => {
        if (userData.energy <= 0) return;

        const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
        const allowedTouches = Math.min(touches.length, userData.energy);
        setTouchCount(allowedTouches);

        if (vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(10);
        }

        if (soundEnabled) {
            const newClickAudio = new Audio(clickSound);
            newClickAudio.play();
        }

        // Create new animations for each touch
        const newAnimations = touches.slice(0, allowedTouches).map((touch, index) => {
            const x = touch.clientX - 28;
            const y = touch.clientY - 42;
            return { id: Date.now() + index, x, y };
        });

        // Update animations state to include the new animations
        setAnimations((prev) => [...prev, ...newAnimations]);

        // Set the ball pressed state
        setBallPressed(true);

        // Set a timeout to remove the animations after a duration
        newAnimations.forEach(({ id }) => {
            setTimeout(() => {
                setAnimations((prev) => prev.filter((a) => a.id !== id));
            }, 500); // Match this duration with your animation duration
        });

        // Set the ball pressed state back to false after a timeout
        setTimeout(() => {
            setBallPressed(false);
        }, 500);
    };


    const handleEnd = () => {
        const newScore = userData.score + touchCount;
        const newEnergy = Math.max(0, userData.energy - touchCount);
        setUserData((prevData) => ({ ...prevData, score: newScore, energy: newEnergy }));
        setTouchCount(0);
        debounceUpdate(newScore, newEnergy);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setUserData(prevData => ({
                ...prevData,
                energy: Math.min(prevData.maxEnergy, prevData.energy + 1)
            }));
        }, 300);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const isTourShown = localStorage.getItem('tourShown');

        if (!isTourShown) {
            setOpenTour(true);
            localStorage.setItem('tourShown', 'true');
        }
    }, []);

    const profileRef = useRef(null);
    const ballRef = useRef(null);
    const boshSahifaRef = useRef(null);
    const friendsRef = useRef(null);
    const peredachaRef = useRef(null);
    const eventsRef = useRef(null);
    const ratingRef = useRef(null);

    const stepsTour = [
        {
            title: 'Profile',
            description: 'Bu yerda sizning sozlamalaringiz saqlanadi',
            target: () => profileRef.current,
        },
        {
            title: 'Koptok',
            description: 'Koptokni bosib ballar ishlang! ' +
                'Darajangizga qarab energiya beriladi va shu energiya tugamaguncham ballar ishlasangiz boladi',
            target: () => ballRef.current,
        },
        {
            title: 'Bosh sahifa',
            description: 'Bu yerda asosiy sahifani ochasiz',
            target: () => boshSahifaRef.current,
        },
        {
            title: 'Do\'stlar',
            description: 'Bu yerda do\'stlaringizni taklif qilishingiz mumkin',
            target: () => friendsRef.current,
        },
        {
            title: 'Live',
            description: 'Bu yerda futbol o\'yinlarini kuzatishingiz mumkin',
            target: () => peredachaRef.current,
        },
        {
            title: 'Vazifalar',
            description: 'Bu yerda vazifalar ro\'yxatini ko\'rishingiz mumkin',
            target: () => eventsRef.current,
        },
        {
            title: 'Reyting',
            description: 'Bu yerda reyting sahifasini ochasiz',
            target: () => ratingRef.current,
        }
    ];

    const formatNumber = (num) => {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B'; // Billion
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M'; // Million
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'k'; // Thousand
        }
        return num.toString(); // Less than 1000
    };

    return (
        <div className="home-page">
            <AppBar
                boshSahifaRef={boshSahifaRef}
                friendsRef={friendsRef}
                peredachaRef={peredachaRef}
                eventsRef={eventsRef}
                ratingRef={ratingRef}
            />
            <div className="home-page_user_settings">
                <Link to={`/${user_id}/settings`} className="home-page_user" ref={profileRef}>
                    <h1>{userData.username}Khasanov_ibroxim</h1>
                    <span  loading={"lazy"} className="home-page_user_icon"><img src={user_img} alt=""/></span>
                </Link>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>Tap Bonus</p>
                        <h1>+{userData.tapBonus}</h1>
                    </div>
                    <span className={"ball-score-line"}></span>
                    <span className={"ball-score-line2"}></span>
                    <div className="ball-score ball-score-status">
                        <p>Darajangiz</p>
                        <h1>Akademiya Futbolchisi</h1>
                    </div>

                    <Link className="ball-score" to={`/${user_id}/exp_shop`}>
                        <p>Tajriba</p>
                        <h1>400k</h1>
                    </Link>
                </div>
                <div className="tap_coin">
                    <img loading={"lazy"} src={ball} alt=""/>
                    <h1>{userData.score}</h1>
                </div>
                {/*<div className="tap_ball_energy">*/}
                {/*    <div className="energy_line">*/}
                {/*        <p>{formatNumber(userData.limitCoin)}</p>*/}
                {/*        <p>{userData.status}fdsf</p>*/}
                {/*        <span style={{ width: `${(userData.score / userData.limitCoin) * 100}%` }}></span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="tap_ball"
                     onContextMenu={(e) => e.preventDefault()}
                >
                    <img
                        loading={"lazy"}
                        onTouchStart={handleStart}
                        onTouchEnd={handleEnd}
                        onMouseDown={handleStart}
                        onMouseUp={handleEnd}
                        ref={ballRef}
                        src={ball} alt="ball" className={`ball-image ${ballPressed ? 'pressed' : ''}`}
                        />

                    {animations.map(({id, x, y}) => (
                        <div key={id} className="ball-animation" style={{left: x, top: y}}>+1</div>
                    ))}
                </div>
                <div className="energy_info">
                    <img src={volteg} alt="volteg" loading={"lazy"}/>
                    <p>{userData.energy}/{userData.maxEnergy}</p>
                </div>
            </div>
            <Tour
                open={openTour}
                steps={stepsTour}
                onClose={() => setOpenTour(false)}
            />
        </div>
    );
};

export default HomePageTap;

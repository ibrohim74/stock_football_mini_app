import React, {useState, useEffect, useRef} from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import {Link, useParams} from "react-router-dom";
import $API from "../../utils/https.jsx";
import user_img from "../../assets/imgs/perspective_matte-59-128x128.png";
import AppBar from "../../component/App_bar/app_bar.jsx";
import clickSound from "../../assets/ui-click-43196.mp3";
import volteg from "../../assets/icons/high-voltage.png";
import {useTranslation} from "react-i18next";
import {Tour} from "antd";

const HomePageTap = () => {
    const [score, setScore] = useState(0);
    const [tapBonus, setTapBonus] = useState(1);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [maxEnergy, setMaxEnergy] = useState(200);
    const [ballPressed, setBallPressed] = useState(false);
    const [username, setUsername] = useState('');
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [dayState, nightState] = useState(false);
    const {user_id} = useParams();
    const timerRef = useRef(null);
    const {t} = useTranslation();
    const [openTour, setOpenTour] = useState(false);
    const [statusUser, setStatusUser] = useState("");
    const [limitCoin, setLimitCoin] = useState("");
    const [expUser, setExpUser] = useState("");


    const getCoinData = async () => {
        try {
            console.log("kirdi")
            const res = await $API.get(`/users/${user_id}`);
            console.log(res)
            setScore(res.data.user_data.coins);
            setTapBonus(res.data.user_data.bonus);
            setEnergy(res.data.user_data.energy);
            setMaxEnergy(res.data.user_data.max_energy);
            setUsername(res.data.user_data.username);
            setStatusUser(res.data.status.name);
            setLimitCoin(res.data.status.limit_coin)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCoinData();
        updateServer()
    }, [user_id]);

    useEffect(() => {

        const savedVibration = localStorage.getItem('settings_vibr');
        const savedSound = localStorage.getItem('settings_mute');

        if (savedVibration === null) {

            setVibrationEnabled(true);
            localStorage.setItem('settings_vibr', 'true');
        } else {
            setVibrationEnabled(savedVibration === 'true');
        }

        if (savedSound === null) {
            setSoundEnabled(true);
            localStorage.setItem('settings_mute', 'true');
        } else {
            setSoundEnabled(savedSound === 'true');
        }

    }, []);


    useEffect(() => {
        const savedVibration = localStorage.getItem('settings_vibr') === 'true';
        const savedSound = localStorage.getItem('settings_mute') === 'true';
        setVibrationEnabled(savedVibration);
        setSoundEnabled(savedSound);
    }, []);


    const updateServer = async (newScore, newEnergy) => {
        console.log(newEnergy , newScore)
        try {
            const res = await $API.patch(`/users/${user_id}`, {
                coins: newScore,
                energy: newEnergy
            });
            console.log(res)
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
        if (energy <= 0) return;

        const touches = event.touches || [{clientX: event.clientX, clientY: event.clientY}];
        const touchLength = touches.length;
        const allowedTouches = Math.min(touchLength, energy);
        setTouchCount(allowedTouches);


        if (vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(10);
        }


        if (soundEnabled) {
            const newClickAudio = new Audio(clickSound);
            newClickAudio.play();
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const newAnimations = Array.from({length: allowedTouches}).map((_, index) => {
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
        setBallPressed(true);

        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
            setBallPressed(false);
        }, 500);
    };


    const handleEnd = () => {
        const newScore = score + touchCount;
        const newEnergy = Math.max(0, energy - touchCount);
        setScore(newScore);
        setEnergy(newEnergy);
        setTouchCount(0);
        debounceUpdate(newScore, newEnergy);
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            setEnergy(prevEnergy => Math.min(maxEnergy, prevEnergy + 1));
        }, 300);

        return () => clearInterval(intervalId);
    }, [maxEnergy]);

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
                    <h1>{username}</h1>
                    <span className="home-page_user_icon"><img src={user_img} alt=""/></span>
                </Link>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>Tap Bonus</p>
                        <h1>+{tapBonus}</h1>
                    </div>
                    <Link className="ball-score" to={`/${user_id}/exp_shop`}>
                        <p>Tajriba</p>
                        <h1>400k</h1>
                    </Link>
                </div>
                <div className="tap_coin">
                    <img src={ball} alt=""/>
                    <h1>{score}</h1>
                </div>
                <div className="tap_ball_energy">

                    <div className="energy_line">
                        <p>{formatNumber(limitCoin)}</p>
                        <p>{statusUser}</p>
                        <span style={{width: `${(score / limitCoin) * 100}%`}}></span>
                    </div>

                </div>
                <div className="tap_ball"
                     onContextMenu={(e) => e.preventDefault()}
                     style={{position: "relative", overflow: "hidden"}}
                     ref={ballRef}
                >
                    <img src={ball}
                         onTouchStart={handleStart}
                         onTouchEnd={handleEnd}
                         onMouseDown={handleStart}
                         onMouseUp={handleEnd}
                         alt="ball"
                         className={`ball-image ${ballPressed ? 'pressed' : ''}`}
                         draggable="false"
                         onContextMenu={(e) => e.preventDefault()}
                    />
                    {/*{animations.map(animation => (*/}
                    {/*    <div*/}
                    {/*        key={animation.id}*/}
                    {/*        className="ball-animation"*/}
                    {/*        style={{left: `${animation.x}px`, top: `${animation.y}px`}}*/}
                    {/*    >*/}
                    {/*        <div className="small-ball"></div>*/}
                    {/*    </div>*/}
                    {/*))}*/}

                </div>
                <div className="energy_info">
                    <img src={volteg} alt="volteg"/>
                    <p>{energy}/{maxEnergy}</p>
                </div>
            </div>
            <Tour open={openTour} onClose={() => setOpenTour(false)} steps={stepsTour}/>
        </div>
    );
};

export default HomePageTap;

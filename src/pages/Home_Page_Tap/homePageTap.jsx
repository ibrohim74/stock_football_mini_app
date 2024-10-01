import React, {useState, useEffect, useRef} from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import {Link, useParams} from "react-router-dom";
import $API from "../../utils/https.jsx";
import user_img from "../../assets/icon/xsxxa.webp";
import AppBar from "../../component/App_bar/app_bar.jsx";
// import clickSound from "../../assets/mixkit-soccer-ball-quick-kick-2108.wav";
import volteg from "../../assets/icon/spark.webp";
import {useTranslation} from "react-i18next";
import {Tour} from "antd";
import Odometer from "react-odometerjs";
import LoaderFootball from "../../component/loader/loader_football.jsx";


const HomePageTap = () => {
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [ballPressed, setBallPressed] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    // const [soundEnabled, setSoundEnabled] = useState(true);
    const {user_id} = useParams();
    const timerRef = useRef(null);
    const {t} = useTranslation();
    const [openTour, setOpenTour] = useState(false);
    const [userData, setUserData] = useState({
        tapBonus: 1,
        maxEnergy: 200,
        username: '',
        status: '',
        limitCoin: 30,
        hour_coin: 0,
    });
    const [loader, setLoader] = useState(false);
    const getCoinData = async () => {
        setLoader(true);  // loaderni ko'rsatish
        try {
            const res = await $API.get(`/users/${user_id}`);
            console.log(res)
            const user = res.data.user_data;
            const status = res.data.status;
            setUserData({
                score: user.coins,
                tapBonus: user.bonus,
                energy: user.energy,
                maxEnergy: user.max_energy,
                username: user.username,
                first_name: user.first_name,
                status: status.name,
                limitCoin: status.limit_coin,
                hour_coin: res.data.hour_coin,
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoader(false);  // loaderni yashirish
        }
    };


    useEffect(() => {
        getCoinData();
    }, [user_id]);

    useEffect(() => {
        const savedVibration = localStorage.getItem('settings_vibr');
        // const savedSound = localStorage.getItem('settings_mute');

        setVibrationEnabled(savedVibration === 'true' || savedVibration === null);
        // setSoundEnabled(savedSound === 'true' || savedSound === null);

        if (savedVibration === null) {
            localStorage.setItem('settings_vibr', 'true');
        }
        // if (savedSound === null) {
        //     localStorage.setItem('settings_mute', 'true');
        // }
    }, []);

    const updateServer = async (newScore, newEnergy) => {
        try {
            console.log(parseInt(newScore), parseInt(newEnergy))
            await $API.patch(`/users/${user_id}`, null, {
                params:
                    {
                        coins: newScore,
                        energy: newEnergy
                    }
            });
            const res = await $API.get(`/users/${user_id}`);
            console.log(res)
            const user = res.data.user_data;
            const status = res.data.status;
            setUserData({
                score: user.coins,
                tapBonus: user.bonus,
                energy: user.energy,
                maxEnergy: user.max_energy,
                username: user.username,
                first_name: user.first_name,
                status: status.name,
                limitCoin: status.limit_coin,
                hour_coin: res.data.hour_coin,
            });
        } catch (e) {
            if (e.status === 422) {
                const res = await $API.get(`/users/${user_id}`);
                console.log(res)
                const user = res.data.user_data;
                const status = res.data.status;
                setUserData({
                    score: user.coins,
                    tapBonus: user.bonus,
                    energy: user.energy,
                    maxEnergy: user.max_energy,
                    username: user.username,
                    first_name: user.first_name,
                    status: status.name,
                    limitCoin: status.limit_coin,
                    hour_coin: res.data.hour_coin,
                });
            }
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
        // Energiyani tekshirish
        if (userData.energy <= 0) return;

        // Barmoq yoki sichqoncha bosilishini aniqlash
        const touches = event.touches || [{clientX: event.clientX, clientY: event.clientY}];
        console.log("start: ", touches)
        // console.log("start2: ", [{ clientX: event.clientX, clientY: event.clientY }])
        const allowedTouches = Math.floor(touches.length, userData.energy);
        setTouchCount(allowedTouches)
        for (let i = 0; i < allowedTouches; i++) {
            const touch = touches[i];
            const x = touch.clientX - 28; // X koordinati
            const y = touch.clientY - 42; // Y koordinati
            const tapBonusValue = userData.tapBonus;

            // Animatsiyani qo'shish
            const newAnimation = {id: Date.now() + i, x, y, tapBonus: tapBonusValue};
            setAnimations((prev) => [...prev, newAnimation]);

            // Animatsiyani 500ms dan keyin olib tashlash
            setTimeout(() => {
                setAnimations((prev) => prev.filter((a) => a.id !== newAnimation.id));
            }, 500);

            // Ovoz ijro etish
            // if (soundEnabled) {
            //     const newClickAudio = new Audio(clickSound);
            //     newClickAudio.play();
            // }

            // Vibratsiya
            if (vibrationEnabled && navigator.vibrate) {
                navigator.vibrate(100);
            }
            setBallPressed(true);

            // Ball pressed holatini qayta false holatiga o'zgartirish
            setTimeout(() => {
                setBallPressed(false);
            }, 100);
            // Energiyani kamaytirish
            setUserData((prev) => ({...prev, energy: prev.energy - 1}));
        }
    };

    const handleEnd = () => {
        console.log(touchCount)
        const newScore = userData.score + touchCount * userData.tapBonus;
        const newEnergy = Math.max(0, userData.energy - touchCount);
        setUserData((prevData) => ({...prevData, score: newScore, energy: newEnergy}));
        setTouchCount(0);
        debounceUpdate(newScore, newEnergy);
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            setUserData(prevData => ({
                ...prevData,
                energy: Math.min(prevData.maxEnergy, prevData.energy + 1)
            }));
        }, 750);

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
    const tajribaRef = useRef(null);

    const stepsTour = [
        {
            title: t("tour.profile.title"),
            description: t("tour.profile.description"),
            target: () => profileRef.current,
        },
        {
            title: t("tour.tajriba.title"),
            description: t("tour.tajriba.description"),
            target: () => tajribaRef.current,
        },
        {
            title: t("tour.Koptok.title"),
            description: t("tour.Koptok.description"),
            target: () => ballRef.current,
        },
        {
            title: t("tour.bosh_sahifa.title"),
            description: t("tour.bosh_sahifa.description"),
            target: () => boshSahifaRef.current,
        },
        {
            title: t("tour.dostlar.title"),
            description: t("tour.dostlar.description"),
            target: () => friendsRef.current,
        },
        {
            title: t("tour.live.title"),
            description: t("tour.live.description"),
            target: () => peredachaRef.current,
        },
        {
            title: t("tour.events.title"),
            description: t("tour.events.description"),
            target: () => eventsRef.current,
        },
        {
            title: t("tour.Reyting.title"),
            description: t("tour.Reyting.description"),
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

    if (loader){
        return <LoaderFootball/>
    }else {
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
                    <h1>{userData.username ? userData.username : userData.first_name}</h1>
                    <span loading={"lazy"} className="home-page_user_icon"><img src={user_img} alt=""/></span>
                </Link>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>{t("homePageTap.tap_bonus")}</p>
                        <h1>+{userData.tapBonus}</h1>
                    </div>
                    <span className={"ball-score-line"}></span>
                    <span className={"ball-score-line2"}></span>
                    <div className="ball-score ball-score-status">
                        <p>{t("homePageTap.darajangiz")}</p>
                        <h1>{userData.status}</h1>
                    </div>

                    <Link className="ball-score" to={`/${user_id}/exp_shop`} ref={tajribaRef}>
                        <p>{t("homePageTap.tajriba")}</p>
                        <h1>{userData.hour_coin ? formatNumber(userData.hour_coin) : 0}</h1>
                    </Link>
                </div>
                <div className="tap_coin">
                    <img loading={"lazy"} src={ball} alt=""/>
                    <h1><Odometer value={userData.score} format="(.ddd),dd"/></h1>
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
                     ref={ballRef}
                     onTouchStart={handleStart}
                     onTouchEnd={handleEnd}
                     onMouseDown={handleStart}
                     onMouseUp={handleEnd}
                >
                    <img


                        draggable={false}
                        src={ball} alt="ball" className={`ball-image ${ballPressed ? 'pressed' : ''}`}
                    />

                    {animations.map(({id, x, y, tapBonus}) => (
                        <div key={id} className="ball-animation" style={{left: x, top: y}}>
                            {tapBonus}
                        </div>
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
    ); }


};

export default HomePageTap;

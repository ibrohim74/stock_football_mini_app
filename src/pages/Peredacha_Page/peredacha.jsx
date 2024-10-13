import React, { useState, useEffect } from 'react';
import './peredacha.css';
import PeredachaToday from "./peredacha_sub_page/peredacha_today.jsx";

import {
    england_league, france_league, germany_league, italy_league,
    portugal_league, spain_league, uzbekistan_league
} from "../League_Page/component/leagueList.jsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BackTab from "../../component/backTab/BackTab.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import ball from "../../assets/icons/icons8-football-50.svg";

const Peredacha = () => {
    const [time, setTime] = useState(new Date());
    const [leagues, setLeagues] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date()); // Tanlangan sana
    const {user_id, language} = useParams();
    const {t, i18n} = useTranslation();

    useEffect(() => {
        setLeagues([
            ...uzbekistan_league,
            ...england_league,
            ...spain_league,
            ...portugal_league,
            ...france_league,
            ...germany_league,
            ...italy_league,
        ]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Tashkent'
    }).format(time);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'Asia/Tashkent'
    }).format(time);

    // 3 kun oldin va 3 kun keyin sanalarni olish va hafta kunini tilga qarab olish
    const getSurroundingDays = () => {
        const days = [];
        const weekdayNamesUz = ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'];  // O'zbekcha qisqa hafta kunlari
        const weekdayNamesRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];    // Ruscha qisqa hafta kunlari
        const weekdayNames = i18n.language === 'uz' ? weekdayNamesUz : weekdayNamesRu;  // Tilga qarab hafta kunlari

        for (let i = -4; i <= 4; i++) {  // 3 kun oldin va 3 kun keyin
            const date = new Date();
            date.setDate(time.getDate() + i);

            // To'g'ri hafta kunini olish
            const weekday = weekdayNames[(date.getDay() + 6) % 7];  // Yakshanbani oxirgi qilib olish uchun `+ 6 % 7`

            days.push({
                label: new Intl.DateTimeFormat(i18n.language, {
                    day: '2-digit',
                    month: '2-digit'
                }).format(date).replace('/', '.'),
                weekday: weekday,  // Hafta kuni nomi
                value: date
            });
        }
        return days;
    };

    const handleDateChange = (date) => {
        // Vaqtni 00:00 ga o'rnating
        const newDate = new Date(date);
        // newDate.setHours(0, 0, 0, 0);
        setActiveDate(newDate);
    };


    // Hozirgi sana uchun indeksni aniqlash
    const surroundingDays = getSurroundingDays();
    const todayIndex = surroundingDays.findIndex(day => day.value.toDateString() === new Date().toDateString());

    // Endi leagueIds string emas, array holatida
    const leagueIds = leagues.map(league => league.id);


    return (
        <div className="peredacha">
            <div className="peredacha_time">
                <BackTab back_url={`/${user_id}/${language}`}/>
                <div className="peredacha_time_box">
                    <h1>{formattedTime}</h1>
                    <p>{formattedDate}</p>
                </div>
            </div>
            <div className="peredacha_tabs">

                <Swiper
                    slidesPerView={5}      // 5 ta slaydni ko'rsatish
                    spaceBetween={10}      // Slaydlar orasidagi masofa
                    loop={false}           // Slaydlarni qaytadan takrorlamaslik
                    pagination={{ clickable: true }}
                    navigation
                    centeredSlides={true}  // O‘rtaga joylashtirish
                    className="mySwiperPeredacha"
                    initialSlide={todayIndex}   // Hozirgi sanani markazga qo'yamiz
                >
                    {surroundingDays.map((day, index) => (
                        <SwiperSlide
                            key={index}
                            className={`peredacha__tab_item ${activeDate.toDateString() === day.value.toDateString() ? 'active' : ''}`}
                            onClick={() => handleDateChange(day.value)}
                        >
                            {day.weekday}  {/* Hafta kunining qisqa nomi */}
                            <br/>
                            {day.label}  {/* Sana formati: Kun/Oy */}
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            <div className="peredacha_list">
                {activeDate && <PeredachaToday activeDate={activeDate} leagueList={leagueIds} />}
                {/* Shu yerda boshqa sanalar uchun boshqa komponentlarni ko'rsatish */}
            </div>
        </div>
    );
};

export default Peredacha;

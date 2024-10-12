import React, {useEffect, useState} from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import {Link, useNavigate, useParams} from 'react-router-dom';
import BackTab from "../../component/backTab/BackTab.jsx";
import arrowRight from "../../assets/icon/arrowRight.png"
import "./component/league_component.css"
import {
    uzbekistan_league,
    england_league,
    spain_league,
    portugal_league,
    france_league,
    germany_league,
    italy_league
} from "./component/leagueList.jsx";
import {useTranslation} from "react-i18next";

const League = () => {
    const {token, language} = useParams();
    const [leagues, setLeagues] = useState([]);
    const {t} = useTranslation();


    useEffect(() => {
        const allLeagues = [
            ...uzbekistan_league,
            ...england_league,
            ...spain_league,
            ...portugal_league,
            ...france_league,
            ...germany_league,
            ...italy_league,

        ];
        setLeagues(allLeagues);
    }, []);
    return (
        <div className={"league-container"}>
            <div className="back_liga">
                <BackTab back_url={`/${token}/${language}`}/>
                <h1>{t('liga.title')}</h1>
            </div>
            <div className="league_box">
                <div className="league_box_container">
                    {leagues?.map((league, index) => (<Link key={index} className="league_item"
                                                            to={`/${token}/${language}/league/${league.id}`}>
                        <div className="league_item_left">
                            <img src={league.logo} alt=""/>
                            <h1>{league.name}</h1>
                        </div>
                        <div className="league_item_right">
                            <img src={arrowRight} alt=""/>
                        </div>
                    </Link>))}
                </div>

            </div>
        </div>
    );
};

export default League;

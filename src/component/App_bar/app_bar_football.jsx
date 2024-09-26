import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import peredacha from "../../assets/icon/dilbuzor.png";
import liga from "../../assets/icon/kobek.png";


const   AppBarFootball = () => {
    const { user_id } = useParams(); // Get userId from the URL
    return (
        <div className="app_bar">
            <div className="app_bar_content">
                    <>
                        <Link to={`/${user_id}/Football`} className="app_bar_content_item">
                            <span><img src={ball} alt="Football" /></span>
                            <p>Football</p>
                        </Link>
                        <Link to={`/${user_id}/peredacha`} className="app_bar_content_item" style={{ marginRight: 0 }}>
                            <span><img src={peredacha} alt="Peredacha" /></span>
                            <p>Peredacha</p>
                        </Link>
                        <Link to={`/${user_id}/league`} className="app_bar_content_item">
                            <span><img src={liga} alt="League" /></span>
                            <p>Liga</p>
                        </Link>
                    </>

            </div>
        </div>
    );
};

export default AppBarFootball;

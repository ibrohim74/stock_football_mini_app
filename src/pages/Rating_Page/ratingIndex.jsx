import React, {useState} from 'react';
import "./ratingIndex.css"
import RatingsList from "./component/ratings_list.jsx";
import Rating from "./component/rating.jsx";
import {useTranslation} from "react-i18next";
const RatingIndex = () => {
    const [activeTab, setActiveTab] = useState('list');
    const {t} = useTranslation();
    return (
        <div className="ratingIndex">
            <div className="rating_tabs">
                <div className={`rating_tabs_item ${activeTab === 'list' ? 'active' : ''}`}
                     onClick={() => setActiveTab('list')}
                >{t('rayting_content.darajalar')}</div>
                <div className={`rating_tabs_item ${activeTab === 'rating' ? 'active' : ''}`}
                     onClick={() => setActiveTab('rating')}
                >{t('rayting_content.reyting')}</div>
            </div>
            <div className="rating_content">
                {activeTab === "list" && <RatingsList/>}
                {activeTab === "rating" && <Rating/>}
            </div>
        </div>
    );
};

export default RatingIndex;
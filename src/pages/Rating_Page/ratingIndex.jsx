import React, {useState} from 'react';
import "./ratingIndex.css"
import RatingsList from "./ratings_list.jsx";
import Rating from "./rating.jsx";
const RatingIndex = () => {
    const [activeTab, setActiveTab] = useState('list');
    return (
        <div className="ratingIndex">
            <div className="rating_tabs">
                <div className={`rating_tabs_item ${activeTab === 'list' ? 'active' : ''}`}
                     onClick={() => setActiveTab('list')}
                >Darajalar</div>
                <div className={`rating_tabs_item ${activeTab === 'rating' ? 'active' : ''}`}
                     onClick={() => setActiveTab('rating')}
                >Reyting</div>
            </div>
            <div className="rating_content">
                {activeTab === "list" && <RatingsList/>}
                {activeTab === "rating" && <Rating/>}
            </div>
        </div>
    );
};

export default RatingIndex;
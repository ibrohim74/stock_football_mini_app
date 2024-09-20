import React from 'react';
import "./friends.css"
import gift from "../../assets/imgs/perspective_matte-87-128x128.png";
import ball from "../../assets/icons/soccer_ball.png";
const Friends = () => {
    return (
        <div className="friends">

            <div className="content">
                <div className="friends_content">
                    <div className="friends_title">
                        <h1>Do'stlarni taklif qiling!</h1>
                        <p>Do'stingiz darajasi oshgani uchun darhol +5K va bonuslar olasiz</p>
                    </div>

                    <div className="friends_gift_card">
                        <img src={gift} alt="asdasd"/>
                        <div className="friends_gift_card_text">
                            <h1>Do'st taklif qilish</h1>
                           <p> <img src={ball} alt=""/>+5K taklif uchu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
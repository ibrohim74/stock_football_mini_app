import React from 'react';
import "./events.css"
import gift from "../../assets/imgs/perspective_matte-87-128x128.png";
import ball from "../../assets/icons/soccer_ball.png";
const Events = () => {
    return (
        <div className="events">
            <div className="content_events">
                <div className="events_box">
                    <div className="events_title">
                        <h1>Vazifalarni bajaring</h1>
                        <p>va yanada ko'proq Hurmat tangalarini qo'lga kiriting</p>
                    </div>
                    <div className="events_box_content">
                        <div className="events_box_content_title">
                            <h1>Vazifalar ro'yxati</h1>
                        </div>
                        {
                            eventsData.map((item, i) => {
                                return(
                                    <div className="events_item" key={i}>
                                        <img src={gift} alt="logo" className={"events_item_logo"}/>
                                        <div className="events_item_text">
                                            <p>{item.event}</p>
                                            <span>
                                                <img src={ball} alt=""/>
                                                <p>{item.event_bonus}</p>
                                            </span>
                                        </div>
                                        <span className={"events_item_status"}>{item.status}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Events;

const eventsData = [
    { id: 1, event: "event task obuna boling1", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 2, event: "event task obuna boling2", event_bonus: "+5M" , event_link:"https://test.uz" , status:"ongoing"},
    { id: 3, event: "event task obuna boling3", event_bonus: "+5M" , event_link:"https://test.uz" , status:"ready"},
    { id: 4, event: "event task obuna boling4", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 5, event: "event task obuna boling5", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 6, event: "event task obuna boling6", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 7, event: "event task obuna boling7", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 8, event: "event task obuna boling8", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 9, event: "event task obuna boling9", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
    { id: 10, event: "event task obuna boling10", event_bonus: "+5M" , event_link:"https://test.uz" , status:"active"},
];
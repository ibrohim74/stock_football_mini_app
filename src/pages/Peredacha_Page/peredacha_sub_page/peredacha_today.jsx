import React from 'react';
import { Collapse_Stock } from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg"

const PeredachaToday = () => {
    const items = [
        {
            key: '1',
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>team1</h1>
                        <img src={ball} alt=""/>
                    </div>
                    <p><span>Soat</span>
                        19:00</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p>Additional information about match 1.</p>,
        },
        {
            key: '2',
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>team1</h1>
                        <img src={ball} alt=""/>
                    </div>
                    <p><span>Soat</span>
                        19:00</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p>Additional information about match 1.</p>,
        },
        {
            key: '3',
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>team1</h1>
                        <img src={ball} alt=""/>
                    </div>
                    <p><span>Soat</span>
                        19:00</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p>Additional information about match 1.</p>,
        },
        {
            key: '4',
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>team1</h1>
                        <img src={ball} alt=""/>
                    </div>
                    <p><span>Soat</span>
                        19:00</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p>Additional information about match 1.</p>,
        },
        {
            key: '5',
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>team1</h1>
                        <img src={ball} alt=""/>
                    </div>
                    <p><span>Soat</span>
                        19:00</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p>Additional information about match 1.</p>,
        },
        {
            key: '6',
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>team1</h1>
                        <img src={ball} alt=""/>
                    </div>
                    <p><span>Soat</span>
                        19:00</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p>Additional information about match 1.</p>,
        },
    ];

    return (
        <div>
            <Collapse_Stock items={items} />
        </div>
    );
};

export default PeredachaToday;

import React from 'react';
import {Collapse_Stock} from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg";

const PeredachaTomorrow = () => {
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
                        23 : 10</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, ipsam ipsum labore
                neque quis sequi! Ab ad animi, atque distinctio dolores eum, expedita fuga hic id libero, numquam omnis
                quia quisquam similique veniam. Accusantium alias animi architecto, atque autem blanditiis, commodi
                consequuntur corporis cupiditate dignissimos distinctio doloremque dolores eius est et exercitationem
                expedita facilis hic impedit iste itaque laboriosam laborum laudantium minima nemo omnis quas quibusdam
                quod sapiente temporibus ullam vel velit veniam. Dolor ducimus eius laborum odit provident recusandae
                voluptates voluptatibus? Eaque eveniet molestias nam nesciunt nostrum vero voluptatibus. Iure officia
                quasi repellendus tenetur! Consequatur ipsum quidem sed.
            </p>,
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
                        23 : 10</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, ipsam ipsum labore
                neque quis sequi! Ab ad animi, atque distinctio dolores eum, expedita fuga hic id libero, numquam omnis
                quia quisquam similique veniam. Accusantium alias animi architecto, atque autem blanditiis, commodi
                consequuntur corporis cupiditate dignissimos distinctio doloremque dolores eius est et exercitationem
                expedita facilis hic impedit iste itaque laboriosam laborum laudantium minima nemo omnis quas quibusdam
                quod sapiente temporibus ullam vel velit veniam. Dolor ducimus eius laborum odit provident recusandae
                voluptates voluptatibus? Eaque eveniet molestias nam nesciunt nostrum vero voluptatibus. Iure officia
                quasi repellendus tenetur! Consequatur ipsum quidem sed.
            </p>,
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
                        23 : 10</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, ipsam ipsum labore
                neque quis sequi! Ab ad animi, atque distinctio dolores eum, expedita fuga hic id libero, numquam omnis
                quia quisquam similique veniam. Accusantium alias animi architecto, atque autem blanditiis, commodi
                consequuntur corporis cupiditate dignissimos distinctio doloremque dolores eius est et exercitationem
                expedita facilis hic impedit iste itaque laboriosam laborum laudantium minima nemo omnis quas quibusdam
                quod sapiente temporibus ullam vel velit veniam. Dolor ducimus eius laborum odit provident recusandae
                voluptates voluptatibus? Eaque eveniet molestias nam nesciunt nostrum vero voluptatibus. Iure officia
                quasi repellendus tenetur! Consequatur ipsum quidem sed.
            </p>,
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
                        23 : 10</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, ipsam ipsum labore
                neque quis sequi! Ab ad animi, atque distinctio dolores eum, expedita fuga hic id libero, numquam omnis
                quia quisquam similique veniam. Accusantium alias animi architecto, atque autem blanditiis, commodi
                consequuntur corporis cupiditate dignissimos distinctio doloremque dolores eius est et exercitationem
                expedita facilis hic impedit iste itaque laboriosam laborum laudantium minima nemo omnis quas quibusdam
                quod sapiente temporibus ullam vel velit veniam. Dolor ducimus eius laborum odit provident recusandae
                voluptates voluptatibus? Eaque eveniet molestias nam nesciunt nostrum vero voluptatibus. Iure officia
                quasi repellendus tenetur! Consequatur ipsum quidem sed.
            </p>,
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
                        23 : 10</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, ipsam ipsum labore
                neque quis sequi! Ab ad animi, atque distinctio dolores eum, expedita fuga hic id libero, numquam omnis
                quia quisquam similique veniam. Accusantium alias animi architecto, atque autem blanditiis, commodi
                consequuntur corporis cupiditate dignissimos distinctio doloremque dolores eius est et exercitationem
                expedita facilis hic impedit iste itaque laboriosam laborum laudantium minima nemo omnis quas quibusdam
                quod sapiente temporibus ullam vel velit veniam. Dolor ducimus eius laborum odit provident recusandae
                voluptates voluptatibus? Eaque eveniet molestias nam nesciunt nostrum vero voluptatibus. Iure officia
                quasi repellendus tenetur! Consequatur ipsum quidem sed.
            </p>,
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
                        23 : 10</p>
                    <div className="team2">
                        <img src={ball} alt=""/>
                        <h1>team2</h1>
                    </div>
                </div>
            ),
            children: <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, ipsam ipsum labore
                neque quis sequi! Ab ad animi, atque distinctio dolores eum, expedita fuga hic id libero, numquam omnis
                quia quisquam similique veniam. Accusantium alias animi architecto, atque autem blanditiis, commodi
                consequuntur corporis cupiditate dignissimos distinctio doloremque dolores eius est et exercitationem
                expedita facilis hic impedit iste itaque laboriosam laborum laudantium minima nemo omnis quas quibusdam
                quod sapiente temporibus ullam vel velit veniam. Dolor ducimus eius laborum odit provident recusandae
                voluptates voluptatibus? Eaque eveniet molestias nam nesciunt nostrum vero voluptatibus. Iure officia
                quasi repellendus tenetur! Consequatur ipsum quidem sed.
            </p>,
        },
    ];

    return (
        <div>
            <Collapse_Stock items={items}/>
        </div>
    );
};

export default PeredachaTomorrow;

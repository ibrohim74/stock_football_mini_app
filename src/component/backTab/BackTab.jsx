import React from 'react';
import "./BackTab.css"
import {LeftOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import back from "../../assets/icon/back.webp"
const BackTab = ({back_url}) => {
    return (
        <div className={"back-tab"}>
            <Link to={back_url}>
               <LeftOutlined/> <p>Orqaga</p>
            </Link>
        </div>
    );
};

export default BackTab;
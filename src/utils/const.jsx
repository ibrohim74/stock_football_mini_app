import React from 'react';
import Peredacha from "../pages/Peredacha_Page/peredacha.jsx";
import League from "../pages/League_Page/league.jsx";
import Friends from "../pages/Friends_Page/friends.jsx";
import Rating from "../pages/Rating_Page/rating.jsx";
import Settings from "../pages/Settings_Page/settings.jsx";
import HomePageFootball from "../pages/Home_Page_Football/homePageFootball.jsx";
import HomePageTap from "../pages/Home_Page_Tap/homePageTap.jsx";
import Events from "../pages/Events_Page/events.jsx";

export const INDEX = "/";
export const TAP = "/homeTap/";
export const FOOTBALL = "/homeFootball/";
export const HOME_PAGE_TAP = "Tap";
export const HOME_PAGE_FOOTBALL = "Football";
export const PEREDACHA = "peredacha";
export const LEAGUE = "league";
export const FRIENDS = "friends";
export const RATING = "rating";
export const SETTINGS = "setting";
export const EVENTS = "Events_Page";

export const RouterTapFootballData = [
    { Path: HOME_PAGE_TAP, Component: <HomePageTap /> },
    { Path: FRIENDS, Component: <Friends /> },
    { Path: RATING, Component: <Rating /> },
    { Path: SETTINGS, Component: <Settings /> },
    { Path: EVENTS, Component: <Events /> },
];

export const RouterFootballData = [
    { Path: HOME_PAGE_FOOTBALL, Component: <HomePageFootball /> },
    { Path: PEREDACHA, Component: <Peredacha /> },
    { Path: LEAGUE, Component: <League /> },
    { Path: SETTINGS, Component: <Settings /> },
];

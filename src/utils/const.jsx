import HomePageTap from "../pages/Home_Page_Tap/homePageTap.jsx"; // HomePageTap import qilish
import Peredacha from "../pages/Peredacha_Page/peredacha.jsx";
import League from "../pages/League_Page/league.jsx";
import Friends from "../pages/Friends_Page/friends.jsx";
import Settings from "../pages/Settings_Page/settings.jsx";
import HomePageFootball from "../pages/Home_Page_Football/homePageFootball.jsx";
import Events from "../pages/Events_Page/events.jsx";
import ExpShop from "../pages/Exp_Page/exp_shop.jsx";
import Quiz from "../pages/Quiz_Page/quiz.jsx";
import Gift from "../pages/gift/gift.jsx";
import RatingIndex from "../pages/Rating_Page/ratingIndex.jsx";
import League_id_page from "../pages/League_Page/component/league_id_page.jsx";

export const HOME_PAGE_TAP = "/:user_id/:language";
export const HOME_PAGE_FOOTBALL = "/:user_id/:language/Football";
export const PEREDACHA = "/:user_id/:language/peredacha";
export const LEAGUE = "/:user_id/:language/league";
export const FRIENDS = "/:user_id/:language/friends";
export const RATING = "/:user_id/:language/rating";
export const SETTINGS = "/:user_id/:language/settings";
export const EVENTS = "/:user_id/:language/Events_Page";
export const EXP_SHOP = "/:user_id/:language/exp_shop";
export const QUIZ = "/:user_id/:language/quiz";
export const GIFT = "/:user_id/:language/gift";

export const LEAGUE_ID_PAGE = "/:user_id/:language/league/:league_id";

export const RouterTapFootballData = [
    { Path: HOME_PAGE_TAP, Component: HomePageTap },
    { Path: FRIENDS, Component: Friends },
    { Path: RATING, Component: RatingIndex },
    { Path: SETTINGS, Component: Settings },
    { Path: EVENTS, Component: Events },
    { Path: EXP_SHOP, Component: ExpShop },
    { Path: QUIZ, Component: Quiz },
    { Path: GIFT, Component: Gift },
];

export const RouterFootballData = [
    { Path: HOME_PAGE_FOOTBALL, Component: HomePageFootball },
    { Path: PEREDACHA, Component: Peredacha },
    { Path: LEAGUE, Component: League },
    { Path: LEAGUE_ID_PAGE, Component: League_id_page },
    { Path: SETTINGS, Component: Settings },
];

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

export const HOME_PAGE_TAP = "/:token/:language";
export const HOME_PAGE_FOOTBALL = "/:token/:language/Football";
export const PEREDACHA = "/:token/:language/peredacha";
export const LEAGUE = "/:token/:language/league";
export const FRIENDS = "/:token/:language/friends";
export const RATING = "/:token/:language/rating";
export const SETTINGS = "/:token/:language/settings";
export const EVENTS = "/:token/:language/Events_Page";
export const EXP_SHOP = "/:token/:language/exp_shop";
export const QUIZ = "/:token/:language/quiz";
export const GIFT = "/:token/:language/gift";

export const LEAGUE_ID_PAGE = "/:token/:language/league/:league_id";

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

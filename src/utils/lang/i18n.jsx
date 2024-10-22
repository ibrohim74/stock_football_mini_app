import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const urlParts = window.location.href.split("/");
const urlLanguage = urlParts[urlParts.length - 1];

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: urlLanguage,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            uz: {
                translation: {
                    tour: {
                        profile: {
                            title: "Profil",
                            description: "Bu yerda sizning sozlamalaringiz saqlanadi",
                        },
                        tajriba: {
                            title: "Tajriba",
                            description: 'Bu yerda soatiga qancha tajriba ishlashingiz ko\'rsatiladi. ' +
                                'Ustiga bosib, tajribani sotib olishingiz va ko\'paytirishingiz mumkin',
                        },
                        daraja: {
                            title: "Daraja",
                            description: "Bu yerda mavjud barcha darajalarni va reytingni ko'rishingiz mumkin.",
                        },
                        Koptok: {
                            title: "Koptok",
                            description: 'Koptokni bosib ballar oling! ' +
                                'Darajangizga qarab quvvat beriladi va shu quvvat tugamaguncha ballar to\'plashingiz mumkin',
                        },
                        bosh_sahifa: {
                            title: "Bosh sahifa",
                            description: "Bu yerda asosiy sahifa ochiladi",
                        },
                        dostlar: {
                            title: "Do'stlar",
                            description: "Bu yerda siz do'stlaringizni taklif qilishingiz mumkin",
                        },
                        live: {
                            title: "Live",
                            description: "Bu yerda futbol o'yinlarini kuzatishingiz mumkin",
                        },
                        events: {
                            title: "Vazifalar",
                            description: "Bu yerda vazifalar ro'yxatini ko'rishingiz mumkin",
                        },
                        Reyting: {
                            title: "Reyting",
                            description: "Bu yerda reyting sahifasini ochasiz",
                        },
                        Gift: {
                            title: "Sovg'alar",
                            description: "Tez kunda ...",
                        },
                    },
                    tour_fotballApp: {
                        live: {
                            title: "Live",
                            description: "Bu yerda hozirda bo'layotgan o'yinlarini kuzatishingiz mumkin",
                        },
                        peredacha: {
                            title: "Dastur",
                            description: "Bu yerda 9 kunlik o'yinlarini kuzatishingiz mumkin",
                        },
                        liga: {
                            title: "Liga",
                            description: "Bu yerda ligalarning 1 yillik o'yinlarini kuzatishingiz mumkin va liga bo'yicha o'yinlarni qachon bo'lishini bilishingiz mumkin",
                        },
                    },
                    tour_fotballLive: {
                        live: {
                            title: "Live",
                            description: "Bu yerda hozirda bo'layotgan o'yinlarini kuzatishingiz mumkin",
                        },
                        live_button: {
                            title: "Live tugmasi",
                            description: "Bu yerda hozirda bo'layotgan o'yinlarini jonli efirda kuzatishingiz mumkin",
                        },
                        back: {
                            title: "Ortga qaytish",
                            description: "Bosh sahifaga qaytish uchun tugma",
                        },
                    },
                    app_bar: {
                        bosh_sahifa: "Bosh sahifa",
                        dostlar: "Do'stlar",
                        live: "Live",
                        vazifalar: "Vazifalar",
                        reyting: "Reyting",
                    },
                    app_bar_football: {
                        live: "Jonli Efir",
                        peredacha: "Dastur",
                        liga: "Liga",
                    },
                    homePageTap: {
                        tap_bonus: "Tap Bonus",
                        darajangiz: "Darajangiz",
                        tajriba: "Tajriba",
                    },
                    friends: {
                        title: "Do'stlarni taklif qiling!",
                        sub_title: "Do'stingiz darajasi oshsa darhol +5K va har 8 soatda ballar yig'ib oling",
                        claim: "Ballarni olish",
                        claim_active: "Ballar to'planmoqda",
                        no_friends: "Do'stlaringizni chaqiring",
                        fiends: "Do'stlar ro'yxati",
                        show_all: "Barchasini ko'rsatish",
                        share: "Do'stni taklif qilish",
                        activate:"Ballar ishlash"
                    },
                    events: {
                        title: "Vazifalarni bajaring",
                        sub_title: "va yanada ko'proq tangalar qo'lga kiriting",
                        day_event: "Kundalik vazifalar",
                        event: "Vazifalar ro'yxati",
                        hero_event: "Asosiy vazifalar",
                        completed: "Olindi",
                        active: "Boshlash",
                        events_daly_text:`Har kuni 5 tadan savol beriladi va har bir tog'ri javob uchun 2000 ball oling`
                    },
                    exp_shop: {
                        btn_active: "Tajriba orttirish davom etmoqda...",
                        btn_disbl: "Tajriba orttirish",
                        hour_tajriba: "Soatiga tajriba",
                        daraja: "Daraja",
                        daraja_short: "dar",
                        price: "Narx",
                        buy: "Sotib olish",
                        dis_buy: "Mablag' yetarli emas",
                        status: {
                            tajriba_oshdi: "Tajribangiz oshdi !!!",
                            error: "Xatolik yuzaga keldi",
                            claim: "Ballar olindi",
                        },
                    },
                    peredacha: {
                        liga: "Liga",
                        hisob: "Hisob",
                        oyin_vaqti: "O'yin vaqti",
                    },
                    gift: {
                        title: "Sovg'alar",
                        h1: "Tez kunda...",
                    },
                    rayting_content: {
                        darajalar: "Darajalar",
                        reyting: "Reyting",
                    },
                    liga: {
                        title: "Liga o'yinlari",
                        liga_tab_rating: "Turnir jadvali",
                        liga_tab_calendar: "O'yinlar taqvimi",
                        jamoa: "Jamoa",
                        oyin: "O'yin",
                        home:"Uyda",
                        away:"Mehmonda",
                        ochko: "Ochko"
                    },
                    live: {
                        live: "Jonli Efir",
                        goals: "Hozircha gollar yo'q",
                    },
                    quiz:{
                        quiz_end:{
                            text1:"Test tugadi!",
                            text2:"Savollar soni",
                            text3:"To'g'ri javoblar",
                            text4:"Yutgan ball",
                            text5:"Orqaga qaytish",
                        },
                        loading_quiz:"Savollar yuklanmoqda...",
                        Ball:"Ball",
                        question:"Savol"
                    },
                    loading: "Kuting...",
                    no_data: "Ma'lumot yo'q",
                    copy:"Havola nusxalandi!",
                    dan:"dan"
                },
            },
            rus: {
                translation: {
                    tour: {
                        profile: {
                            title: "Профиль",
                            description: "Здесь сохранены ваши настройки",
                        },
                        tajriba: {
                            title: "Опыт",
                            description: 'Здесь указано, сколько опыта в час вы зарабатываете. ' +
                                'Войдя, вы сможете покупать карточки опыта и усиливать его',
                        },
                        daraja: {
                            title: "Уровень",
                            description: "Здесь вы можете увидеть все доступные уровни и рейтинг.",
                        },
                        Koptok: {
                            title: "Мяч",
                            description: 'Тапайте мяч и зарабатывайте баллы! ' +
                                'Энергия зависит от вашего уровня и вы можете зарабатывать баллы, пока у вас есть энергия',
                        },
                        bosh_sahifa: {
                            title: "Главная страница",
                            description: "Здесь открывается главная страница",
                        },
                        dostlar: {
                            title: "Друзья",
                            description: "Здесь вы сможете приглашать друзей",
                        },
                        live: {
                            title: "Live",
                            description: "Здесь вы сможете следить за футбольными матчами",
                        },
                        events: {
                            title: "Задания",
                            description: "Здесь вы можете увидеть список заданий",
                        },
                        Reyting: {
                            title: "Рейтинг",
                            description: "Здесь вы сможете открыть страницу рейтинга",
                        },
                        Gift: {
                            title: "Подарки",
                            description: "Скоро...",
                        },
                    },
                    tour_fotballApp: {
                        live: {
                            title: "Прямой эфир",
                            description: "Здесь вы можете следить за текущими играми",
                        },
                        peredacha: {
                            title: "Программа",
                            description: "Здесь вы можете следить за играми в течение 9 дней",
                        },
                        liga: {
                            title: "Лига",
                            description: "Здесь вы можете следить за играми лиги на протяжении года и узнать, когда будут проводиться матчи по лиге",
                        },
                    },
                    tour_fotballLive: {
                        live: {
                            title: "Прямой эфир",
                            description: "Здесь вы можете следить за текущими играми",
                        },
                        live_button: {
                            title: "Кнопка Прямой эфир",
                            description: "Здесь вы можете следить за текущими играми в прямом эфире",
                        },
                        back: {
                            title: "Возврат",
                            description: "Кнопка для возврата на главную страницу",
                        },
                    },
                    app_bar: {
                        bosh_sahifa: "Главная страница",
                        dostlar: "Друзья",
                        live: "Live",
                        vazifalar: "Задания",
                        reyting: "Рейтинг",
                    },
                    app_bar_football: {
                        live: "Прямой эфир",
                        peredacha: "Программа",
                        liga: "Лига",
                    },
                    homePageTap: {
                        tap_bonus: "Tap Бонус",
                        darajangiz: "Ваш уровень",
                        tajriba: "Опыт",
                    },
                    friends: {
                        title: "Пригласите друзей!",
                        sub_title: "Если уровень вашего друга увеличится, вы сразу получите +5K и сможете зарабатывать баллы каждые 8 часов",
                        claim: "Получить баллы",
                        claim_active: "Баллы накапливаются",
                        no_friends: "Пригласите своих друзей",
                        fiends: "Список друзей",
                        show_all: "Показать всех",
                        share: "Пригласить друга",
                        activate:"Заработать очки"
                    },
                    events: {
                        title: "Выполняйте задания",
                        sub_title: "и зарабатывайте еще больше монет",
                        day_event: "Ежедневные задания",
                        event: "Список заданий",
                        hero_event: "Основные задания",
                        completed: "Получено",
                        active: "Начать",
                        events_daly_text:"Каждый день задаются 5 вопросов, и за каждый правильный ответ вы получаете 2000 очков"
                    },
                    exp_shop: {
                        btn_active: "Опыт накапливается...",
                        btn_disbl: "Увеличить опыт",
                        hour_tajriba: "Опыт в час",
                        daraja: "Уровень",
                        daraja_short: "ур.",
                        price: "Цена",
                        buy: "Купить",
                        dis_buy: "Недостаточно средств",
                        status: {
                            tajriba_oshdi: "Ваш опыт увеличился!!!",
                            error: "Произошла ошибка",
                            claim: "Баллы получены",
                        },
                    },
                    peredacha: {
                        liga: "Лига",
                        hisob: "Счет",
                        oyin_vaqti: "Время игры",
                    },
                    gift: {
                        title: "Подарки",
                        h1: "Скоро...",
                    },
                    rayting_content: {
                        darajalar: "Уровни",
                        reyting: "Рейтинг",
                    },
                    liga: {
                        title: "Игры лиги",
                        liga_tab_rating: "Турнирная таблица",
                        liga_tab_calendar: "Календарь игр",
                        jamoa: "Команда",
                        oyin: "Игра",
                        home:"Дома",
                        away:"В гостях",
                        ochko: "Очко"
                    },
                    live: {
                        live: "Прямой эфир",
                        goals: "Пока нет голов",
                    },
                    quiz: {
                        quiz_end: {
                            text1: "Тест завершен!",
                            text2: "Количество вопросов",
                            text3: "Правильные ответы",
                            text4: "Набранные баллы",
                            text5: "Вернуться назад",
                        },
                        loading_quiz: "Загрузка вопросов...",
                        Ball: "Баллы",
                        question: "Вопрос"
                    },

                    loading: "Загрузка...",
                    no_data: "Нет данных",
                    copy:"Ссылка скопирована!",
                    dan:"dan",

                },
            },
        },
    });

export default i18n;

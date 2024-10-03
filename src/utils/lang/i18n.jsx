import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "uz", // Default language if the URL does not specify a valid language
        interpolation: {
            escapeValue: false,
        },
        resources: {
            uz: {
                translation: {
                    tour: {
                        profile: {
                            title: "Profile",
                            description: "Bu yerda sizning sozlamalaringiz saqlanadi",
                        },
                        tajriba: {
                            title: "Tajriba",
                            description: 'Bu yerda soatiga qancha tajriba ishlashingiz ko\'rsatiladi, ' +
                                'ustiga bosib tajriba sotib olishingiz va ko\'paytirishingiz mumkin'
                        },
                        daraja: {
                            title: "Daraja",
                            description: "Bu yerda mavjud barcha darajalarni va reytingni korishingiz mumkin.",
                        },
                        Koptok: {
                            title: "Koptok",
                            description: 'Koptokni bosib ballar ishlang! ' +
                                'Darajangizga qarab quvvat beriladi va shu quvvat tugamaguncha ballar ishlashingiz mumkin',
                        },
                        bosh_sahifa: {
                            title: "Bosh sahifa",
                            description: "Bu yerda asosiy sahifa ochiladi"
                        },
                        dostlar: {
                            title: "Do'stlar",
                            description: "Bu yerda siz do'stlaringizni taklif qilishingiz mumkin"
                        },
                        live: {
                            title: "Live",
                            description: "Bu yerda futbol o'yinlarini kuzatishingiz mumkin"
                        },
                        events: {
                            title: "Vazifalar",
                            description: "Bu yerda vazifalar ro'yxatini ko'rishingiz mumkin"
                        },
                        Reyting: {
                            title: "Reyting",
                            description: "Bu yerda reyting sahifasini ochasiz"
                        }
                    },
                    app_bar: {
                        bosh_sahifa: "Bosh sahifa",
                        dostlar: "Do'stlar",
                        live: "Live",
                        vazifalar: "Vazifalar",
                        reyting: "Reyting"
                    },
                    app_bar_football: {
                        live: "Football",
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
                        sub_title: "Do'stingi darajasi oshsa darhol +5K va bonuslar olasiz",
                        claim: "Ballarni olish",
                        claim_active: "Ballar to'planmoqda",
                        fiends: "Do'stlar ro'yxati",
                        show_all: "Barchasini ko'rsatish",
                        share: "Do'stni taklif qilish"
                    },
                    events: {
                        title: "Vazifalarni bajaring",
                        sub_title: "va yanada ko'proq tangalarini qo'lga kiriting",
                        day_event: "Kundalik vazifalar",
                        event: "Vazifalar ro'yxati",
                        hero_event: "Asosiy vazifalar",
                        completed: "Vazifa bajarildi"
                    },
                    exp_shop: {
                        btn_active: "Tajriba orttirish davom etmoqda...",
                        btn_disbl: "Tajriba orttirish",
                        hour_tajriba: "Soatiga tajriba",
                        daraja: "Daraja",
                        daraja_short: "dar",
                        price: "Narx",
                        buy: "Sotb olish",
                        dis_buy: "Mablag' yetarli emas",
                        status: {
                            tajriba_oshdi: "Tajribangiz oshdi !!!",
                            error: "Xatolik yuzaga keldi",
                            claim: "Ballar olindi"
                        }
                    },
                    peredacha: {
                        bugungi: "Bugungi",
                        ertangi: "Ertangi",
                        kechagi: "Kechagi"
                    },
                    gift: {
                        title: "Sovg'alar",
                        h1: "Tez Kunda..."
                    },

                    rayting_content: {
                        darajalar: "Darajalar",
                        reyting: "Reyting",
                    },


                    loading: "Kuting...",
                    no_data: "Ma'lumot yo'q"
                }
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
                            description: 'Здесь указано сколько опыта в час вы зарабатываете, ' +
                                'Войдя вы сможете покупать карточки опыта и усиливать его'
                        },
                        daraja: {
                            title: "Уровень",
                            description: "Здесь вы можете увидеть все доступные уровни и рейтинг.",
                        },

                        Koptok: {
                            title: "Мяч",
                            description: 'Тапайте мяч и зарабатывайте баллы!' +
                                'Энергия зависит от вашего уровня и вы можете зарабатывать баллы, пока у вас есть энергия',
                        },
                        bosh_sahifa: {
                            title: "Главная страница",
                            description: "Здесь открывается главная страница"
                        },
                        dostlar: {
                            title: "Друзья",
                            description: "Здесь вы сможете приглашать друзей"
                        },
                        live: {
                            title: "Live",
                            description: "Тут вы сможете следить за футбольными матчами"
                        },
                        events: {
                            title: "Задания",
                            description: "Здесь вы можете увидеть список заданий"
                        },
                        Reyting: {
                            title: "Рейтинг",
                            description: "Здесь вы сможете открыть страницу рейтинга"
                        }
                    },
                    app_bar: {
                        bosh_sahifa: "Главная ",
                        dostlar: "Друзья",
                        live: "Live",
                        vazifalar: "Задания",
                        reyting: "Рейтинг"
                    },
                    app_bar_football: {
                        live: "Футбол",
                        peredacha: "Программа",
                        liga: "Лига",
                    },
                    homePageTap: {
                        tap_bonus: "Тап Бонус",
                        darajangiz: "Ваш уровень",
                        tajriba: "Опыт",
                    },
                    friends: {
                        title: "Приглашайте друзей!",
                        sub_title: "При повышении уровня приглашенного друга вы сразу получаете 5К баллов бонусом",
                        claim: "Получить баллы",
                        claim_active: "Баллы набираются",
                        fiends: "Список друзей",
                        no_friends: "Вы еще никого не пригласили",
                        show_all: "Показать все",
                        share: "Пригласить друзей"
                    },
                    events: {
                        title: "Выполняйте задания",
                        sub_title: "И получайте больше монет",
                        day_event: "Ежедневные задания",
                        event: "Список заданий",
                        hero_event: "Основная задача",
                        completed: "задача выполнена"
                    },

                    exp_shop: {
                        btn_active: "Продолжается получение опыта…",
                        btn_disbl: "Получение опыта",
                        hour_tajriba: "Часовой опыт",
                        daraja: "Уровень",
                        daraja_short: "ур.",
                        price: "Цена",
                        buy: "Купить",
                        dis_buy: "Недостаточно средств",
                        status: {
                            tajriba_oshdi: "Ваш опыт увеличился !!!",
                            error: "Произошла ошибка",
                            claim: "Баллы получены"
                        }
                    },

                    peredacha: {
                        bugungi: "Сегодняшний",
                        ertangi: "Завтра",
                        kechagi: "Вчера"
                    },
                    gift: {
                        title: "Подарки",
                        h1: "Скоро..."
                    },
                    rayting_content: {
                        darajalar: "Уровни",
                        reyting: "Рейтинг",
                    },

                    loading: "Подождите…",
                    no_data: "Нет информации"
                }
            },
        },
    });

export default i18n;

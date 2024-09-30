import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "uz",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            uz: {
                translation: {
                    tour: {
                        profile: {
                            title: "Profile",
                            description: "Bu yerda sizning sozlamalaringiz saqlanadi" ,
                        },
                        tajriba: {
                            title: "Tajriba",
                            description: 'Bu yerda soatiga qancha tajriba ishlashingiz ko\'rsatiladi, ' +
                                'ustiga bosib tajriba sotib olishingiz va ko\'paytirishingiz mumkin'
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
                        sub_title: "Do'stingi darajasi oshsa  darhol +5K va bonuslar olasiz",
                        claim: "Ballarni olish",
                        fiends: "Do'stlar ro'yxati",
                        show_all: "Barchasini ko'rsatish",
                        share: "Do'stni taklif qilish"
                    },
                    events: {
                        title: "Vazifalarni bajaring",
                        sub_title: "va yanada ko'proq  tangalarini qo'lga kiriting",
                        day_event: "Kundalik vazifalar",
                        event: "Vazifalar ro'yxati"
                    },
                    exp_shop:{
                      btn_active:"Tajriba orttirish davom etmoqda...",
                      btn_disbl:"Tajriba orttirish",
                    },

                    loading: "Kuting...",
                    no_data: "Ma'lumot yo'q"
                }
            },
            ru: {
                translation: {
                    tour: {
                        profile: {
                            title: "Profile",
                            description: "Bu yerda sizning sozlamalaringiz saqlanadi" ,
                        },
                        tajriba: {
                            title: "Tajriba",
                            description: 'Bu yerda soatiga qancha tajriba ishlashingiz ko\'rsatiladi, ' +
                                'ustiga bosib tajriba sotbolishingiz va ko\'paytirishingiz mumkun'
                        },
                        Koptok: {
                            title: "Koptok",
                            description: 'Koptokni bosib ballar ishlang! ' +
                                'Darajangizga qarab energiya beriladi va shu energiya tugamaguncham ballar ishlasangiz boladi',
                        },
                        bosh_sahifa: {
                            title: "Bosh sahifa",
                            description: "Bu yerda asosiy sahifani ochasiz"
                        },
                        dostlar: {
                            title: "Dostlar",
                            description: "Bu yerda do'stlaringizni taklif qilishingiz mumkin"
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
                        dostlar: "Dostlar",
                        live: "Live",
                        vazifalar: "Vazifalar",
                        reyting: "Reyting"
                    },
                    app_bar_football: {
                        live: "Football",
                        peredacha: "Peredacha",
                        liga: "Liga",
                    },
                    homePageTap: {
                        tap_bonus: "Tap Bonus",
                        darajangiz: "Darajangiz",
                        tajriba: "Tarajriba",
                    },
                    friends: {
                        title: "Do'stlarni taklif qiling!",
                        sub_title: "Do'stingiz darajasi oshgani uchun darhol +5K va bonuslar olasiz",
                        claim: "Ballarni olish",
                        fiends: "Do'stlar ro'yxati",
                        no_fiends: "Siz hali hech kimni taklif qilmagansiz",
                        show_all: "Barchasini korsatish",
                        share: "Dostni taklif qilish"
                    },
                    events: {
                        title: "Vazifalarni bajaring",
                        sub_title: "va yanada ko'proq Hurmat tangalarini qo'lga kiriting",
                        day_event: "Kundalik vazifalar",
                        event: "Vazifalar royxati",
                        hero_event:"Asosiy vazifa"
                    },
                    peredacha:{
                        bugungi:"Bugungi",
                        ertangi:"Ertangi",
                        kechagi:"Kechagi"
                    },

                    loading: "loading...",
                    no_data: "Ma'lumot yo'q"
                }
            },
        },
    });

export default i18n;

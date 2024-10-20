import React from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";

const QuizSuccess = ({questions , correctAnswers , score}) => {
    const {t} = useTranslation();
    const {user_id , language} = useParams();
    const navigate = useNavigate();
    return (
        <div className="quiz-finished">
            <h1>{t("quiz.quiz_end.text1")}</h1>
            <h3>{t("quiz.quiz_end.text2")}: {questions.length}</h3>
            <h3>{t("quiz.quiz_end.text3")}: {correctAnswers}</h3>
            <h3>{t("quiz.quiz_end.text4")}: {score}</h3>
            <button onClick={() => navigate(`/${user_id}/${language}/Events_Page`)}>{t("quiz.quiz_end.text5")}</button>
        </div>
    );
};

export default QuizSuccess;
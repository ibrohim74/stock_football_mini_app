import React, { useState, useEffect } from 'react';
import { message, Progress } from 'antd';
import './quiz.css';
import { useNavigate, useParams } from "react-router-dom";
import ball from '../../assets/icons/soccer_ball.png';
import $API from "../../utils/https.jsx";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizAvailable, setQuizAvailable] = useState(true);
    const [quizFinished, setQuizFinished] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [answerStatus, setAnswerStatus] = useState(null); // Javob holatini saqlash
    const { user_id } = useParams();
    const navigate = useNavigate();

    const getQuestions = async () => {
        try {
            const res = await $API.get("/questions");
            setQuestions(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        const lastPlayed = localStorage.getItem(`quiz_last_played_${user_id}`);
        if (lastPlayed) {
            const lastPlayedTime = new Date(lastPlayed).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastPlayedTime;

            if (timeDifference < 24 * 60 * 60 * 1000) {
                messageApi.error('Siz allaqachon viktorinada qatnashgansiz. 24 soatdan keyin qayta qatnashishingiz mumkin.');
                setQuizAvailable(false);
            }
        }
    }, [user_id, messageApi]);

    useEffect(() => {
        if (timeLeft > 0 && quizAvailable && !quizFinished) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
    }, [timeLeft, quizAvailable, quizFinished]);

    // Javobni serverga jo'natish va qaytgan javobga qarab rang berish
    const sendAnswerToServer = async (questionId, answerText) => {
        try {
            const res = await $API.post('/questions/answer/', null, {
                params: {
                    user_id,
                    question_id: questionId,
                    answer: answerText,
                }
            });

            if (res.data.answer) {
                setAnswerStatus('correct');
                setScore(score + 100); // To'g'ri javob bo'lsa ball qo'shish
            } else {
                setAnswerStatus('incorrect');
            }

            // 2 soniyadan keyin keyingi savolga o'tish
            setTimeout(() => {
                handleNextQuestion();
            }, 2000);

        } catch (error) {
            console.error('Javobni jo\'natishda xatolik yuz berdi:', error);
        }
    };


    const handleAnswerSelection = (answerText) => {
        setSelectedAnswer(answerText);
        const currentQ = questions[currentQuestion];
        sendAnswerToServer(currentQ.id, answerText);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerStatus(null); // Rangni qayta tiklash
        setTimeLeft(15);

        if (currentQuestion + 1 >= questions.length) {
            setQuizFinished(true);
            localStorage.setItem(`quiz_last_played_${user_id}`, new Date().toISOString());
            setTimeout(() => {
                navigate(`/${user_id}/Events_Page`);
            }, 3000);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    if (!quizAvailable) {
        return (
            <div className="quiz-container quiz_end">
                <div className="quiz_end_score">
                    <h1><img loading={"lazy"} src={ball} alt="" width={25}/> {score}</h1>
                    So'nggi o'yin natijasi
                </div>
                Viktorina faqat 24 soatda bir marta o'tkaziladi.
            </div>
        );
    }

    if (quizFinished) {
        return (
            <div className="quiz-container quiz_end">
                <div className="quiz_end_score">
                    <h1><img loading={"lazy"} src={ball} alt="" width={25}/> {score}</h1>
                    So'nggi o'yin natijasi
                </div>
                Viktorina yakunlandi.
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Savollar yuklanmoqda...</div>;
    }

    return (
        <div className={`quiz-container`}>
            <div className="quiz_title">
                <h1>Savollar</h1>
                <h3>Ball: {score}</h3>
            </div>

            <div className="quiz_box">
                <div className="quiz_question">
                    <Progress
                        type="circle"
                        percent={(timeLeft / 15) * 100}
                        format={() => `${timeLeft}s`}
                        strokeColor={timeLeft > 5 ? '#1890ff' : '#ff4d4f'}
                    />
                    <h2>{questions[currentQuestion].description}</h2>
                </div>
            </div>

            {contextHolder}

            <form className={'quiz_form'}>
                {['a', 'b', 'c', 'd'].map((key, index) => (
                    <div key={index}
                         className={`quiz_item ${selectedAnswer === questions[currentQuestion][key] && answerStatus ? (answerStatus === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`}>
                        <input
                            type="radio"
                            id={`answer-${key}`}
                            name="quiz-answer"
                            value={questions[currentQuestion][key]}
                            checked={selectedAnswer === questions[currentQuestion][key]}
                            onChange={() => handleAnswerSelection(questions[currentQuestion][key])}
                        />
                        <label htmlFor={`answer-${key}`}>{questions[currentQuestion][key]}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default Quiz;

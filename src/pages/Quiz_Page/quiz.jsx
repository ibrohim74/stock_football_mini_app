import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Progress } from 'antd';
import { $API } from '../../utils/https.jsx'; // API ni import qiling
import "./quiz.css"
const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizAvailable, setQuizAvailable] = useState(true);
    const [quizFinished, setQuizFinished] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [answerStatus, setAnswerStatus] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0); // To'g'ri javoblar soni
    const { user_id, language } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await $API.get(`questions/${user_id}`, { params: { user_id } });
                setQuestions(res.data);
            } catch (error) {
                console.error('Savollarni yuklashda xatolik:', error);
            }
        };

        fetchQuestions();
    }, [user_id]);

    useEffect(() => {
        if (timeLeft > 0 && !quizFinished) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
    }, [timeLeft, quizFinished]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        sendAnswerToServer(questions[currentQuestion]?.id, answer);
    };

    const sendAnswerToServer = async (questionId, answerText) => {
        try {
            const res = await $API.post(`/questions/answer/`, null, {
                params: {
                    user_id,
                    question_id: questionId,
                    answer: answerText,
                }
            });

            if (res.data.answer) {
                setAnswerStatus('correct');
                setScore(score + res.data.ball);
                setCorrectAnswers(correctAnswers + 1); // To'g'ri javob berilganda
            } else {
                setAnswerStatus('incorrect');
            }

            setTimeout(() => {
                handleNextQuestion();
            }, 2000);

        } catch (error) {
            console.error('Javobni jo\'natishda xatolik yuz berdi:', error);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerStatus(null);
        setTimeLeft(15);

        if (currentQuestion + 1 >= questions.length) {
            setQuizFinished(true);
            localStorage.setItem(`quiz_last_played_${user_id}`, new Date().toISOString());
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Test tugaganda ko'rsatish
    if (quizFinished) {
        return (
            <div className="quiz-finished">
                <h1>Test tugadi!</h1>
                <h3>Savollar soni: {questions.length}</h3>
                <h3>To'g'ri javoblar: {correctAnswers}</h3>
                <h3>Yutgan ball: {score}</h3>
                <button onClick={() => navigate(`/${user_id}/${language}/Events_Page`)}>Orqaga qaytish</button>
            </div>
        );
    }

    // Agar savollar yo'q bo'lsa
    if (questions.length === 0) {
        return <div className="loading">Savollar yuklanmoqda...</div>;
    }

    return (
        <div className={`quiz-container`}>
            <div className="quiz_title">

                <h3>Ball: {score}</h3>
                <h4>Savol: {currentQuestion + 1} / {questions.length}</h4>
            </div>

            <div className="quiz_box">
                <div className="quiz_question">
                    <Progress
                        type="circle"
                        percent={(timeLeft / 15) * 100}
                        format={() => `${timeLeft}s`}
                        strokeColor={timeLeft > 5 ? '#1890ff' : '#ff4d4f'}
                    />
                    <h2>{questions[currentQuestion]?.description}</h2>
                </div>
            </div>

            {contextHolder}

            <form className={'quiz_form'}>
                {['a', 'b', 'c', 'd'].map((key, index) => {
                    const answer = questions[currentQuestion]?.[key];
                    return (
                        answer && ( // Check if answer exists
                            <div key={index}
                                 className={`quiz_item ${selectedAnswer === answer && answerStatus ? (answerStatus === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`}>
                                <input
                                    type="radio"
                                    id={`answer-${key}`}
                                    name="quiz-answer"
                                    value={answer}
                                    checked={selectedAnswer === answer}
                                    onChange={() => handleAnswerSelection(answer)}
                                />
                                <label htmlFor={`answer-${key}`}>{answer}</label>
                            </div>
                        )
                    );
                })}
            </form>
        </div>
    );
};

export default Quiz;

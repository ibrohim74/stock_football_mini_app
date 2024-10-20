import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {message, Progress} from 'antd';
import {$API} from '../../utils/https.jsx'; // API ni import qiling
import "./quiz.css";
import {useTranslation} from "react-i18next";
import QuizSuccess from "./quizSuccess.jsx";

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
    const {user_id, language} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    console.log('Current Question:', currentQuestion);
    console.log('Total Questions:', questions.length);
    console.log(questions)

    useEffect(() => {
        const lastPlayedTime = localStorage.getItem(`quiz_last_played_${user_id}`);
        if (lastPlayedTime) {
            const lastPlayedDate = new Date(lastPlayedTime);
            const now = new Date();
            const timeDifference = now - lastPlayedDate;

            // Agar oxirgi marta o'ynalganidan beri 24 soat o'tmagan bo'lsa
            if (timeDifference < 24 * 60 * 60 * 1000) {
                setQuizAvailable(false); // Testni yopamiz
                messageApi.info(t("quiz.quiz_not_available")); // Userga xabar beramiz
                return;
            }
        }

        // Agar test mavjud bo'lsa, savollarni yuklash
        const fetchQuestions = async () => {
            try {
                const res = await $API.get(`questions/${user_id}`, {params: {user_id}});
                setQuestions(res.data.question);
            } catch (error) {
                console.error('Savollarni yuklashda xatolik:', error);
            }
        };

        fetchQuestions();
    }, [user_id, messageApi, t]);

    useEffect(() => {
        if (timeLeft > 0 && !quizFinished) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
    }, [timeLeft, quizFinished]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);

        // Javobni tanlaganda to'g'ri yoki noto'g'ri ekanligini darhol ko'rsatish
        const correctAnswer = questions[currentQuestion]?.answer;
        if (answer === correctAnswer) {
            setAnswerStatus('correct');
            setScore(prevScore => prevScore + questions[currentQuestion]?.ball); // Ball qo'shish
            setCorrectAnswers(prevCorrect => prevCorrect + 1); // To'g'ri javoblar sonini oshirish
        } else {
            setAnswerStatus('incorrect');
        }
        sendAnswerToServer(questions[currentQuestion]?.id, answer);
    };

    const sendAnswerToServer = async (questionId, answerText) => {
        try {
            // Serverga javob yuborish
            await $API.post(`/questions/answer/`, null, {
                params: {
                    user_id,
                    question_id: questionId,
                    answer: answerText,
                }
            });
            setTimeout(() => {
                handleNextQuestion(); // Keyingi savolga o'tish
            }, 1000);
        } catch (error) {
            console.error('Javobni jo\'natishda xatolik yuz berdi:', error);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerStatus(null);
        setTimeLeft(20);

        if (currentQuestion + 1 >= questions.length) {
            setQuizFinished(true);
            localStorage.setItem(`quiz_last_played_${user_id}`, new Date().toISOString());
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    if (!quizAvailable) {
        return navigate(`/${user_id}/${language}/Events_Page`);
    }

    // Test tugaganda ko'rsatish
    if (quizFinished) {
        return <QuizSuccess questions={questions} correctAnswers={correctAnswers} score={score}/>
    }

    // Agar savollar yo'q bo'lsa
    if (questions.length === 0) {
        return <div className="loading">{t("quiz.loading_quiz")}</div>;
    }

    return (
        <div className={`quiz-container`}>
            <div className="quiz_title">
                <h3>{t("quiz.Ball")}: {score}</h3>
                <h4>{t("quiz.question")}: {currentQuestion + 1} / {questions.length}</h4>
            </div>

            <div className="quiz_box">
                <div className="quiz_question">
                    <Progress
                        type="circle"
                        percent={(timeLeft / 20) * 100}
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

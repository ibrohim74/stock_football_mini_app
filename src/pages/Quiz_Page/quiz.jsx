import React, {useState, useEffect} from 'react';
import {message, Progress} from 'antd';
import './quiz.css';
import {useNavigate, useParams} from "react-router-dom";
import ball from '../../assets/icons/soccer_ball.png'

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1500); // Vaqtni sekundda hisoblaymiz
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizAvailable, setQuizAvailable] = useState(true); // Testni ko'rsatish yoki ko'rsatmaslik uchun holat
    const [quizFinished, setQuizFinished] = useState(false); // Test tugaganligini belgilash uchun
    const [messageApi, contextHolder] = message.useMessage();

    const {user_id} = useParams();
    const navigate = useNavigate();
    const questions = [
        {
            question: '213?',
            answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correct: 2,
        },
        {
            question: '2 + 2?',
            answers: ['3', '4', '5', '6'],
            correct: 1,
        },
        {
            question: 'qwwqeqwe ?',
            answers: ['Green', 'Blue', 'Red', 'Yellow'],
            correct: 1,
        },
    ];

    // Foydalanuvchi oxirgi kirgan vaqti bilan hozirgi vaqtni solishtirish
    useEffect(() => {
        const lastPlayed = localStorage.getItem(`quiz_last_played_${user_id}`);
        if (lastPlayed) {
            const lastPlayedTime = new Date(lastPlayed).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastPlayedTime;

            // 24 soat = 24 * 60 * 60 * 1000 millisekund
            if (timeDifference < 24 * 60 * 60 * 1000) {
                messageApi.error('Siz testda qatnashgansiz. 24 soatdan keyin qayta kirishingiz mumkin.');
                setQuizAvailable(false);
            }
        }
    }, [user_id, messageApi]);

    useEffect(() => {
        if (timeLeft > 0 && quizAvailable && !quizFinished) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (timeLeft === 0) {
            handleNextQuestion(); // Vaqt tugaganda boshqa savolga o'tish
        }
    }, [timeLeft, quizAvailable, quizFinished]);

    const handleAnswerSelection = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        if (answerIndex === questions[currentQuestion].correct) {
            setScore(score + 100);
        }
        handleNextQuestion(); // Javob berilgandan so'ng darhol boshqa savolga o'tish
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setTimeLeft(15); // Timerni qayta tiklash

        // Agar so'nggi savolga kelgan bo'lsa
        if (currentQuestion + 1 >= questions.length) {
            messageApi.info(`Siz ${score} ball ishladingiz`);
            setQuizFinished(true); // Test tugadi deb belgilash

            // Bugungi kirgan vaqtini localStorage'ga saqlash
            localStorage.setItem(`quiz_last_played_${user_id}`, new Date().toISOString());

            // 3 soniyadan keyin yangi sahifaga o'tkazish
            setTimeout(() => {
                navigate(`/${user_id}/Events_Page`);
            }, 3000);
        } else {
            setCurrentQuestion(currentQuestion + 1); // Keyingi savolga o'tish
        }
    };

    // Agar 24 soat o'tmagan bo'lsa quiz ko'rsatilmasin
    if (!quizAvailable) {
        return (
            <div className="quiz-container quiz_end">
                <div className="quiz_end_score">
                    <h1><img loading={"lazy"} src={ball} alt="" width={25}/> {score}</h1>
                    Otgan oyinda toplagan ballaringiz
                </div>
                Siz 24 soatda faqat bir martda qatnashishingiz mumkin.
            </div>
        );
    }

    // Agar test tugagan bo'lsa, natijalarni ko'rsatamiz
    if (quizFinished) {
        return (
            <div className="quiz-container quiz_end">
                <div className="quiz_end_score">
                    <h1><img loading={"lazy"} src={ball} alt="" width={25}/> {score}</h1>
                    Otgan oyinda toplagan ballaringiz
                </div>
                Siz testni tugatdingiz.
            </div>
        );
    }

    return (
        <div className={`quiz-container`}>
            <div className="quiz_title">
                <h1>Savollar</h1>
                <h3>Score: {score}</h3>

            </div>

            <div className="quiz_box">
                <div className="quiz_question">
                    <Progress
                        type="circle"
                        percent={(timeLeft / 15) * 100}
                        format={() => `${timeLeft}s`}
                        strokeColor={timeLeft > 5 ? '#1890ff' : '#ff4d4f'}
                    />
                    <h2>{questions[currentQuestion].question} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Commodi neque officiis porro suscipit voluptates. Alias, beatae consectetur cum cupiditate
                        eligendi in maxime molestiae nobis, perspiciatis quam, quia ratione repudiandae. Autem doloribus
                        facilis minima nobis odio quos. Asperiores commodi consequuntur cum, eius facere fugit hic in
                        inventore ipsam modi natus, perspiciatis possimus provident quaerat quam qui sed sit tempora
                        veritatis voluptatem!</h2>
                </div>
            </div>

            {contextHolder}

            <form className={'quiz_form'}>
                {questions[currentQuestion].answers.map((answer, index) => (
                    <div key={index} className={"quiz_item"}>
                        <input
                            type="radio"
                            id={`answer-${index}`}
                            name="quiz-answer"
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => handleAnswerSelection(index)}
                        />
                        <label htmlFor={`answer-${index}`}>{answer}</label>
                    </div>
                ))}
            </form>


        </div>
    );
};

export default Quiz;

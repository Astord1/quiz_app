import React from "react"
import {useNavigate} from "react-router-dom";
import { nanoid } from 'nanoid';

import Question from "../components/Question";
import Form from "../components/Form";
import GradientBtn from "../components/GradientBtn";
import Loader from "../components/Loader";

import useDidMountEffect from "../hooks/useDidMountEffect";

export default function Quiz(){

    const [activeQuestion, setActiveQuestion] = React.useState(0)
    const [selectedAnswer, setSelectedAnswer] = React.useState("")
    const [result, setResult] = React.useState({
        correctAnswers: 0,
        wrongAnswers: 0
    })
    const [gameStarted, setGameStarted] = React.useState(false);
    const [questionElements, setQuestionElements] = React.useState(null);
    const [formData, setFormData] = React.useState({
        amount: 10,
        category: "any",
        difficulty: "any",
        type: "any",
    })

    const navigate = useNavigate()

    useDidMountEffect(() => {
        async function fetchData(){
            try{
                console.log(formData)
                const res = await fetch(`https://opentdb.com/api.php?amount=${formData.amount}
                ${formData.category === "any"? "" : `&category=${formData.category}`}
                ${formData.difficulty === "any" ? "" : `&difficulty=${formData.difficulty}`}
                ${formData.type === "any" ? "" : `&type=${formData.type}`}
                `.replace(/\s/g, '' ));
                const data = await res.json();
                return data.results
            }catch(error){
                navigate("/error")
            }
        }

        fetchData().then(questions => {
            if(questions.length === 0){
                navigate("/error")
            }
            setQuestionElements(
                questions.map(question => {
                    return (
                        <Question
                            key = {nanoid()}
                            question = {question}
                            selectAnswer = {selectAnswer}
                        />
                    )
                })
            )
        })
    }, [gameStarted])

    function newQuiz(){
        setResult({
            correctAnswers: 0,
            wrongAnswers: 0
        })
        setActiveQuestion(0)
        setGameStarted(false)
        setQuestionElements(null)
    }

    
    function selectAnswer(answer, correctAns){
        console.log(answer, correctAns)
        answer === correctAns ? setSelectedAnswer(true) : setSelectedAnswer(false)
    }

    function nextQuestion(){
        if(selectedAnswer){
            setResult(prevState => {
                return{
                    ...prevState,
                    correctAnswers: prevState.correctAnswers + 1
                }
            })
        }else{
            setResult(prevState => {
                return{
                    ...prevState,
                    wrongAnswers: prevState.wrongAnswers + 1
                }
            })
        }
        setActiveQuestion(prevState => prevState + 1)
    }   

    if(!gameStarted){
        return(
            <main className = "quiz-container">
                <Form 
                    formData = {formData}
                    setFormData = {setFormData}
                    setGameStarted={setGameStarted}
                />
            </main>
        )
    }else{
        if(questionElements){
            if(activeQuestion === questionElements.length){
                return (
                <main className="quiz-container quiz-container--started quiz-container--end">
                    <h1 className ="title">Results</h1>
                    <h3 className = "result">Total questions: {activeQuestion}</h3>
                    <h3 className = "result">Score: {Math.floor(result.correctAnswers / activeQuestion * 100)}%</h3>
                    <h3 className = "result">Correct answers: {result.correctAnswers}</h3>
                    <h3 className = "result">Wrong answers: {result.wrongAnswers}</h3>
                    <GradientBtn onClick={newQuiz}>New Quiz</GradientBtn>
                </main>
                )
            }else{
                return(
                    <main className="quiz-container quiz-container--started">
                        {questionElements[activeQuestion]}
                        <GradientBtn onClick={nextQuestion}>Next</GradientBtn>
                    </main>
                )
            }
        }else{
            return(
                <main className="quiz-container quiz-container--started">
                    <Loader />
                </main>
            )
        }
    }
}
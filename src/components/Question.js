import shuffle from "../utils/shuffle";
import { nanoid } from 'nanoid';
import React from "react"
import he from "he";

export default function Question({question, selectAnswer}){
    const [selected, setSelected] = React.useState(null);
    const [answersArray, setAnswersArray] = React.useState(shuffle([...question.incorrect_answers, question.correct_answer]))


    function handleClick(e, answer){
        console.log(answer, question.correct_answer)
        selectAnswer(answer, question.correct_answer)
        setSelected(answer)
    }

    return(
        <div className="question">
            <h2 className="question__body">{he.decode(question.question)}</h2>
            <ul className = "question__answers">
                {answersArray.map(
                    answer => {
                        return (
                                <li 
                                    key = {nanoid()} 
                                    onClick = {(e) => handleClick(e, answer)}
                                    className = {selected === answer ? `question__answer question__answer--selected` : "question__answer"}
                                >
                                    {he.decode(answer)}
                                </li>
                        )
                    }
                )}
            </ul>
        </div>
)
}
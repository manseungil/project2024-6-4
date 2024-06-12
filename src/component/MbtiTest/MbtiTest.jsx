import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../../api/alert';
import './MbtiTest.css';
import { options, questionsMBTI } from "./TestForm";

function Question({ question, options, onAnswer }) {
    //const [selectedOption, setSelectedOption] = useState('');

    const handleNextQuestion = (option) => {
        //그렇다를 누르면 Yes를 반환, 아니면 No를 반환 근데 Yes 처리가 안됨
        if(option === '그렇다') {
            onAnswer(question.YES);
        } else onAnswer(question.No);

        console.log(option === '그렇다')
        console.log(options)
        console.log(question.question)
        console.log(question.YES)
        console.log(question.No)
    };

    // const handleOptionChange = (e) => {
    //     setSelectedOption(e);
    // }

    return (
        <div className='form'>
            <h2 className='h2'>{question.question}</h2>
            <div>
                {options.map((option) => (
                    <div key={option}>
                        <button
                            type="button"
                            value={option}
                            onClick={() => {//handleOptionChange(option); 
                                handleNextQuestion(option);}
                            }
                            className='input'
                        >
                            {option}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const MbtiTest = () => {
    const [answers, setAnswers] = useState([]);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
        console.log('answers', answers);

        if (index < questionsMBTI.length) {
            setIndex(index + 1);
        } else {
            const mbtiType = calculateMBTIType(answer);
            Swal.alert(`당신의 MBTI는 ${mbtiType} 입니다.`, "수고하셨습니다.", "success", () => { navigate("/") });
        }
    };

    const calculateMBTIType = (answers) => {
        const dimensionCounts = {
            E: 0,
            I: 0,
            S: 0,
            N: 0,
            T: 0,
            F: 0,
            J: 0,
            P: 0,
        };
        answers.forEach((char) => {
            dimensionCounts[char]++;
        });
        const mbtiType = [
            dimensionCounts['E'] > dimensionCounts['I'] ? 'E' : 'I',
            dimensionCounts['S'] > dimensionCounts['N'] ? 'S' : 'N',
            dimensionCounts['T'] > dimensionCounts['F'] ? 'T' : 'F',
            dimensionCounts['J'] > dimensionCounts['P'] ? 'J' : 'P',
        ].join('');

        console.log('answer', answers);
        console.log('Your MBTI Type:', mbtiType);
        return mbtiType;
    };

    return (
        <div>
            <div>
                {index < questionsMBTI.length ?
                    <Question
                        question={questionsMBTI[index]}
                        options={options[0].options}
                        onAnswer={handleAnswer}
                    />
                    :
                    <div>
                        <p className='finishp'>수고하셨습니다😊</p>
                        <button className='finish' onClick={() => Swal.alert(`당신의 MBTI는 ${calculateMBTIType(answers)} 입니다.`, "수고하셨습니다.", "success", () => { navigate("/") })}>
                            결과보기👉
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default MbtiTest;

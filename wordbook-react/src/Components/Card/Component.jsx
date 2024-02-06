import { useEffect, useState } from "react";
import axios from "axios";
import { Button, FullButton } from "../Button/Component";
import { Input } from "../Input/Component";
import { SectionTitle } from "../Typo/Component";
import "./Style.css";

const Card = ({ title = "", subTitle = "", content = <></> }) => {
    return (
        <div className="cardComp">
            <div className="cardHeaderWrap">
                <div className="cardTitleWrap">{title}</div>
                <div className="cardSubTitleWrap">{subTitle}</div>
            </div>
            <div className="cardContentWrap">{content}</div>
        </div>
    );
};

const WordCard = ({ type = "", question = "", answer = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const listen = (word) => {
        const msg = new SpeechSynthesisUtterance(word);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
        msg.voiceURI = "native";
        msg.lang = "en-US";
        msg.volume = 10;
        window.speechSynthesis.speak(msg);
    };
    useEffect(() => {
        setIsVisible(false);
    }, [question]);
    return (
        <div className="wordCardComp">
            <div className="cardHeaderWrap">
                <div className="cardQuestion">{question}</div>
                {type === "mean" && (
                    <Button
                        text="듣기"
                        variant="outline"
                        func={() => {
                            listen(question);
                        }}
                    />
                )}
            </div>
            <div className="cardFooterWrap">
                {isVisible ? (
                    <div className="cardAnswer">{answer}</div>
                ) : (
                    <p></p>
                )}
                <div className="cardFuncWrap">
                    {type === "word" && isVisible && (
                        <Button
                            text="듣기"
                            variant="outline"
                            func={() => {
                                listen(answer);
                            }}
                        />
                    )}
                    <Button
                        text={isVisible ? "숨기기" : "보기"}
                        variant="outline"
                        func={() => {
                            setIsVisible(!isVisible);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const ExamCard = ({
    index = 0,
    data = [],
    result = [],
    setResult = () => {},
}) => {
    const [answer, setAnswer] = useState("");
    useEffect(() => {
        let isCorrect = false;
        if (index % 2 === 0) {
            if (
                data.mean !== "" &&
                data.mean !== " " &&
                data.mean.includes(answer)
            ) {
                isCorrect = true;
            } else {
                isCorrect = false;
            }
        } else {
            if (answer === data.word) {
                isCorrect = true;
            } else {
                isCorrect = false;
            }
        }
        let temp = result;
        temp[index] = {
            ...data,
            answer: answer,
            isCorrect: isCorrect,
            type: index % 2 === 0 ? "mean" : "word",
        };
        setResult(temp);
    }, [answer]);
    return (
        <div className="wordCardComp">
            <div className="cardHeaderWrap">
                <div className="cardQuestion">
                    {index % 2 === 0 ? data.word : data.mean}
                </div>
            </div>
            <div className="cardFooterWrap">
                <Input
                    placeholder={
                        index % 2 === 0
                            ? "뜻을 입력하세요."
                            : "단어를 입력하세요."
                    }
                    func={(v) => {
                        setAnswer(v);
                    }}
                />
            </div>
        </div>
    );
};

const ExamResultCard = ({
    data = { word: "", mean: "", answer: "", isCorrect: 0 },
}) => {
    const listen = (word) => {
        const msg = new SpeechSynthesisUtterance(word);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1]; // Note: some voices don't support altering params
        msg.voiceURI = "native";
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
    };
    return (
        <div
            className={
                data.isCorrect
                    ? "examResultCardComp correct"
                    : "examResultCardComp incorrect"
            }
        >
            <div className="cardHeaderWrap">
                <div className="cardWordWrap">{data.word}</div>
                <div className="cardMeanWrap">{data.mean}</div>
            </div>
            {!data.isCorrect && (
                <div className="cardInputWrap">
                    <SectionTitle text="사용자 입력" />
                    <div className="cardUserInput">{data.answer}</div>
                </div>
            )}
            <div className="cardFooterWrap">
                <Button
                    text="듣기"
                    variant="outline"
                    func={() => {
                        listen(data.word);
                    }}
                />
            </div>
        </div>
    );
};

const QuizCard = ({
    type = [],
    data = { wordId: 0, word: "", mean: "" },
    index = 0,
    setIndex = () => {},
}) => {
    const ENDPOINT = process.env.REACT_APP_API_END_POINT;
    const [question, setQuestion] = useState("");
    const [answerList, setAnswerList] = useState([]);
    const [answerIdx, setAnswerIdx] = useState(-1);
    const [selAnswer, setSelAnswer] = useState(-2);
    const listen = (word) => {
        const msg = new SpeechSynthesisUtterance(word);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
        msg.voiceURI = "native";
        msg.lang = "en-US";
        msg.volume = 10;
        window.speechSynthesis.speak(msg);
    };
    const getAnswers = async () => {
        let answer = "";
        let url = "";
        let body = {
            word: "",
            mean: "",
        };
        if (type.length === 2) {
            if (index % 2 === 0) {
                url = ENDPOINT + "quiz/read/word";
                setQuestion(data.mean);
                answer = data.word;
                body.word = data.word;
            } else {
                url = ENDPOINT + "quiz/read/mean";
                setQuestion(data.word);
                answer = data.mean;
                body.mean = data.mean;
            }
        } else {
            if (type[0] === "단어") {
                url = ENDPOINT + "quiz/read/word";
                setQuestion(data.mean);
                answer = data.word;
                body.word = data.word;
            } else {
                url = ENDPOINT + "quiz/read/mean";
                setQuestion(data.word);
                answer = data.mean;
                body.mean = data.mean;
            }
        }
        const response = await axios.post(url, body);
        let results = [answer];
        response.data.forEach((word) => {
            if (word.word) {
                results.push(word.word);
            } else {
                results.push(word.mean);
            }
        });
        results.sort(() => Math.random() - 0.5);
        setAnswerList(results);
        setAnswerIdx(results.indexOf(answer));
    };
    const checkAnswer = (idx) => {
        setSelAnswer(idx);
    };
    useEffect(() => {
        getAnswers();
    }, []);
    useEffect(() => {
        if (selAnswer === answerIdx) {
            listen(data.word);
            setIndex(index + 1);
        } else {
            if (selAnswer !== -2) {
                window.alert("오답입니다.");
            }
        }
    }, [selAnswer]);
    return (
        <div className="quizCardComp">
            <div className="cardHeaderWrap">
                <div className="cardQuestion">{question}</div>
            </div>
            <div className="cardContentWrap">
                {answerList.map((answer, idx) => (
                    <FullButton
                        text={answer}
                        variant="outline"
                        func={() => {
                            checkAnswer(idx);
                        }}
                        key={"answerBtn" + idx}
                    />
                ))}
            </div>
        </div>
    );
};

export { Card, WordCard, ExamCard, ExamResultCard, QuizCard };

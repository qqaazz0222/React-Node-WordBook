import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Title, SectionTitle } from "./../../Components/Typo/Component";
import { FullButton } from "../../Components/Button/Component";
import { Card, QuizCard } from "../../Components/Card/Component";
import { PopupBackground, Popup } from "../../Components/Popup/Component";
import { Loading, LoadingBackground } from "../../Components/Loading/Component";
import axios from "axios";
import "./Style.css";

const ENDPOINT = process.env.REACT_APP_API_END_POINT;

const Quiz = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [typeList, setTypeList] = useState([]);
    const [lectureList, setLectureList] = useState([]);
    const [wordList, setWordList] = useState([]);
    const submitSetting = async () => {
        if (typeList.length !== 0 && lectureList.length !== 0) {
            setLoadingMsg("단어 불러오는 중");
            setIsLoading(true);
            await getWords();
            setIsLoading(false);
        }
    };
    const getWords = async () => {
        const response = await axios.post(ENDPOINT + "exam/read/word", {
            lectureList: lectureList,
        });
        setWordList(response.data);

        return response.data;
    };
    return (
        <div id="quizPage">
            <div className="pageHeader">
                <Title text="퀴즈" />
            </div>
            <div className="pageContent">
                {wordList.length !== 0 ? (
                    <QuizProcess type={typeList} data={wordList} />
                ) : (
                    <Card
                        title="퀴즈 설정"
                        subTitle="퀴즈 타입과 범위를 선택하세요."
                        content={
                            <div className="quizSettingWrap">
                                <div className="quizSettingSectionWrap">
                                    <SectionTitle text="퀴즈 타입" />
                                    <QuizType
                                        type={(t) => {
                                            setTypeList(t);
                                        }}
                                    />
                                </div>
                                <div className="quizSettingSectionWrap">
                                    <SectionTitle text="퀴즈 범위" />
                                    <QuizRange
                                        range={(r) => {
                                            setLectureList(r);
                                        }}
                                    />
                                </div>
                                <FullButton
                                    text="선택 완료"
                                    func={submitSetting}
                                />
                            </div>
                        }
                    />
                )}
            </div>
            {isLoading && (
                <>
                    <LoadingBackground />
                    <Loading title={loadingMsg} />
                </>
            )}
        </div>
    );
};

const QuizType = ({ type = () => {} }) => {
    const [typeList, setTypeList] = useState(["단어", "뜻"]);
    const [selTypeList, setSelTypeList] = useState([]);
    const getCheckType = () => {
        const checkOption = document.querySelectorAll(
            'input[name="types"]:checked'
        );
        let result = [];
        checkOption.forEach((el) => {
            result.push(el.value);
        });
        setSelTypeList(result);
    };
    useEffect(() => {
        type(selTypeList);
    }, [selTypeList]);
    return (
        <div id="quizRangeComp">
            <form
                className="quizLecuterSelectWrap"
                onChange={() => {
                    getCheckType();
                }}
            >
                {typeList.map((type, idx) => (
                    <div className="quizLecutreOption" key={"optionType" + idx}>
                        <input
                            type="checkbox"
                            name="types"
                            id={"type" + type}
                            value={type}
                        />
                        <label htmlFor={"type" + type}>{type}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};

const QuizRange = ({ range = () => {} }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [lectureList, setLectureList] = useState([]);
    const [selLectureList, setSelLectureList] = useState([]);
    const getLectures = async () => {
        setLoadingMsg("강의 불러오는 중");
        setIsLoading(true);
        const response = await axios.get(ENDPOINT + "lecture/read");
        setLectureList(response.data);
        setIsLoading(false);
        return response.data;
    };
    const getCheckLecutre = () => {
        const checkOption = document.querySelectorAll(
            'input[name="lectures"]:checked'
        );
        let result = [];
        checkOption.forEach((el) => {
            result.push(el.value);
        });
        setSelLectureList(result);
    };
    useEffect(() => {
        getLectures();
    }, []);
    useEffect(() => {
        range(selLectureList);
    }, [selLectureList]);
    return (
        <div id="quizRangeComp">
            <form
                className="quizLecuterSelectWrap"
                onChange={() => {
                    getCheckLecutre();
                }}
            >
                {lectureList.map((lecture, idx) => (
                    <div
                        className="quizLecutreOption"
                        key={"optionLecture" + idx}
                    >
                        <input
                            type="checkbox"
                            name="lectures"
                            id={"lecture" + lecture}
                            value={lecture}
                        />
                        <label htmlFor={"lecture" + lecture}>{lecture}강</label>
                    </div>
                ))}
            </form>
            {isLoading && (
                <>
                    <LoadingBackground />
                    <Loading title={loadingMsg} />
                </>
            )}
        </div>
    );
};

const QuizProcess = ({ type = [], data = [] }) => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [isFinish, setIsFinish] = useState(false);
    useEffect(() => {
        if (index >= data.length) {
            setIsFinish(true);
        }
    }, [index]);
    return (
        <div id="quizProcessWrap">
            {isFinish ? (
                <>
                    <PopupBackground />
                    <Popup
                        title="퀴즈가 종료되었습니다."
                        content="다시 응시하시겠습니까?"
                        text1="홈으로"
                        text2="응시하기"
                        func1={() => {
                            navigate("/");
                        }}
                        func2={() => {
                            window.location.reload();
                        }}
                    />
                </>
            ) : (
                <QuizCard
                    type={type}
                    data={data[index]}
                    index={index}
                    setIndex={(i) => {
                        setIndex(i);
                    }}
                    key={"quiz" + index}
                />
            )}
        </div>
    );
};

export default Quiz;

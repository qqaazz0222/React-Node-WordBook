import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ExamCard } from "../../Components/Card/Component";
import { FullButton } from "../../Components/Button/Component";
import { SubTitle, Title } from "../../Components/Typo/Component";
import { Popup, PopupBackground } from "../../Components/Popup/Component";
import axios from "axios";
import "./Style.css";

const ENDPOINT = process.env.REACT_APP_API_END_POINT;

const Exam = () => {
    const navigate = useNavigate();
    const [lectureList, setLectureList] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [result, setResult] = useState([]);
    const [isFinish, setIsFinish] = useState(false);
    const getWords = async () => {
        const response = await axios.post(ENDPOINT + "exam/read/word", {
            lectureList: lectureList,
        });
        setWordList(response.data);
        return response.data;
    };
    const submitExam = async () => {
        const response = await axios.post(ENDPOINT + "exam/create/result", {
            range: lectureList.join(", "),
            results: result,
        });
        // return response.data;
        setIsFinish(true);
    };
    useEffect(() => {
        if (lectureList.length !== 0) {
            console.log("Exam", lectureList);
            getWords();
        }
    }, [lectureList]);
    return (
        <div id="examPage">
            {lectureList.length === 0 ? (
                <>
                    <Card
                        title="강의 선택하기"
                        subTitle="시험볼 강의를 선택하세요."
                        content={
                            <ExamRange
                                range={(r) => {
                                    setLectureList(r);
                                }}
                            />
                        }
                    />
                </>
            ) : (
                <>
                    <div className="pageHeaderWrap">
                        <Title text="단어 시험" />
                        <SubTitle text={lectureList.join(", ") + "강"} />
                    </div>
                    <div className="pageContentWrap">
                        {wordList.map((word, idx) => (
                            <>
                                <ExamCard
                                    index={idx}
                                    data={word}
                                    result={result}
                                    setResult={(r) => {
                                        setResult(r);
                                    }}
                                />
                            </>
                        ))}
                    </div>
                    <FullButton text="제출하기" func={submitExam} />
                </>
            )}
            {isFinish && (
                <>
                    <PopupBackground />
                    <Popup
                        title="제출되었습니다."
                        content="결과는 기록에서 확인할 수 있습니다."
                        text1="홈으로"
                        text2="결과 확인"
                        func1={() => {
                            navigate("/");
                        }}
                        func2={() => {
                            navigate("/exam/result");
                        }}
                    />
                </>
            )}
        </div>
    );
};

const ExamRange = ({ range = () => {} }) => {
    const [lectureList, setLectureList] = useState([]);
    const [selLectureList, setSelLectureList] = useState([]);
    const getLectures = async () => {
        const response = await axios.get(ENDPOINT + "lecture/read");
        setLectureList(response.data);
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
    const submit = () => {
        if (selLectureList.length === 0) {
            window.alert("강의를 선택하세요.");
        } else {
            range(selLectureList);
        }
    };
    useEffect(() => {
        getLectures();
    }, []);
    return (
        <div id="examRangeComp">
            <form
                className="examLecuterSelectWrap"
                onChange={() => {
                    getCheckLecutre();
                }}
            >
                {lectureList.map((lecture, idx) => (
                    <div className="examLecutreOption" key={"option" + idx}>
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
            <FullButton
                text="선택 완료"
                func={() => {
                    submit();
                }}
            />
        </div>
    );
};

export default Exam;

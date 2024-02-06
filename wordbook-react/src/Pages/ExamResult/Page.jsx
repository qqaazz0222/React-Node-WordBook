import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ExamResultCard } from "../../Components/Card/Component";
import { FullButton } from "../../Components/Button/Component";
import { SubTitle, Title } from "../../Components/Typo/Component";
import { Loading, LoadingBackground } from "../../Components/Loading/Component";
import axios from "axios";
import "./Style.css";

const ENDPOINT = process.env.REACT_APP_API_END_POINT;

const ExamResult = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [examList, setExamList] = useState([]);
    const [selExam, setSelExam] = useState(-1);
    const [wordList, setWordList] = useState([]);
    const getExamResults = async () => {
        setLoadingMsg("목록 불러오는 중");
        setIsLoading(true);
        const response = await axios.get(ENDPOINT + "exam/read/results");
        setExamList(response.data);
        setIsLoading(false);
    };
    const getExamResult = async (examId) => {
        setLoadingMsg("결과 불러오는 중");
        setIsLoading(true);
        const response = await axios.get(
            ENDPOINT + "exam/read/result/" + examId
        );
        setWordList(response.data);
        setIsLoading(false);
    };
    useEffect(() => {
        getExamResults();
    }, []);
    useEffect(() => {
        if (selExam !== -1) {
            getExamResult(examList[selExam].examId);
        }
    }, [selExam]);
    return (
        <div id="examPage">
            {selExam === -1 ? (
                <>
                    <div className="pageHeaderWrap">
                        <Title text="단어 시험 결과" />
                    </div>
                    <div className="pageContentWrap">
                        {examList.length === 0 ? (
                            <div className="noListWrap">
                                <div className="titleWrap">
                                    아직 응시한 시험이 없습니다.
                                </div>

                                <FullButton
                                    text="시험보기"
                                    variant="outline"
                                    func={() => {
                                        navigate("/exam");
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                {examList.map((exam, idx) => (
                                    <Card
                                        title={exam.examId + "번째 시험"}
                                        subTitle={exam.created + "응시"}
                                        content={
                                            <>
                                                <FullButton
                                                    text="자세히 보기"
                                                    variant="outline"
                                                    func={() => {
                                                        setSelExam(idx);
                                                    }}
                                                />
                                            </>
                                        }
                                        key={"exam" + idx}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="pageHeaderWrap">
                        <Title text={examList[selExam].examId + "번째 시험"} />
                        <SubTitle text={examList[selExam].created + "응시"} />
                    </div>
                    <div className="pageContentWrap">
                        {wordList.map((word, idx) => (
                            <ExamResultCard data={word} />
                        ))}
                    </div>
                </>
            )}
            {isLoading && (
                <>
                    <LoadingBackground />
                    <Loading title={loadingMsg} />
                </>
            )}
        </div>
    );
};

export default ExamResult;

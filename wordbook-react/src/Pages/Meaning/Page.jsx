import { useEffect, useState } from "react";
import { Select } from "../../Components/Select/Component";
import { WordCard } from "../../Components/Card/Component";
import { Title } from "../../Components/Typo/Component";
import { Loading, LoadingBackground } from "../../Components/Loading/Component";
import axios from "axios";
import "./Style.css";

const ENDPOINT = process.env.REACT_APP_API_END_POINT;

const Meaning = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [lectureList, setLectureList] = useState([]);
    const [lecture, setLecture] = useState(0);
    const [wordList, setWordList] = useState([]);
    const getLectures = async () => {
        setLoadingMsg("강의 불러오는 중");
        setIsLoading(true);
        const response = await axios.get(ENDPOINT + "lecture/read");
        setLectureList(response.data);
        setIsLoading(false);
        return response.data;
    };
    const getWords = async (lecture) => {
        setLoadingMsg("단어 불러오는 중");
        setIsLoading(true);
        const response = await axios.get(
            ENDPOINT + "word/read/lecture/" + lecture
        );
        setWordList(response.data);
        setIsLoading(false);
        return response.data;
    };
    useEffect(() => {
        getLectures();
    }, []);
    useEffect(() => {
        if (lecture !== 0) {
            getWords(lecture);
        }
    }, [lecture]);
    return (
        <div id="meaningPage">
            <div className="pageHeaderWrap">
                <Title text="뜻 외우기" />
                <Select
                    placeholder="강의 번호를 선택하세요."
                    options={lectureList}
                    value={(v) => {
                        setLecture(v);
                    }}
                />
            </div>
            <div className="pageContentWrap">
                {wordList.map((word, idx) => (
                    <WordCard
                        type="mean"
                        question={word.word}
                        answer={word.mean}
                    />
                ))}
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

export default Meaning;

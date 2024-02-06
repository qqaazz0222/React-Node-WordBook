import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./../../Components/Card/Component";
import { Table } from "./../../Components/Table/Component";
import { FullButton } from "../../Components/Button/Component";
import { Loading, LoadingBackground } from "../../Components/Loading/Component";
import axios from "axios";
import "./Style.css";

const ENDPOINT = process.env.REACT_APP_API_END_POINT;

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [lectureList, setLectureList] = useState([]);
    const [wordList, setWordList] = useState([]);

    const getLectures = async () => {
        setIsLoading(true);
        const response = await axios.get(ENDPOINT + "lecture/read");
        setLectureList(response.data);
        return response.data;
    };
    const getWords = async (lectures) => {
        let words = [];
        for (let i = 0; i < lectures.length; i++) {
            let temp = {
                lectureId: lectures[i],
                words: [],
            };
            const response = await axios.get(
                ENDPOINT + "word/read/lecture/" + lectures[i]
            );
            temp.words = response.data;
            words.push(temp);
        }
        setIsLoading(false);
        return words;
    };
    const init = async () => {
        const lectures = await getLectures();
        const words = await getWords(lectures);
        setWordList(words);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <div id="mainPage">
            <div className="pageHeaderWrap">
                <FullButton
                    text="단어 추가하기"
                    func={() => {
                        navigate("/add");
                    }}
                />
            </div>
            <div className="pageContentWrap">
                {wordList.map((item, idx) => (
                    <Card
                        title={item.lectureId + "강"}
                        content={
                            <Table
                                tHead={["단어", "뜻", "듣기"]}
                                tBody={item.words}
                            />
                        }
                        key={"card" + idx}
                    />
                ))}
            </div>
            {isLoading && (
                <>
                    <LoadingBackground />
                    <Loading title="단어 불러오는 중" />
                </>
            )}
        </div>
    );
};

export default Main;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, TextArea } from "../../Components/Input/Component";
import { Title, SectionTitle } from "../../Components/Typo/Component";
import { FullButton } from "../../Components/Button/Component";
import { Popup, PopupBackground } from "../../Components/Popup/Component";
import axios from "axios";
import "./Style.css";

const ENDPOINT = process.env.REACT_APP_API_END_POINT;

const Add = () => {
    const navigate = useNavigate();
    const [lecture, setLecture] = useState(0);
    const [wordString, setWordString] = useState("");
    const [isPopup, setIsPopup] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const addWords = async () => {
        if (lecture === 0) {
            window.alert("강의 번호를 입력하세요.");
        } else {
            setIsSaving(true);
            const words = wordString.split(";");
            let body = {
                lectureId: lecture,
                words: [],
                means: [],
            };
            words.forEach((word, idx) => {
                if (word !== "") {
                    console.log(word);
                    let temp = word.split("/");
                    temp[0].replace(/\n/g, "");
                    temp[0].trimStart();
                    temp[0].trimEnd();
                    temp[1].replace(/\n/g, "");
                    temp[1].trimStart();
                    temp[1].trimEnd();
                    body.words.push(temp[0]);
                    body.means.push(temp[1]);
                }
            });
            const response = await axios.post(
                ENDPOINT + "word/create/many",
                body
            );
            if (response.data.status === 200) {
                setIsPopup(true);
            } else {
                window.alert(response.data.msg);
            }
        }
    };
    const addMore = () => {
        window.location.reload();
    };
    const goHome = () => {
        navigate("/");
    };
    return (
        <div id="addPage">
            <Title text="단어 추가하기" />
            <SectionTitle text="강의 번호" />
            <Input
                type="number"
                placeholder="강의 번호를 입력하세요."
                func={(e) => setLecture(e)}
            />
            <SectionTitle text="단어 입력" />
            <TextArea
                type="text"
                placeholder="ex)단어1/뜻1;단어2/뜻2;...형식으로 입력하세요."
                func={(e) => setWordString(e)}
            />
            {isSaving ? (
                <FullButton variant="loading" text="단어 등록중" />
            ) : (
                <FullButton variant="primary" text="등록하기" func={addWords} />
            )}

            {isPopup && (
                <>
                    <PopupBackground />
                    <Popup
                        title="단어를 추가했습니다."
                        content="더 추가하실 단어가 있으신가요?"
                        text1="홈으로"
                        text2="더 추가하기"
                        func1={goHome}
                        func2={addMore}
                    />
                </>
            )}
        </div>
    );
};

export default Add;

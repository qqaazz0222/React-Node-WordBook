import { Button } from "../Button/Component";
import "./Style.css";

const Table = ({ tHead = [], tBody = [] }) => {
    const listen = (word) => {
        const msg = new SpeechSynthesisUtterance(word);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1]; // Note: some voices don't support altering params
        msg.voiceURI = "native";
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
    };
    return (
        <div className="tableComp">
            <div className="tableHeaderWrap">
                {tHead.map((item, idx) => (
                    <div className="tableData" key={"tHead" + idx}>
                        {item}
                    </div>
                ))}
            </div>
            <div className="tableBodyWrap">
                {tBody.map((item, idx) => (
                    <div className="tableRowWrap">
                        <div className="tableData">{item.word}</div>
                        <div className="tableData">{item.mean}</div>
                        <div className="tableData">
                            <Button
                                text="듣기"
                                variant="outline"
                                func={() => {
                                    listen(item.word);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Table };

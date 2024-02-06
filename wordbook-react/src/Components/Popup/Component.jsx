import { Button } from "../Button/Component";
import "./Style.css";

const Popup = ({
    title = "",
    content = "",
    text1 = "",
    text2 = "",
    func1 = () => {},
    func2 = () => {},
}) => {
    return (
        <div className="popupComp">
            <div className="popupHeaderWrap">
                <div className="popupTitle">{title}</div>
            </div>
            <div className="popupContentWrap">
                <div className="popupContent">{content}</div>
            </div>
            <div className="popupFooterWrap">
                <Button variant="outline" text={text1} func={func1} />
                <Button variant="primary" text={text2} func={func2} />
            </div>
        </div>
    );
};

const PopupBackground = () => {
    return <div className="popupBackgroundComp"></div>;
};

export { Popup, PopupBackground };

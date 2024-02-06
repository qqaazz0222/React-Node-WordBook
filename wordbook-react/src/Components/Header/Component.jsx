import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FullButton } from "../Button/Component";
import "./Style.css";

const Header = () => {
    const navigate = useNavigate();
    const menuBgRef = useRef();
    const menuRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const switchVisible = () => {
        if (isVisible) {
            menuBgRef.current.style.animationName = "fadeOut";
            menuRef.current.style.animationName = "slideOut";
            setTimeout(() => {
                setIsVisible(false);
            }, 500);
        } else {
            setIsVisible(true);
        }
    };
    const goLink = (link) => {
        navigate(link);
        menuBgRef.current.style.animationName = "fadeOut";
        menuRef.current.style.animationName = "slideOut";
        setTimeout(() => {
            setIsVisible(false);
        }, 500);
    };
    return (
        <div id="headerComp">
            <div className="leftWrap">
                <a className="logoWrap" href="/">
                    단어장
                </a>
                <div className="navWrap">
                    <Button
                        text="단어 외우기"
                        variant="link"
                        func={() => {
                            navigate("/word");
                        }}
                    />
                    <Button
                        text="뜻 외우기"
                        variant="link"
                        func={() => {
                            navigate("/meaning");
                        }}
                    />
                    <Button
                        text="퀴즈"
                        variant="link"
                        func={() => {
                            navigate("/quiz");
                        }}
                    />
                    <Button
                        text="기록"
                        variant="link"
                        func={() => {
                            navigate("/exam/result");
                        }}
                    />
                </div>
            </div>
            <div className="rightWrap">
                <Button
                    text="시험보기"
                    variant="primary"
                    func={() => {
                        navigate("/exam");
                    }}
                />
            </div>
            <div className="mobileWrap">
                <Button
                    text={isVisible ? "닫기" : "메뉴"}
                    variant="primary"
                    func={() => {
                        switchVisible();
                    }}
                />
            </div>
            {isVisible && (
                <>
                    <div className="menuBackgorundWrap" ref={menuBgRef}></div>
                    <div className="menuWrap" ref={menuRef}>
                        <FullButton
                            text="단어 외우기"
                            variant="link"
                            func={() => {
                                goLink("/word");
                            }}
                        />
                        <FullButton
                            text="뜻 외우기"
                            variant="link"
                            func={() => {
                                goLink("/meaning");
                            }}
                        />
                        <FullButton
                            text="퀴즈"
                            variant="link"
                            func={() => {
                                goLink("/quiz");
                            }}
                        />
                        <FullButton
                            text="기록"
                            variant="link"
                            func={() => {
                                goLink("/exam/result");
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;

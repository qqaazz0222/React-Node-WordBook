import "./Style.css";

const Button = ({ text = "", func = () => {}, variant = "primary" }) => {
    return (
        <button className={"button " + variant} onClick={func}>
            <span>{text}</span>
        </button>
    );
};

const FullButton = ({ text = "", func = () => {}, variant = "primary" }) => {
    return (
        <button className={"button fullButton " + variant} onClick={func}>
            <span>{text}</span>
        </button>
    );
};

export { Button, FullButton };

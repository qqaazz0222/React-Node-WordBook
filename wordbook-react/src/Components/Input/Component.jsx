import "./Style.css";

const Input = ({ type = "text", placeholder = "", func = () => {} }) => {
    return (
        <input
            className="inputComp"
            type={type}
            placeholder={placeholder}
            min={1}
            onChange={(e) => {
                func(e.target.value);
            }}
        />
    );
};

const TextArea = ({ placeholder = "", func = () => {} }) => {
    return (
        <textarea
            className="textAreaComp"
            placeholder={placeholder}
            rows={20}
            onChange={(e) => {
                func(e.target.value);
            }}
        />
    );
};

export { Input, TextArea };

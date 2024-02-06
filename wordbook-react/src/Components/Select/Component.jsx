import "./Style.css";

const Select = ({ placeholder = "", options = [], value = () => {} }) => {
    return (
        <select
            className="selectComp"
            onChange={(e) => {
                value(e.target.value);
            }}
        >
            <option value="">{placeholder}</option>
            {options.map((option, idx) => (
                <option value={option} key={"opt" + idx}>
                    {option}강
                </option>
            ))}
        </select>
    );
};

export { Select };

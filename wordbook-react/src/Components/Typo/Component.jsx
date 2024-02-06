import "./Style.css";

const Title = ({ text = "" }) => {
    return <h1 className="titleComp">{text}</h1>;
};

const SubTitle = ({ text = "" }) => {
    return <h3 className="subTitleComp">{text}</h3>;
};

const SectionTitle = ({ text = "" }) => {
    return <p className="sectionTitleComp">{text}</p>;
};

export { Title, SubTitle, SectionTitle };

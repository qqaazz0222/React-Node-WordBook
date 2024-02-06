import "./Style.css";

const Loading = ({ title = "" }) => {
    return (
        <div className="loadingComp">
            <div className="loadingSpinnerWrap">
                <div className="spinner"></div>
            </div>
            <div className="loadingTitle">{title}</div>
        </div>
    );
};

const LoadingBackground = () => {
    return <div className="loadingBackgroundComp"></div>;
};

export { Loading, LoadingBackground };

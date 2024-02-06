import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout/Layout";
import Main from "./Pages/Main/Page";
import Add from "./Pages/Add/Page";
import Word from "./Pages/Word/Page";
import Meaning from "./Pages/Meaning/Page";
import Quiz from "./Pages/Quiz/Page";
import Exam from "./Pages/Exam/Page";
import ExamResult from "./Pages/ExamResult/Page";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<Main />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/word" element={<Word />} />
                        <Route path="/meaning" element={<Meaning />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/exam" element={<Exam />} />
                        <Route path="/exam/result" element={<ExamResult />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

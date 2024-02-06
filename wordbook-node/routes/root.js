const express = require("express");
const router = express.Router();
const pool = require("../bin/db");
const moment = require("moment");

router.get("/", function (req, res, next) {
    res.json({});
});

router.post("/word/create/one", async (req, res, next) => {
    try {
        const { lectureId, word, mean } = req.body;
        const response = await pool.query(
            "INSERT INTO word VALUES (null, ?, ?, ?, 0);",
            [lectureId, word, mean]
        );
        res.json({ status: 200, msg: "추가 성공" });
    } catch (error) {
        res.json({ status: 400, msg: "추가 실패" });
    }
});
router.post("/word/create/many", async (req, res, next) => {
    try {
        const { lectureId, words, means } = req.body;
        if (words.length === means.length) {
            for (let i = 0; i < words.length; i++) {
                const response = await pool.query(
                    "INSERT INTO word VALUES (null, ?, ?, ?, 0);",
                    [lectureId, words[i], means[i]]
                );
            }
        } else {
            res.json({ status: 400, msg: "추가 실패 (단어, 뜻 갯수 오류)" });
        }
        res.json({ status: 200, msg: "추가 성공" });
    } catch (error) {
        res.json({ status: 400, msg: "추가 실패" });
    }
});

router.post("/exam/create/result", async (req, res, next) => {
    const { range, results } = req.body;
    const now = moment().format("YYYY-MM-DD hh:mm:ss");
    try {
        const response1 = await pool.query(
            "INSERT INTO exam VALUES (null, ?, ?)",
            [range, now]
        );
        const examId = response1[0].insertId;
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const response2 = await pool.query(
                "INSERT INTO examDetail VALUES (null, ?, ?, ?, ?, ?, ?)",
                [
                    result.type,
                    result.word,
                    result.mean,
                    result.answer,
                    result.isCorrect,
                    examId,
                ]
            );
        }
        res.json({ status: 200, msg: "결고 등록 성공", examId: examId });
    } catch (error) {
        console.log(error);
        res.json({ status: 400, msg: "결고 등록 실패" });
    }
});

router.get("/word/read", async (req, res, next) => {
    const response = await pool.query("SELECT * FROM word;");
    res.json(response[0]);
});

router.get("/word/read/lecture/:lecture", async (req, res, next) => {
    const lecture = req.params.lecture;
    const response = await pool.query(
        "SELECT * FROM word WHERE lectureId = ?;",
        lecture
    );
    res.json(response[0]);
});

router.get("/lecture/read", async (req, res, next) => {
    const response = await pool.query(
        "SELECT DISTINCT lectureId FROM word ORDER BY lectureId DESC;"
    );
    let temp = [];
    response[0].forEach((data) => {
        temp.push(data.lectureId);
    });
    res.json(temp);
});

router.post("/quiz/read/word", async (req, res, next) => {
    const { word } = req.body;
    const response = await pool.query(
        "SELECT word FROM word WHERE word != ? ORDER BY RAND() LIMIT 3;",
        [word]
    );
    res.json(response[0]);
});

router.post("/quiz/read/mean", async (req, res, next) => {
    const { mean } = req.body;
    const response = await pool.query(
        "SELECT mean FROM word WHERE mean != ? ORDER BY RAND() LIMIT 3;",
        [mean]
    );
    res.json(response[0]);
});

router.post("/exam/read/word", async (req, res, next) => {
    const { lectureList } = req.body;
    const lectures = lectureList.join(", ");
    const query =
        "SELECT * FROM word WHERE lectureId IN (" +
        lectures +
        ") ORDER BY RAND();";
    const response = await pool.query(query, [lectures]);
    res.json(response[0]);
});

router.get("/exam/read/results", async (req, res, next) => {
    const response = await pool.query(
        "SELECT * FROM exam ORDER BY examId DESC;"
    );
    res.json(response[0]);
});

router.get("/exam/read/result/:examId", async (req, res, next) => {
    const { examId } = req.params;
    const response = await pool.query(
        "SELECT * FROM examDetail WHERE examId = ?;",
        [examId]
    );
    res.json(response[0]);
});

router.post("/word/update/one", async (req, res, next) => {
    try {
        const { key, word, mean } = req.body;
        const response = await pool.query(
            "UPDATE word SET word.word = ?, word.mean = ? WHERE word = ?;",
            [word, mean, key]
        );
        res.json({ status: 200, msg: "수정 성공" });
    } catch (error) {
        res.json({ status: 400, msg: "수정 실패" });
    }
});

router.post("/word/delete/one", async (req, res, next) => {
    try {
        const { word } = req.body;
        const response = await pool.query(
            "DELETE FROM word WHERE word.word = ?;",
            [word]
        );
        res.json({ status: 200, msg: "삭제 성공" });
    } catch (error) {
        res.json({ status: 400, msg: "삭제 실패" });
    }
});

router.post("/word/delete/many", async (req, res, next) => {
    try {
        const { lectureId } = req.body;
        const response = await pool.query(
            "DELETE FROM word WHERE word.lectureId = ?;",
            [lectureId]
        );
        res.json({ status: 200, msg: "삭제 성공" });
    } catch (error) {
        res.json({ status: 400, msg: "삭제 실패" });
    }
});

router.get("/func/trim", async (req, res, next) => {
    let results = [];
    try {
        const response1 = await pool.query("SELECT * FROM word;");
        const words = response1[0];
        for (let i = 0; i < words.length; i++) {
            console.log(words[i]);
            const wordId = words[i].wordId;
            const original = words[i].word;
            let word = words[i].word;
            word = word.replace("\n", "");
            const response2 = await pool.query(
                "UPDATE word SET word = ? WHERE wordId = ?;",
                [word, wordId]
            );
            if (original !== word) {
                const temp =
                    "[wordId : " + wordId + "] " + original + " -> " + word;
                results.push(temp);
            }
        }
        res.json(results);
    } catch (error) {}
});

module.exports = router;
("");

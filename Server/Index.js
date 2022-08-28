const express = require("express");
var cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/api/Rewe/Participate", (req, res) => {
    res.status(400)
    res.json({
        Success: false,
        Message: "PARTICIPATION_SUCCESS",
        ParticipationId: "941c3616-c7f6-45f2-9106-6df3f36b7a01",
        Data: null
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
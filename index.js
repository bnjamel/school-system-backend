const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const db = require("./models");

// ! Admin Router
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

// ! Appreciation_Book Router
const appreciationBookRouter = require("./routes/appreciation_book");
app.use("/appreciation_book", appreciationBookRouter);

// ! Class Router
const classRouter = require("./routes/class");
app.use("/class", classRouter);

// ! Division Router
const divisionRouter = require("./routes/division");
app.use("/division", divisionRouter);

// ! Student Router
const studentRouter = require("./routes/student");
app.use("/student", studentRouter);

// ! Subject Router
const subjectRouter = require("./routes/subject");
app.use("/subject", subjectRouter);

// ! Teacher Router
const dayRouter = require("./routes/day");
app.use("/day", dayRouter);

// ! Schedule Router
const scheduleRouter = require("./routes/schedule");
app.use("/schedule", scheduleRouter);

// ! Teacher Router
const teacherRouter = require("./routes/teacher");
app.use("/teacher", teacherRouter);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3001, () => {
    console.log("Listening");
  });
});

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

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

// ! Student Router
const studentDocumentRouter = require("./routes/student_document");
app.use("/student_document", studentDocumentRouter);

// ! Student Router
const studentBiographyRouter = require("./routes/student_biography");
app.use("/student_biography", studentBiographyRouter);

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

// ! user Router
const userRouter = require("./routes/user");
app.use("/user", userRouter);

// ! Announcements Router
const announcementRouter = require("./routes/announcement");
app.use("/announcement", announcementRouter);

// ! isPending Router
const pendingRouter = require("./routes/isPending");
app.use("/pending", pendingRouter);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3001, () => {
    console.log("Listening");
  });
});

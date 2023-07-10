const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

const db = require('./models');

//routers
const CourseRouter = require('./routes/Courses');
app.use("/course", CourseRouter);

const UserRouter = require('./routes/Users');
app.use("/user", UserRouter);

const AdminRouter = require('./routes/Admins');
app.use('/admin', AdminRouter);

const TutorRouter = require('./routes/Tutors');
app.use('/tutor', TutorRouter);

const StudentRouter = require('./routes/Students');
app.use('/student', StudentRouter);

const ClassRouter = require('./routes/Classes');
app.use('/class', ClassRouter);

const ClassStudentRouter = require('./routes/ClassStudents');
app.use('/classstudent', ClassStudentRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});
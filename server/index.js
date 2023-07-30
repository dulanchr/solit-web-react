const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

const db = require('./models');

//routers

const AdminRouter = require('./routes/Admins');
app.use('/admin', AdminRouter);

const AnswerRouter = require('./routes/Answers');
app.use('/answer', AnswerRouter);

const AssignmentRouter = require('./routes/Assignments');
app.use('/assignment', AssignmentRouter);
const GetAssignmentListRouter = require('./routes/GetAssignmentList');
app.use('/getassignmentlist', GetAssignmentListRouter);

const AssignmentStudentRouter = require('./routes/AssignmentStudents');
app.use('/assignmentstudent', AssignmentStudentRouter);


const GetPosteList = require('./routes/PosteList');
app.use('/getpostelist', GetPosteList);

const ClassRouter = require('./routes/Classes');
app.use('/class', ClassRouter);
const ClassCardRouter = require('./routes/ClassCards');
app.use('/classcards', ClassCardRouter);
const GetClassDataRouter = require('./routes/GetClassData');
app.use('/getclassdata', GetClassDataRouter);


const ClassStudentRouter = require('./routes/ClassStudents');
app.use('/classstudent', ClassStudentRouter);

const CourseCardRouter = require('./routes/Courses');
app.use("/course", CourseCardRouter);
const GetCDataRouter = require('./routes/GetCourseData');
app.use("/getcoursedata", GetCDataRouter);
const CourseRouter = require('./routes/CourseCards');
app.use("/coursecard", CourseRouter);

const QuestionRouter = require('./routes/Questions');
app.use("/question", QuestionRouter);

const StudentRouter = require('./routes/Students');
app.use('/student', StudentRouter);
const GetStudentIdRouter = require('./routes/GetStudentId');
app.use('/getstudentid', GetStudentIdRouter);

const StudentreviewRouter = require('./routes/StudentReviews');
app.use('/studentreview', StudentreviewRouter);

const ReviewCardRouter = require('./routes/ReviewCards');
app.use('/reviewcard', ReviewCardRouter);

const TutorRouter = require('./routes/Tutors');
app.use('/tutor', TutorRouter);
const GetTutorIdRouter = require('./routes/GetTutorId');
app.use('/gettutorid', GetTutorIdRouter);


const UserRouter = require('./routes/Users');
app.use("/user", UserRouter);


const LoginRouter = require('./routes/Login');
app.use("/login", LoginRouter);

const PaymentRouter = require('./routes/Payments');
app.use("/payment", PaymentRouter);
const GetPaymentDataRouter = require('./routes/GetPaymentData');
app.use("/getpaymentdata", GetPaymentDataRouter);

const StudRegisterRouter = require('./routes/StudRegisters');
app.use("/studregister", StudRegisterRouter);
const StudRegCoreRouter = require('./routes/StudRegCore');
app.use("/studregcore", StudRegCoreRouter);
const ToturRegisterRouter = require('./routes/TutorRegisters');
app.use("/tutorregister", ToturRegisterRouter);

const UploadRouter = require('./routes/Uploads');
app.use("/upload", UploadRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});
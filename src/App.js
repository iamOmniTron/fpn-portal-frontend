import Home from "./registration/home/home";
import Signup from "./registration/signup/signup";
import Admin from "./dashboard/admin/dashboard";
import PaymentPage from "./registration/payment/payment";
import Applicants from "./dashboard/admin/applicant/applicants";
import Sessions from "./dashboard/admin/session/session";
import Index from "./dashboard/admin";
import {Route,BrowserRouter as Router,Routes} from "react-router-dom";
import EditSession from "./dashboard/admin/session/editSession";
import CreateSession from "./dashboard/admin/session/createSession";
import StudentDashboard from "./dashboard/student/dashboard/dashboard";
import Profile from "./dashboard/student/dashboard/profile/profile";
import Register from "./registration/register/register";
import ApplicantPortal from "./portal/applicant/portal";
import School from "./dashboard/admin/school/school";
import ApplicantResetPassword from "./portal/applicant/resetPassword";
import ApplicantIndex from "./portal/applicant";
import ApplicantsPayments from "./portal/applicant/payment";
import Department from "./dashboard/admin/department/department";
import Course from "./dashboard/admin/course/course";
import LoginAdmin from "./dashboard/admin/login/login";
import LoginApplicant from "./portal/applicant/login";
import ApplicantProfile from "./portal/applicant/profile";
import AllPayments from "./dashboard/admin/payment/payment";
import ExamHome from "./exam/home";
import AdminExam from "./exam/admin/admin";
import StudentCourse from "./dashboard/student/course/course";
import StudentResult from "./dashboard/student/result/result";
import LoginStudent from "./dashboard/student/login";
import ExaminerDashboard from "./exam/examiner/examiner";
import ExaminerProfile from "./exam/examiner";
import Exams from "./exam/examiner/exam";
import ExamStudents from "./exam/examiner/students";
import ExamStudentDashboard from "./exam/student/student";
import StudentExamIndex from "./exam/student";
import ExamInstructions from "./exam/student/Instruction";
import StudentExam from "./exam/student/exams";
import Timer from "./exam/student/components/timer";
import MyResults from "./exam/student/result";
import StudentResults from "./exam/examiner/results";
import Students from "./dashboard/admin/student/student";
// import "./index.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/applicant/registration/login" element={<Signup/>}/>
          <Route path="/applicant/payment/registration" element={<PaymentPage/>}/>
          <Route path="/applicant/new" element={<Register/>}/>
          <Route path="/admin/login" element={<LoginAdmin/>}/>
          <Route path="/login/applicant/confirmed" element={<LoginApplicant/>}/>
          <Route path="/admin" element={<Admin/>}>
            <Route path="" index element={<Index/>}/>
            <Route path="school" element={<School/>} />
            <Route path="department" element={<Department/>}/>
            <Route path="applicants" element={<Applicants/>}/>
            <Route path="payments" element={<AllPayments/>}/>
            <Route path="students" element={<Students/>}/>
            <Route path="session" element={<Sessions/>}/>
            <Route path="session/create" element={<CreateSession/>}/>
            <Route path="session/edit/:id" element={<EditSession/>}/>
            <Route path="course" element={<Course/>}/>
          </Route>
            <Route path="/student/login" element={<LoginStudent/>}/>
          <Route path="/student" element={<StudentDashboard/>}>
            <Route path="" index element={<Profile/>}/>
            <Route path="courses/" element={<StudentCourse/>}/>
            <Route path="examination/result" element={<StudentResult/>}/>
          </Route>
          <Route path="/portal/applicant" element={<ApplicantIndex/>}>
            <Route path="" index element={<ApplicantPortal/>}/>
            <Route path="password/reset" element={<ApplicantResetPassword/>}/>
            <Route path="payments" element={<ApplicantsPayments/>}/>
            <Route path="profile" element={<ApplicantProfile/>}/>
          </Route>
          <Route path="/exam" element={<ExamHome/>}/>
          <Route path="/exam/admin" element={<AdminExam/>}>
            
          </Route>
        <Route path="/exam/examiner" element={<ExaminerDashboard/>}>
          <Route path="" index element={<ExaminerProfile/>}/>
          <Route path="exams" element={<Exams/>}/>
          <Route path="students" element={<ExamStudents/>}/>
          <Route path="results" element={<StudentResults/>}/>
        </Route>
        <Route path="/exam/student" element={<ExamStudentDashboard/>}>
          <Route path="" element={<StudentExamIndex/>}/>
          <Route path="instructions" element={<ExamInstructions/>}/>
          <Route path="results" element={<MyResults/>}/>
        </Route>
        <Route path="/exam/student/start/:examId" element={<StudentExam/>}/>
        {/* <Route path="/test" element={<Timer/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

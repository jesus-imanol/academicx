import { BrowserRouter, Routes, Route} from "react-router"
import './App.css'
import HomeView from "./pages/HomeView"
import { CreateStudyProgramPage } from "./features/study-programs"
import { CreateSubjectPage } from "./features/subjects"
import { RegisterTeacherPage, TeachersDashboard } from "./features/teachers"
import { CreateGroupPage, GroupsDashboard } from "./features/groups"
import { RegisterStudentPage, StudentsDashboard } from "./features/students"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/study-programs/create" element={<CreateStudyProgramPage />} />
        <Route path="/subjects/create" element={<CreateSubjectPage />} />
        <Route path="/teachers/register" element={<RegisterTeacherPage />} />
        <Route path="/teachers/dashboard" element={<TeachersDashboard />} />
        <Route path="/groups/create" element={<CreateGroupPage />} />
        <Route path="/groups/dashboard" element={<GroupsDashboard />} />
        <Route path="/students/register" element={<RegisterStudentPage />} />
        <Route path="/students/dashboard" element={<StudentsDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

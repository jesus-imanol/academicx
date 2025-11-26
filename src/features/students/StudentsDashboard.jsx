import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';

const StudentsDashboard = () => {
  // Mock data - esto vendría de tu backend
  const students = [
    { id: 1, name: 'Alice Johnson', enrollmentNumber: 'ENR2024001', semester: '3rd', subjects: 5 },
    { id: 2, name: 'Bob Smith', enrollmentNumber: 'ENR2024002', semester: '2nd', subjects: 4 },
    { id: 3, name: 'Charlie Brown', enrollmentNumber: 'ENR2024003', semester: '4th', subjects: 6 },
    { id: 4, name: 'Diana Prince', enrollmentNumber: 'ENR2024004', semester: '1st', subjects: 3 }
  ];

  return (
    <AdminLayout activeNavItem="students">
      <div className="flex flex-wrap justify-between gap-3 p-4 items-center">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Students Management
          </p>
          <p className="text-[#a19cba] text-base font-normal leading-normal">
            Manage student registrations and enrollments
          </p>
        </div>
        
        <Link
          to="/students/register"
          className="flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          <Icon name="add" />
          <span className="truncate">Register Student</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-6">
        <div className="rounded-xl border border-white/10 bg-[#252233] p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/20">
              <Icon name="group" className="text-primary text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-sm">Total Students</p>
              <p className="text-white text-2xl font-bold">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Icon name="school" className="text-cyan-500 text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-sm">Active Enrollments</p>
              <p className="text-white text-2xl font-bold">
                {students.reduce((acc, s) => acc + s.subjects, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-fuchsia-600/20">
              <Icon name="import_contacts" className="text-fuchsia-600 text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-sm">Total Courses</p>
              <p className="text-white text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="mt-8 rounded-xl border border-white/10 bg-[#252233] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Registered Students</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Name</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Enrollment Number</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Semester</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Subjects</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white text-sm font-medium">{student.name}</td>
                  <td className="py-4 text-[#a19cba] text-sm">{student.enrollmentNumber}</td>
                  <td className="py-4 text-white text-sm">{student.semester} Semester</td>
                  <td className="py-4 text-white text-sm">{student.subjects}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-white/70 hover:text-white transition-colors">
                        <Icon name="visibility" className="text-base" />
                      </button>
                      <button className="text-white/70 hover:text-white transition-colors">
                        <Icon name="edit" className="text-base" />
                      </button>
                      <button className="text-white/70 hover:text-red-500 transition-colors">
                        <Icon name="delete" className="text-base" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentsDashboard;

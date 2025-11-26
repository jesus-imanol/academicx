import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';

const TeachersDashboard = () => {
  // Mock data - esto vendría de tu backend
  const teachers = [
    { id: 1, name: 'Dr. John Smith', email: 'john.smith@example.com', department: 'Computer Science', courses: 3 },
    { id: 2, name: 'Prof. Sarah Johnson', email: 'sarah.j@example.com', department: 'Mathematics', courses: 2 },
    { id: 3, name: 'Dr. Michael Brown', email: 'm.brown@example.com', department: 'Physics', courses: 4 }
  ];

  return (
    <AdminLayout activeNavItem="teachers">
      <div className="flex flex-wrap justify-between gap-3 p-4 items-center">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Teachers Management
          </p>
          <p className="text-[#a19cba] text-base font-normal leading-normal">
            Manage teacher accounts and assignments
          </p>
        </div>
        
        <Link
          to="/teachers/register"
          className="flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          <Icon name="add" />
          <span className="truncate">Register Teacher</span>
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
              <p className="text-[#a19cba] text-sm">Total Teachers</p>
              <p className="text-white text-2xl font-bold">{teachers.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Icon name="import_contacts" className="text-cyan-500 text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-sm">Active Courses</p>
              <p className="text-white text-2xl font-bold">
                {teachers.reduce((acc, t) => acc + t.courses, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-fuchsia-600/20">
              <Icon name="school" className="text-fuchsia-600 text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-sm">Departments</p>
              <p className="text-white text-2xl font-bold">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="mt-8 rounded-xl border border-white/10 bg-[#252233] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Registered Teachers</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Name</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Email</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Department</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Courses</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white text-sm">{teacher.name}</td>
                  <td className="py-4 text-[#a19cba] text-sm">{teacher.email}</td>
                  <td className="py-4 text-white text-sm">{teacher.department}</td>
                  <td className="py-4 text-white text-sm">{teacher.courses}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
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

export default TeachersDashboard;

import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';

const GroupsDashboard = () => {
  // Mock data - esto vendría de tu backend
  const groups = [
    { id: 1, name: 'Fall 2024 - Section A', subject: 'Data Structures', teacher: 'Dr. John Smith', students: 25 },
    { id: 2, name: 'Spring 2024 - Advanced', subject: 'Algorithms', teacher: 'Prof. Sarah Johnson', students: 18 },
    { id: 3, name: 'Summer 2024 - Basics', subject: 'Programming 101', teacher: 'Dr. Michael Brown', students: 30 }
  ];

  return (
    <AdminLayout activeNavItem="groups">
      <div className="flex flex-wrap justify-between gap-3 p-4 items-center">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Groups Management
          </p>
          <p className="text-[#a19cba] text-base font-normal leading-normal">
            Manage student groups and assignments
          </p>
        </div>
        
        <Link
          to="/groups/create"
          className="flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          <Icon name="add" />
          <span className="truncate">Create Group</span>
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
              <p className="text-[#a19cba] text-sm">Total Groups</p>
              <p className="text-white text-2xl font-bold">{groups.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Icon name="school" className="text-cyan-500 text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-sm">Total Students</p>
              <p className="text-white text-2xl font-bold">
                {groups.reduce((acc, g) => acc + g.students, 0)}
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
              <p className="text-[#a19cba] text-sm">Active Subjects</p>
              <p className="text-white text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="mt-8 rounded-xl border border-white/10 bg-[#252233] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Active Groups</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Group Name</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Subject</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Teacher</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Students</th>
                <th className="text-left text-sm font-medium text-[#a19cba] pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white text-sm font-medium">{group.name}</td>
                  <td className="py-4 text-[#a19cba] text-sm">{group.subject}</td>
                  <td className="py-4 text-white text-sm">{group.teacher}</td>
                  <td className="py-4 text-white text-sm">{group.students}</td>
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

export default GroupsDashboard;

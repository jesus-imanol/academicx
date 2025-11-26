import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';

const CreateGroupPage = () => {
  const [formData, setFormData] = useState({
    groupName: '',
    subject: '',
    teacher: '',
    studentSearch: ''
  });

  const [selectedStudents, setSelectedStudents] = useState([
    {
      id: 1,
      name: 'Olivia Martin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERGpDvM5uKtVb927EKQKPWiyF-ZKIGSfGhv6trmmPInuxODehRJrIErfodGD-y8wHP32zcWcFhbSANcGdIsBb7XysV_TlJShqYD5BgeJXphBnQmVil6rLlccPzPUAHos_aQyvMNwSjj6jabTKnRUzXORagZ0KxghI7A4gpR3inNxYmWSTbO5ZPd5V7cHZje-a5Jz8rB9wjj4Ff6DUwfIWqA8MoHPtIrofPKiTR4sseCYznxEfDkX1I81XX_sp2lagST0PjCKMYnU'
    },
    {
      id: 2,
      name: 'Liam Johnson',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSvnye_YYW2JQgDtltNCYgSnh1ggYD0mIylY2MOL5DDBZ6E1qmJ7U6CEjoHu7yVv7UEefNT61LbwZYxAXIbf0Ub-0X39WfCGiPJ02UFW_3Ct_tWNtv-ppPyXf3DCM2X31hs1aTct8YSWU6c4tEXBm0FNdKCvrDgdbQsg9n6Td36xr540A8O5de3S1jh1Re2b7QWSpSHsqGqraK2_AcuVq9RWSN8vTbDW4xINGbhXTd0tDf6qtD95_jT2JajL7P-CgYYnkt9eHtUgM'
    },
    {
      id: 3,
      name: 'Ava Williams',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUUkXi47Bli3zO11dVCtZEZyt4U5W-2jI6Gh6bZZGQ0I8uC7AU4ZAzxPBs_uMgeaEj1Pk0kSR5zz3TAMgEgljLmGmF4mMDvOK8HI_aCGha3rgklcsGrTItlcMvcsiqKR3_-ia9F0xyq4lP-q0TSUCXk5il8WM4SCMVga6ryoyJ017niA1NVYSm1f1VgW2o4M_PL9WAEB4oFa7LRx0yqvoP1GGVIIcPeu12cQQcEVaNntK-HLDppUcNocW-iPn-ccVMQRaDYHD-wTM'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudents(prev => prev.filter(student => student.id !== studentId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, students: selectedStudents });
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <AdminLayout activeNavItem="groups">
      <div className="max-w-4xl mx-auto p-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a className="text-[#a19cba] text-base font-medium leading-normal hover:text-white transition-colors" href="#">
            Dashboard
          </a>
          <span className="text-[#a19cba] text-base font-medium leading-normal">/</span>
          <a className="text-[#a19cba] text-base font-medium leading-normal hover:text-white transition-colors" href="#">
            Groups
          </a>
          <span className="text-[#a19cba] text-base font-medium leading-normal">/</span>
          <span className="text-white text-base font-medium leading-normal">Create New Group</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Create New Group
            </p>
            <p className="text-[#a19cba] text-base font-normal leading-normal">
              Fill in the details below to create a new group for a subject.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Group Name */}
            <div className="flex flex-col">
              <label className="text-white text-base font-medium leading-normal pb-2" htmlFor="group-name">
                Group Name
              </label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-14 placeholder:text-[#a19cba] px-4 py-3 text-base font-normal leading-normal"
                id="group-name"
                name="groupName"
                placeholder="e.g., Fall 2024 - Section A"
                value={formData.groupName}
                onChange={handleInputChange}
              />
            </div>

            {/* Select Subject */}
            <div className="flex flex-col">
              <label className="text-white text-base font-medium leading-normal pb-2" htmlFor="select-subject">
                Select Subject
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 left-4 text-[#a19cba]">
                  search
                </span>
                <input
                  className="form-input pl-12 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-14 placeholder:text-[#a19cba] pr-4 py-3 text-base font-normal leading-normal"
                  id="select-subject"
                  name="subject"
                  placeholder="Search and select a subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Assign Teacher */}
            <div className="flex flex-col">
              <label className="text-white text-base font-medium leading-normal pb-2" htmlFor="assign-teacher">
                Assign Teacher
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 left-4 text-[#a19cba]">
                  school
                </span>
                <input
                  className="form-input pl-12 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-14 placeholder:text-[#a19cba] pr-4 py-3 text-base font-normal leading-normal"
                  id="assign-teacher"
                  name="teacher"
                  placeholder="Search for a teacher by name or email"
                  value={formData.teacher}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Add Students */}
            <div className="flex flex-col space-y-4">
              <label className="text-white text-base font-medium leading-normal">
                Add Students
              </label>
              <div className="bg-[#1d1b27] border border-[#3f3b54] rounded-lg p-4">
                <div className="relative mb-4">
                  <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 left-4 text-[#a19cba]">
                    person_add
                  </span>
                  <input
                    className="form-input pl-12 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1d1b27] focus:ring-primary border border-[#3f3b54] bg-[#131022] h-12 placeholder:text-[#a19cba] pr-4 py-3 text-sm"
                    name="studentSearch"
                    placeholder="Search students to add..."
                    value={formData.studentSearch}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="min-h-[80px] space-x-2 space-y-2">
                  {selectedStudents.map((student) => (
                    <span
                      key={student.id}
                      className="inline-flex items-center gap-2 bg-[#2b2839] text-white text-sm font-medium px-3 py-1.5 rounded-full"
                    >
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6"
                        style={{ backgroundImage: `url("${student.avatar}")` }}
                        aria-label={`Avatar of ${student.name}`}
                      />
                      {student.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-[#a19cba] hover:text-white transition-colors"
                      >
                        <Icon name="close" className="!text-base" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-[#a19cba] text-base font-bold leading-normal tracking-[0.015em] border border-transparent hover:border-[#a19cba] transition-colors duration-200"
              >
                <span className="truncate">Cancel</span>
              </button>
              <button
                type="submit"
                className="relative flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-base font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <span className="truncate">Create Group</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateGroupPage;

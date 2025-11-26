import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';

const RegisterStudentPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    enrollmentNumber: '',
    semester: '',
    subjectSearch: ''
  });

  const [selectedSubjects, setSelectedSubjects] = useState([
    { id: 1, name: 'Quantum Computing' },
    { id: 2, name: 'Advanced Cryptography' },
    { id: 3, name: 'Blockchain Fundamentals' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveSubject = (subjectId) => {
    setSelectedSubjects(prev => prev.filter(subject => subject.id !== subjectId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, subjects: selectedSubjects });
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <AdminLayout activeNavItem="students">
      <div className="max-w-4xl mx-auto p-8">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex flex-col gap-2">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Student Registration
            </p>
            <p className="text-[#a19cba] text-base font-normal leading-normal">
              Register a new student and associate them with their subjects.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              {/* Student's Full Name */}
              <div className="sm:col-span-1">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Student's Full Name
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-14 placeholder:text-[#a19cba] px-4 py-3 text-base font-normal leading-normal"
                    name="fullName"
                    placeholder="Enter the student's full name"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              {/* Enrollment Number */}
              <div className="sm:col-span-1">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Enrollment Number
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-14 placeholder:text-[#a19cba] px-4 py-3 text-base font-normal leading-normal"
                    name="enrollmentNumber"
                    placeholder="Enter a unique enrollment number"
                    type="text"
                    value={formData.enrollmentNumber}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              {/* Current Semester */}
              <div className="sm:col-span-1">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Current Semester
                  </p>
                  <select
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-14 placeholder:text-[#a19cba] px-4 py-3 text-base font-normal leading-normal"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Associate Subjects */}
            <div>
              <p className="text-white text-base font-medium leading-normal pb-2">
                Associate Subjects
              </p>
              <div className="rounded-lg bg-[#1d1b27] border border-[#3f3b54] p-4">
                <div className="relative mb-4">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a19cba]">
                    search
                  </span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1d1b27] focus:ring-primary border border-[#3f3b54] bg-[#131022] h-12 placeholder:text-[#a19cba] pl-10 pr-4 py-3 text-sm"
                    name="subjectSearch"
                    placeholder="Search for subjects..."
                    type="text"
                    value={formData.subjectSearch}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="text-sm font-medium text-white/80 mb-2">Selected Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center gap-2 rounded-full bg-[#2b2839] px-3 py-1 text-sm font-medium text-white"
                    >
                      <span>{subject.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(subject.id)}
                        className="text-[#a19cba] hover:text-white transition-colors"
                      >
                        <Icon name="close" className="text-base!" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-[#a19cba] text-base font-bold leading-normal tracking-[0.015em] border border-transparent hover:border-[#a19cba] transition-colors duration-200"
              >
                <span className="truncate">Cancel</span>
              </button>
              <button
                type="submit"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-base font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <span className="truncate">Register Student</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RegisterStudentPage;

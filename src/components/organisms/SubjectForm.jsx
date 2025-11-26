import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../molecules/TextField';
import Button from '../atoms/Button';

const SubjectForm = ({ onSubmit, onCancel }) => {
  const [subjectName, setSubjectName] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ subjectName, semester });
    }
  };

  return (
    <div className="relative z-10 flex w-full max-w-lg flex-col gap-8 rounded-xl border border-[#4A4A52]/50 bg-[#1A1B23]/80 p-8 backdrop-blur-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Create New Subject</h1>
        <p className="text-sm text-[#E0E0E0]/60">
          Fill in the details below to add a new subject to the platform.
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-white" htmlFor="subject-name">
            Subject Name
          </label>
          <input
            className="h-14 w-full rounded-lg border border-[#4A4A52] bg-[#131022]/50 px-4 text-base text-white placeholder:text-[#E0E0E0]/40 focus:border-[#8A2BE2] focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50"
            id="subject-name"
            placeholder="e.g., Introduction to Quantum Computing"
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-white" htmlFor="semester">
            Semester
          </label>
          <input
            className="h-14 w-full rounded-lg border border-[#4A4A52] bg-[#131022]/50 px-4 text-base text-white placeholder:text-[#E0E0E0]/40 focus:border-[#8A2BE2] focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50"
            id="semester"
            placeholder="e.g., Fall 2024"
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>

        <div className="flex flex-col-reverse items-center gap-4 pt-4 sm:flex-row sm:justify-end">
          <button
            className="h-12 w-full max-w-xs cursor-pointer justify-center rounded-lg bg-transparent px-5 text-base font-bold text-white ring-1 ring-[#4A4A52] transition-colors hover:bg-[#4A4A52]/30 sm:w-auto"
            type="button"
            onClick={onCancel}
          >
            <span className="truncate">Cancel</span>
          </button>
          <button
            className="noisy-gradient flex h-12 w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg px-5 text-base font-bold text-white sm:w-auto"
            type="submit"
          >
            <span className="truncate">Create Subject</span>
          </button>
        </div>
      </form>
    </div>
  );
};

SubjectForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default SubjectForm;

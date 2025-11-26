import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../molecules/TextField';
import Button from '../atoms/Button';

const CreateProgramForm = ({ onSubmit, onCancel }) => {
  const [programName, setProgramName] = useState('');
  const [semesters, setSemesters] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ programName, semesters: parseInt(semesters) });
    }
  };

  return (
    <div className="bg-[#1A1A2E] p-8 rounded-xl border border-white/10">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* Program Name TextField */}
        <TextField
          label="Program Name"
          placeholder="Bachelor of Science in Computer Science"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
        />

        {/* Number of Semesters TextField */}
        <TextField
          label="Number of Semesters"
          type="number"
          placeholder="8"
          value={semesters}
          onChange={(e) => setSemesters(e.target.value)}
          helperText="Enter a value between 2 and 12."
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <Button type="submit" variant="primary">
            Create Program
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

CreateProgramForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default CreateProgramForm;

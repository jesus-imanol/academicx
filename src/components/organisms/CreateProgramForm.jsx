import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateProgramForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    cantidadCuatrimestres: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-[#252233] p-6 sm:p-8 rounded-xl border border-white/10">
      <form className="flex flex-col gap-6 sm:gap-8" onSubmit={handleSubmit}>
        {/* Program Name */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm sm:text-base font-medium leading-normal">
            Program Name
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Bachelor of Science in Computer Science"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
            required
          />
        </div>

        {/* Number of Semesters */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm sm:text-base font-medium leading-normal">
            Number of Semesters
          </label>
          <input
            type="number"
            name="cantidadCuatrimestres"
            value={formData.cantidadCuatrimestres}
            onChange={handleChange}
            placeholder="8"
            min="2"
            max="12"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
            required
          />
          <p className="text-[#a19cba] text-xs sm:text-sm">Enter a value between 2 and 12.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 sm:h-12 px-5 sm:px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Program'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 sm:h-12 px-4 sm:px-6 bg-transparent text-[#a19cba] text-sm sm:text-base font-bold leading-normal tracking-[0.015em] border border-transparent hover:border-[#a19cba] transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

CreateProgramForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isSubmitting: PropTypes.bool
};

export default CreateProgramForm;

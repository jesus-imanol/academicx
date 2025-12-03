import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import { useAlumnos } from '../../hooks/useAlumnos';

const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const { createAlumno, loading } = useAlumnos();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    matricula: '',
    cuatrimestreActual: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.matricula.trim() || !formData.cuatrimestreActual) {
      return;
    }

    try {
      const alumnoData = {
        nombre: formData.nombre.trim(),
        matricula: formData.matricula.trim().toUpperCase(),
        cuatrimestreActual: parseInt(formData.cuatrimestreActual),
      };

      await createAlumno(alumnoData);
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        matricula: '',
        cuatrimestreActual: '',
        subjectSearch: ''
      });

      // Preguntar si desea crear otro estudiante
      setTimeout(() => {
        setShowConfirm(true);
      }, 1000);
    } catch (error) {
      // El error ya está manejado por el hook con los códigos apropiados
      console.error('Error al registrar alumno:', error);
    }
  };

  const handleConfirmRegisterAnother = () => {
    setShowConfirm(false);
    // El formulario ya está limpio, el usuario puede continuar registrando
  };

  const handleCancelRegisterAnother = () => {
    setShowConfirm(false);
    navigate('/students/dashboard');
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirmRegisterAnother}
        onCancel={handleCancelRegisterAnother}
        title="¡Estudiante registrado exitosamente!"
        message="¿Deseas registrar otro estudiante?"
        confirmText="Sí, registrar otro"
        cancelText="No, ir al dashboard"
        type="success"
      />
      
      <AdminLayout activeNavItem="students">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-2">
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              Student Registration
            </p>
            <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
              Register a new student and associate them with their subjects.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8">
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-2">
              {/* Student's Full Name */}
              <div className="lg:col-span-1">
                <label className="flex flex-col">
                  <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                    Student's Full Name
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
                    name="nombre"
                    placeholder="Enter the student's full name"
                    type="text"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              {/* Enrollment Number */}
              <div className="lg:col-span-1">
                <label className="flex flex-col">
                  <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                    Enrollment Number
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
                    name="matricula"
                    placeholder="Enter a unique enrollment number (e.g., A20240001)"
                    type="text"
                    value={formData.matricula}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              {/* Current Semester */}
              <div className="lg:col-span-1">
                <label className="flex flex-col">
                  <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                    Current Semester
                  </p>
                  <select
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
                    name="cuatrimestreActual"
                    value={formData.cuatrimestreActual}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                    <option value="9">9th Semester</option>
                    <option value="10">10th Semester</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Associate Subjects */}
            <div>
              <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                Associate Subjects
              </p>
              <div className="rounded-lg bg-[#1d1b27] border border-[#3f3b54] p-3 sm:p-4">
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
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 sm:h-12 px-4 sm:px-6 bg-transparent text-[#a19cba] text-sm sm:text-base font-bold leading-normal tracking-[0.015em] border border-transparent hover:border-[#a19cba] transition-colors duration-200"
              >
                <span className="truncate">Cancel</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 sm:h-12 px-4 sm:px-6 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Icon name="sync" className="animate-spin" />
                    Registering...
                  </span>
                ) : (
                  <span className="truncate">Register Student</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default RegisterStudentPage;
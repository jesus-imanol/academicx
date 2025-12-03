import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import { useAsignaturas } from '../../hooks/useAsignaturas';
import { useProgramasEstudio } from '../../hooks/useProgramasEstudio';

const CreateSubjectPage = () => {
  const navigate = useNavigate();
  const { createAsignatura, loading } = useAsignaturas();
  const { programas } = useProgramasEstudio();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    cuatrimestre: '',
    programaEstudioId: ''
  });

  const [maxCuatrimestre, setMaxCuatrimestre] = useState(10);

  useEffect(() => {
    // Update max cuatrimestre when programa changes
    if (formData.programaEstudioId) {
      const programa = programas.find(p => p.id === formData.programaEstudioId);
      if (programa) {
        setMaxCuatrimestre(programa.cantidadCuatrimestres);
        // Reset cuatrimestre if it exceeds new max
        if (parseInt(formData.cuatrimestre) > programa.cantidadCuatrimestres) {
          setFormData(prev => ({ ...prev, cuatrimestre: '' }));
        }
      }
    }
  }, [formData.programaEstudioId, programas, formData.cuatrimestre]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.cuatrimestre || !formData.programaEstudioId) {
      return;
    }

    try {
      const asignaturaData = {
        nombre: formData.nombre.trim(),
        cuatrimestre: parseInt(formData.cuatrimestre),
        programaEstudioId: formData.programaEstudioId
      };

      const result = await createAsignatura(asignaturaData);
      
      if (result.success) {
        // Limpiar formulario
        setFormData({
          nombre: '',
          cuatrimestre: '',
          programaEstudioId: ''
        });

        // Preguntar si desea crear otra asignatura
        setTimeout(() => {
          setShowConfirm(true);
        }, 1000);
      }
    } catch (error) {
      // El error ya está manejado por el hook con los códigos apropiados
      console.error('Error al crear asignatura:', error);
    }
  };

  const handleConfirmCreateAnother = () => {
    setShowConfirm(false);
    // El formulario ya está limpio, el usuario puede continuar creando
  };

  const handleCancelCreateAnother = () => {
    setShowConfirm(false);
    navigate('/subjects');
  };

  const handleCancel = () => {
    navigate('/subjects');
  };

  const selectedPrograma = programas.find(p => p.id === formData.programaEstudioId);

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirmCreateAnother}
        onCancel={handleCancelCreateAnother}
        title="¡Asignatura creada exitosamente!"
        message="¿Deseas crear otra asignatura?"
        confirmText="Sí, crear otra"
        cancelText="No, ir al dashboard"
        type="success"
      />
      
      <AdminLayout activeNavItem="subjects">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Page Heading */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col gap-2">
              <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                Create New Subject
              </p>
              <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
                Add a new subject to a study program and assign it to a semester.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8">
            <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-2">
                {/* Subject Name */}
                <div className="lg:col-span-2">
                  <label className="flex flex-col">
                    <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                      Subject Name
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
                      name="nombre"
                      placeholder="e.g., Introduction to Quantum Computing"
                      type="text"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>

                {/* Study Program */}
                <div className="lg:col-span-1">
                  <label className="flex flex-col">
                    <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                      Study Program
                    </p>
                    <select
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
                      name="programaEstudioId"
                      value={formData.programaEstudioId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select Study Program</option>
                      {programas.map(programa => (
                        <option key={programa.id} value={programa.id}>
                          {programa.nombre} ({programa.cantidadCuatrimestres} semesters)
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Semester */}
                <div className="lg:col-span-1">
                  <label className="flex flex-col">
                    <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
                      Semester
                    </p>
                    <select
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 sm:h-14 placeholder:text-[#a19cba] px-3 sm:px-4 py-3 text-sm sm:text-base font-normal leading-normal"
                      name="cuatrimestre"
                      value={formData.cuatrimestre}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.programaEstudioId}
                    >
                      <option value="" disabled>Select Semester</option>
                      {Array.from({ length: maxCuatrimestre }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {num}{num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th'} Semester
                        </option>
                      ))}
                    </select>
                    {selectedPrograma && (
                      <p className="text-[#a19cba] text-xs mt-2">
                        Maximum {maxCuatrimestre} semesters for {selectedPrograma.nombre}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              {/* Info Box */}
              {formData.programaEstudioId && formData.cuatrimestre && (
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="info" className="text-primary text-xl mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Subject Information</p>
                      <p className="text-[#a19cba] text-sm">
                        This subject will be added to <span className="text-white font-medium">{selectedPrograma?.nombre}</span> in the{' '}
                        <span className="text-white font-medium">{formData.cuatrimestre}{formData.cuatrimestre === '1' ? 'st' : formData.cuatrimestre === '2' ? 'nd' : formData.cuatrimestre === '3' ? 'rd' : 'th'} semester</span>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCancel}
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
                      Creating...
                    </span>
                  ) : (
                    <span className="truncate">Create Subject</span>
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

export default CreateSubjectPage;

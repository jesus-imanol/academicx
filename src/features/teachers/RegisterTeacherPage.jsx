import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import { useDocentes } from '../../hooks/useDocentes';
import { useAsignaturas } from '../../hooks/useAsignaturas';

const RegisterTeacherPage = () => {
  const navigate = useNavigate();
  const { createDocente, loading } = useDocentes();
  const { asignaturas, fetchAsignaturas } = useAsignaturas();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    asignaturasCompetenciaIds: []
  });

  useEffect(() => {
    fetchAsignaturas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAsignatura = (asignaturaId) => {
    setFormData(prev => ({
      ...prev,
      asignaturasCompetenciaIds: prev.asignaturasCompetenciaIds.includes(asignaturaId)
        ? prev.asignaturasCompetenciaIds.filter(id => id !== asignaturaId)
        : [...prev.asignaturasCompetenciaIds, asignaturaId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      return;
    }

    try {
      const docenteData = {
        nombre: formData.nombre.trim(),
        asignaturasCompetenciaIds: formData.asignaturasCompetenciaIds
      };

      const result = await createDocente(docenteData);
      
      if (result.success) {
        // Limpiar formulario
        setFormData({
          nombre: '',
          asignaturasCompetenciaIds: []
        });

        // Preguntar si desea crear otro docente
        setTimeout(() => {
          setShowConfirm(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Error al crear docente:', error);
    }
  };

  const handleConfirmCreateAnother = () => {
    setShowConfirm(false);
  };

  const handleCancelCreateAnother = () => {
    setShowConfirm(false);
    navigate('/teachers/dashboard');
  };

  const handleCancel = () => {
    navigate('/teachers/dashboard');
  };

  // Group asignaturas by programa for better organization
  const asignaturasByPrograma = asignaturas.reduce((acc, asignatura) => {
    const programaName = asignatura.programaEstudio?.nombre || 'Other';
    if (!acc[programaName]) {
      acc[programaName] = [];
    }
    acc[programaName].push(asignatura);
    return acc;
  }, {});

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirmCreateAnother}
        onCancel={handleCancelCreateAnother}
        type="success"
        title="Teacher Created!"
        message="¿Deseas registrar otro docente?"
        confirmText="Sí, registrar otro"
        cancelText="No, ir al dashboard"
      />

      <AdminLayout activeNavItem="teachers">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4 sm:p-6">
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              Register New Teacher
            </p>
            <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
              Fill in the details below to create a new teacher and assign teaching competencies.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 sm:space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Teacher Name */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <label className="text-white text-sm font-medium mb-2 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full h-12 sm:h-14 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white placeholder-[#a19cba] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Dr. Carlos Martínez López"
                    required
                  />
                  <p className="text-[#a19cba] text-xs mt-1.5">
                    Enter the teacher's complete name
                  </p>
                </div>
              </div>

              {/* Teaching Competencies */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Teaching Competencies (Optional)
                </label>
                <p className="text-[#a19cba] text-xs mb-3">
                  Select the subjects this teacher is qualified to teach
                </p>
                
                {asignaturas.length === 0 ? (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-[#a19cba] text-sm text-center">
                      No subjects available. Create subjects first.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto bg-[#1d1b27] border border-[#3f3b54] rounded-lg p-4 space-y-4">
                    {Object.entries(asignaturasByPrograma).map(([programaName, programaAsignaturas]) => (
                      <div key={programaName}>
                        <h4 className="text-primary text-sm font-semibold mb-2 flex items-center gap-2">
                          <Icon name="school" className="text-xs" />
                          {programaName}
                        </h4>
                        <div className="space-y-2 ml-2">
                          {programaAsignaturas.map((asignatura) => (
                            <label
                              key={asignatura.id}
                              className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={formData.asignaturasCompetenciaIds.includes(asignatura.id)}
                                onChange={() => toggleAsignatura(asignatura.id)}
                                className="w-4 h-4 rounded border-[#3f3b54] bg-[#252233] text-primary focus:ring-primary focus:ring-offset-0"
                              />
                              <div className="flex-1">
                                <p className="text-white text-sm">{asignatura.nombre}</p>
                                <p className="text-[#a19cba] text-xs">
                                  Semester {asignatura.cuatrimestre}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {formData.asignaturasCompetenciaIds.length > 0 && (
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
                    <Icon name="info" className="text-blue-400 text-xl shrink-0" />
                    <p className="text-blue-400 text-sm">
                      This teacher will be qualified to teach <strong>{formData.asignaturasCompetenciaIds.length}</strong> subject(s)
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto order-2 sm:order-1 px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.nombre.trim()}
                  className="w-full sm:flex-1 order-1 sm:order-2 px-6 py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  style={{
                    background: loading || !formData.nombre.trim() 
                      ? '#3f3b54' 
                      : 'linear-gradient(to right, #2563eb, #3b82f6)'
                  }}
                >
                  {loading ? (
                    <>
                      <Icon name="sync" className="animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Icon name="check_circle" />
                      Register Teacher
                    </>
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

export default RegisterTeacherPage;

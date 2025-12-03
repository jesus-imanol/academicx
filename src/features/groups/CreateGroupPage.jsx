import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import { useGrupos } from '../../hooks/useGrupos';
import { useAsignaturas } from '../../hooks/useAsignaturas';
import { useDocentes } from '../../hooks/useDocentes';
import { useAlumnos } from '../../hooks/useAlumnos';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const { createGrupo, loading } = useGrupos();
  const { asignaturas, fetchAsignaturas } = useAsignaturas();
  const { docentes, fetchDocentes } = useDocentes();
  const { alumnos, fetchAlumnos } = useAlumnos();
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    asignaturaId: '',
    docenteId: '',
    alumnoIds: []
  });

  // Docentes filtrados por competencia
  const [docentesCompetentes, setDocentesCompetentes] = useState([]);

  useEffect(() => {
    fetchAsignaturas();
    fetchDocentes();
    fetchAlumnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Filtrar docentes que tienen competencia en la asignatura seleccionada
    if (formData.asignaturaId && docentes.length > 0) {
      const competentes = docentes.filter(docente =>
        docente.asignaturasCompetencia?.some(asig => asig.id === formData.asignaturaId)
      );
      setDocentesCompetentes(competentes);

      // Si el docente actual no tiene competencia, resetear
      if (!competentes.some(d => d.id === formData.docenteId)) {
        setFormData(prev => ({ ...prev, docenteId: '' }));
      }
    } else {
      setDocentesCompetentes([]);
    }
  }, [formData.asignaturaId, formData.docenteId, docentes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAlumno = (alumnoId) => {
    setFormData(prev => ({
      ...prev,
      alumnoIds: prev.alumnoIds.includes(alumnoId)
        ? prev.alumnoIds.filter(id => id !== alumnoId)
        : [...prev.alumnoIds, alumnoId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.asignaturaId || !formData.docenteId) {
      return;
    }

    try {
      const grupoData = {
        nombre: formData.nombre.trim(),
        asignaturaId: formData.asignaturaId,
        docenteId: formData.docenteId,
        alumnoIds: formData.alumnoIds
      };

      const result = await createGrupo(grupoData);

      if (result.success) {
        // Limpiar formulario
        setFormData({
          nombre: '',
          asignaturaId: '',
          docenteId: '',
          alumnoIds: []
        });

        // Preguntar si desea crear otro grupo
        setTimeout(() => {
          setShowConfirm(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Error al crear grupo:', error);
    }
  };

  const handleConfirmCreateAnother = () => {
    setShowConfirm(false);
  };

  const handleCancelCreateAnother = () => {
    setShowConfirm(false);
    navigate('/groups');
  };

  const handleCancel = () => {
    navigate('/groups');
  };

  const selectedAsignatura = asignaturas.find(a => a.id === formData.asignaturaId);

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirmCreateAnother}
        onCancel={handleCancelCreateAnother}
        type="success"
        title="Group Created!"
        message="¿Deseas crear otro grupo?"
        confirmText="Sí, crear otro"
        cancelText="No, ir al dashboard"
      />

      <AdminLayout activeNavItem="groups">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4 sm:p-6">
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              Create New Group
            </p>
            <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
              Fill in the details to create a new group with subject, teacher and students.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 sm:space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Name */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Group Name *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full h-12 sm:h-14 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white placeholder-[#a19cba] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="e.g., 9A or Group A"
                  required
                />
                <p className="text-[#a19cba] text-xs mt-1.5">
                  Enter a unique identifier for this group
                </p>
              </div>

              {/* Subject */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Subject *
                </label>
                <select
                  name="asignaturaId"
                  value={formData.asignaturaId}
                  onChange={handleInputChange}
                  className="w-full h-12 sm:h-14 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  {asignaturas.map((asignatura) => (
                    <option key={asignatura.id} value={asignatura.id}>
                      {asignatura.nombre} - Semester {asignatura.cuatrimestre}
                    </option>
                  ))}
                </select>
                <p className="text-[#a19cba] text-xs mt-1.5">
                  Choose the subject this group will study
                </p>
              </div>

              {/* Teacher */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Assign Teacher *
                </label>
                <select
                  name="docenteId"
                  value={formData.docenteId}
                  onChange={handleInputChange}
                  disabled={!formData.asignaturaId}
                  className="w-full h-12 sm:h-14 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">
                    {!formData.asignaturaId ? 'Select a subject first' : 'Select a teacher'}
                  </option>
                  {docentesCompetentes.map((docente) => (
                    <option key={docente.id} value={docente.id}>
                      {docente.nombre}
                    </option>
                  ))}
                </select>
                {formData.asignaturaId && docentesCompetentes.length === 0 && (
                  <p className="text-yellow-400 text-xs mt-2 flex items-center gap-1">
                    <Icon name="warning" className="text-sm" />
                    No teachers have competency in "{selectedAsignatura?.nombre}"
                  </p>
                )}
                {formData.asignaturaId && docentesCompetentes.length > 0 && (
                  <p className="text-[#a19cba] text-xs mt-1.5">
                    {docentesCompetentes.length} qualified teacher(s) available for this subject
                  </p>
                )}
              </div>

              {/* Enroll Students */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Enroll Students (Optional)
                </label>
                <p className="text-[#a19cba] text-xs mb-3">
                  Select students to enroll in this group
                </p>

                {alumnos.length === 0 ? (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-[#a19cba] text-sm text-center">
                      No students available
                    </p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto bg-[#1d1b27] border border-[#3f3b54] rounded-lg p-4 space-y-2">
                    {alumnos.map((alumno) => (
                      <label
                        key={alumno.id}
                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.alumnoIds.includes(alumno.id)}
                          onChange={() => toggleAlumno(alumno.id)}
                          className="w-4 h-4 rounded border-[#3f3b54] bg-[#252233] text-primary focus:ring-primary focus:ring-offset-0"
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm">{alumno.nombre}</p>
                          <p className="text-[#a19cba] text-xs">
                            {alumno.matricula} • Semester {alumno.cuatrimestreActual}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {formData.alumnoIds.length > 0 && (
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
                    <Icon name="info" className="text-blue-400 text-xl shrink-0" />
                    <p className="text-blue-400 text-sm">
                      <strong>{formData.alumnoIds.length}</strong> student(s) will be enrolled in this group
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
                  disabled={loading || !formData.nombre.trim() || !formData.asignaturaId || !formData.docenteId}
                  className="w-full sm:flex-1 order-1 sm:order-2 px-6 py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  style={{
                    background: loading || !formData.nombre.trim() || !formData.asignaturaId || !formData.docenteId
                      ? '#3f3b54'
                      : 'linear-gradient(to right, #2563eb, #3b82f6)'
                  }}
                >
                  {loading ? (
                    <>
                      <Icon name="sync" className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Icon name="check_circle" />
                      Create Group
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

export default CreateGroupPage;

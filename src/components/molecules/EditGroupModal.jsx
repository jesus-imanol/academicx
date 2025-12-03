import { useState, useEffect } from 'react';
import Icon from '../atoms/Icon';
import { useAsignaturas } from '../../hooks/useAsignaturas';
import { useDocentes } from '../../hooks/useDocentes';
import { useAlumnos } from '../../hooks/useAlumnos';

const EditGroupModal = ({ group, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [asignaturaId, setAsignaturaId] = useState('');
  const [docenteId, setDocenteId] = useState('');
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [saving, setSaving] = useState(false);
  
  const { asignaturas, fetchAsignaturas } = useAsignaturas();
  const { docentes, fetchDocentes } = useDocentes();
  const { alumnos, fetchAlumnos } = useAlumnos();

  // Docentes filtrados por competencia
  const [docentesCompetentes, setDocentesCompetentes] = useState([]);

  useEffect(() => {
    if (group) {
      setNombre(group.nombre || '');
      setAsignaturaId(group.asignaturaId || '');
      setDocenteId(group.docenteId || '');
      setSelectedAlumnos(group.alumnos?.map((a) => a.id) || []);
    }
  }, [group]);

  useEffect(() => {
    fetchAsignaturas();
    fetchDocentes();
    fetchAlumnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Filtrar docentes que tienen competencia en la asignatura seleccionada
    if (asignaturaId && docentes.length > 0) {
      const competentes = docentes.filter(docente => 
        docente.asignaturasCompetencia?.some(asig => asig.id === asignaturaId)
      );
      setDocentesCompetentes(competentes);
      
      // Si el docente actual no tiene competencia, resetear
      if (!competentes.some(d => d.id === docenteId)) {
        setDocenteId('');
      }
    } else {
      setDocentesCompetentes([]);
    }
  }, [asignaturaId, docentes, docenteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !asignaturaId || !docenteId) return;

    setSaving(true);
    await onSave({
      nombre: nombre.trim(),
      asignaturaId,
      docenteId,
      alumnoIds: selectedAlumnos,
    });
    setSaving(false);
  };

  const toggleAlumno = (alumnoId) => {
    setSelectedAlumnos((prev) =>
      prev.includes(alumnoId)
        ? prev.filter((id) => id !== alumnoId)
        : [...prev, alumnoId]
    );
  };

  if (!group) return null;

  const selectedAsignatura = asignaturas.find(a => a.id === asignaturaId);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#252233] rounded-xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
              <Icon name="edit" className="text-primary text-xl" />
            </div>
            <h2 className="text-xl font-bold text-white">Edit Group</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Group Name */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Group Name *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white placeholder-[#a19cba] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 9A"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Subject *
              </label>
              <select
                value={asignaturaId}
                onChange={(e) => setAsignaturaId(e.target.value)}
                className="w-full h-12 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select a subject</option>
                {asignaturas.map((asignatura) => (
                  <option key={asignatura.id} value={asignatura.id}>
                    {asignatura.nombre} - Semester {asignatura.cuatrimestre}
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Teacher *
              </label>
              <select
                value={docenteId}
                onChange={(e) => setDocenteId(e.target.value)}
                disabled={!asignaturaId}
                className="w-full h-12 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                required
              >
                <option value="">
                  {!asignaturaId ? 'Select a subject first' : 'Select a teacher'}
                </option>
                {docentesCompetentes.map((docente) => (
                  <option key={docente.id} value={docente.id}>
                    {docente.nombre}
                  </option>
                ))}
              </select>
              {asignaturaId && docentesCompetentes.length === 0 && (
                <p className="text-yellow-400 text-xs mt-2">
                  ⚠️ No teachers have competency in "{selectedAsignatura?.nombre}"
                </p>
              )}
              {asignaturaId && docentesCompetentes.length > 0 && (
                <p className="text-[#a19cba] text-xs mt-2">
                  {docentesCompetentes.length} qualified teacher(s) available
                </p>
              )}
            </div>

            {/* Students */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Enrolled Students
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
                <div className="max-h-64 overflow-y-auto bg-[#1d1b27] border border-[#3f3b54] rounded-lg p-3 space-y-2">
                  {alumnos.map((alumno) => (
                    <label
                      key={alumno.id}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAlumnos.includes(alumno.id)}
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
              
              <div className="mt-2 text-sm text-[#a19cba]">
                {selectedAlumnos.length} student(s) selected
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !nombre.trim() || !asignaturaId || !docenteId}
              className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                background: saving || !nombre.trim() || !asignaturaId || !docenteId
                  ? '#3f3b54' 
                  : 'linear-gradient(to right, #2563eb, #3b82f6)'
              }}
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Icon name="sync" className="animate-spin" />
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGroupModal;

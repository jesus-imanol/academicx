import { useState, useEffect } from 'react';
import Icon from '../atoms/Icon';
import { useAsignaturas } from '../../hooks/useAsignaturas';

const EditTeacherModal = ({ teacher, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
  const [saving, setSaving] = useState(false);
  
  const { asignaturas, fetchAsignaturas, loading: loadingAsignaturas } = useAsignaturas();

  useEffect(() => {
    if (teacher) {
      setNombre(teacher.nombre || '');
      setSelectedAsignaturas(
        teacher.asignaturasCompetencia?.map((a) => a.id) || []
      );
    }
  }, [teacher]);

  useEffect(() => {
    fetchAsignaturas();
  }, [fetchAsignaturas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    setSaving(true);
    await onSave({
      nombre: nombre.trim(),
      asignaturasCompetenciaIds: selectedAsignaturas,
    });
    setSaving(false);
  };

  const toggleAsignatura = (asignaturaId) => {
    setSelectedAsignaturas((prev) =>
      prev.includes(asignaturaId)
        ? prev.filter((id) => id !== asignaturaId)
        : [...prev, asignaturaId]
    );
  };

  if (!teacher) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#252233] rounded-xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
              <Icon name="edit" className="text-primary text-xl" />
            </div>
            <h2 className="text-xl font-bold text-white">Edit Teacher</h2>
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
            {/* Teacher Name */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Full Name *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 bg-[#1d1b27] border border-[#3f3b54] rounded-lg px-4 text-white placeholder-[#a19cba] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Dr. Carlos Martínez López"
                required
              />
            </div>

            {/* Competencies Selection */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Teaching Competencies (Subjects)
              </label>
              <p className="text-[#a19cba] text-xs mb-3">
                Select the subjects this teacher is qualified to teach
              </p>
              
              {loadingAsignaturas ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : asignaturas.length === 0 ? (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-[#a19cba] text-sm text-center">
                    No subjects available
                  </p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto bg-[#1d1b27] border border-[#3f3b54] rounded-lg p-3 space-y-2">
                  {asignaturas.map((asignatura) => (
                    <label
                      key={asignatura.id}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAsignaturas.includes(asignatura.id)}
                        onChange={() => toggleAsignatura(asignatura.id)}
                        className="w-4 h-4 rounded border-[#3f3b54] bg-[#252233] text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm">{asignatura.nombre}</p>
                        <p className="text-[#a19cba] text-xs">
                          Semester {asignatura.cuatrimestre} • {asignatura.programaEstudio?.nombre}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              
              <div className="mt-2 text-sm text-[#a19cba]">
                {selectedAsignaturas.length} subject(s) selected
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
              disabled={saving || !nombre.trim()}
              className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                background: saving || !nombre.trim() 
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

export default EditTeacherModal;

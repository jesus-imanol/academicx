import { useEffect, useState } from 'react';
import Icon from '../atoms/Icon';

const TeacherDetailModal = ({ teacher, onClose }) => {
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    // Cargar asignaturas competencia si el teacher las tiene
    if (teacher?.asignaturasCompetencia) {
      setAsignaturas(teacher.asignaturasCompetencia);
    }
  }, [teacher]);

  if (!teacher) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
              <Icon name="person" className="text-primary text-xl" />
            </div>
            <h2 className="text-xl font-bold text-white">Teacher Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#a19cba] text-sm mb-1">ID</p>
              <p className="text-white font-mono text-sm">{teacher.id}</p>
            </div>
            <div>
              <p className="text-[#a19cba] text-sm mb-1">Full Name</p>
              <p className="text-white font-semibold">{teacher.nombre}</p>
            </div>
          </div>

          {/* Competencias Section */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="import_contacts" className="text-cyan-500" />
              <h3 className="text-white font-semibold">Teaching Competencies</h3>
            </div>
            {asignaturas && asignaturas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {asignaturas.map((asignatura) => (
                  <div
                    key={asignatura.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <p className="text-white text-sm font-medium">{asignatura.nombre}</p>
                    <p className="text-[#a19cba] text-xs mt-1">
                      Semester {asignatura.cuatrimestre}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-[#a19cba] text-sm text-center">
                  No competencies assigned yet
                </p>
              </div>
            )}
            <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-blue-400 text-sm">
                <strong>{asignaturas?.length || 0}</strong> subject(s) this teacher can teach
              </p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-white/10 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#a19cba] text-sm mb-1">Created At</p>
                <p className="text-white">{formatDate(teacher.createdAt)}</p>
              </div>
              <div>
                <p className="text-[#a19cba] text-sm mb-1">Last Updated</p>
                <p className="text-white">{formatDate(teacher.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailModal;

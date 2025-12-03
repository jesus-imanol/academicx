import { useEffect, useState } from 'react';
import Icon from '../atoms/Icon';

const GroupDetailModal = ({ group, onClose }) => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    if (group?.alumnos) {
      setAlumnos(group.alumnos);
    }
  }, [group]);

  if (!group) return null;

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
              <Icon name="groups" className="text-primary text-xl" />
            </div>
            <h2 className="text-xl font-bold text-white">Group Details</h2>
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
              <p className="text-white font-mono text-sm">{group.id}</p>
            </div>
            <div>
              <p className="text-[#a19cba] text-sm mb-1">Group Name</p>
              <p className="text-white font-semibold text-lg">{group.nombre}</p>
            </div>
          </div>

          {/* Subject Info */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="import_contacts" className="text-cyan-500" />
              <h3 className="text-white font-semibold">Subject</h3>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-white font-medium">{group.asignaturaNombreSnapshot}</p>
              <p className="text-[#a19cba] text-sm mt-1">
                Subject ID: <span className="font-mono text-xs">{group.asignaturaId}</span>
              </p>
            </div>
          </div>

          {/* Teacher Info */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="person" className="text-green-500" />
              <h3 className="text-white font-semibold">Teacher</h3>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-white font-medium">{group.docenteNombreSnapshot}</p>
              <p className="text-[#a19cba] text-sm mt-1">
                Teacher ID: <span className="font-mono text-xs">{group.docenteId}</span>
              </p>
            </div>
          </div>

          {/* Enrolled Students */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="group" className="text-purple-500" />
              <h3 className="text-white font-semibold">Enrolled Students</h3>
            </div>
            {alumnos && alumnos.length > 0 ? (
              <div className="space-y-2">
                {alumnos.map((alumno) => (
                  <div
                    key={alumno.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{alumno.nombre}</p>
                      <p className="text-[#a19cba] text-xs">
                        {alumno.matricula} • Semester {alumno.cuatrimestreActual}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-3 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <p className="text-purple-400 text-sm">
                    <strong>{alumnos.length}</strong> student(s) enrolled in this group
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-[#a19cba] text-sm text-center">
                  No students enrolled yet
                </p>
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="border-t border-white/10 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#a19cba] text-sm mb-1">Created At</p>
                <p className="text-white">{formatDate(group.createdAt)}</p>
              </div>
              <div>
                <p className="text-[#a19cba] text-sm mb-1">Last Updated</p>
                <p className="text-white">{formatDate(group.updatedAt)}</p>
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

export default GroupDetailModal;

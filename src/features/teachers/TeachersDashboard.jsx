import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import { useDocentes } from '../../hooks/useDocentes';
import { useAsignaturas } from '../../hooks/useAsignaturas';
import { TeacherDetailModal, EditTeacherModal } from '../../components/molecules';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';

const TeachersDashboard = () => {
  const { 
    docentes, 
    loading, 
    error, 
    fetchDocentes,
    fetchDocentesCount,
    fetchDocenteById,
    updateDocente,
    deleteDocente
  } = useDocentes();
  
  const { fetchAsignaturasCount } = useAsignaturas();
  
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  
  const [totalCount, setTotalCount] = useState(0);
  const [totalAsignaturas, setTotalAsignaturas] = useState(0);
  const [filterAsignatura, setFilterAsignatura] = useState('all');

  // Cargar docentes al montar
  useEffect(() => {
    const loadData = async () => {
      await fetchDocentes();
      const count = await fetchDocentesCount();
      const asignaturasCount = await fetchAsignaturasCount();
      setTotalCount(count);
      setTotalAsignaturas(asignaturasCount);
    };
    
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manejar vista de detalles
  const handleViewDetails = async (teacher) => {
    try {
      const fullTeacher = await fetchDocenteById(teacher.id);
      setSelectedTeacher(fullTeacher);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error loading teacher details:', err);
    }
  };

  // Manejar edición
  const handleEdit = async (teacher) => {
    try {
      const fullTeacher = await fetchDocenteById(teacher.id);
      setEditingTeacher(fullTeacher);
      setShowEditModal(true);
    } catch (err) {
      console.error('Error loading teacher for edit:', err);
    }
  };

  // Guardar cambios de edición
  const handleSaveEdit = async (updatedData) => {
    const result = await updateDocente(editingTeacher.id, updatedData);
    if (result.success) {
      setShowEditModal(false);
      setEditingTeacher(null);
      fetchDocentes(); // Refrescar lista
    }
  };

  // Manejar eliminación
  const handleDelete = (teacher) => {
    setConfirmDialog({
      type: 'warning',
      title: 'Delete Teacher',
      message: `Are you sure you want to delete "${teacher.nombre}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          await deleteDocente(teacher.id);
          setConfirmDialog(null);
        } catch (err) {
          console.error('Error deleting teacher:', err);
        }
      },
      onCancel: () => setConfirmDialog(null),
    });
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Contar competencias
  const getTotalCompetencias = () => {
    return docentes.reduce((acc, teacher) => {
      return acc + (teacher.asignaturasCompetencia?.length || 0);
    }, 0);
  };

  return (
    <AdminLayout activeNavItem="teachers">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-4 p-4 sm:p-6 items-start sm:items-center">
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
            Teachers Management
          </p>
          <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
            Manage teachers and their teaching competencies
          </p>
        </div>
        
        <Link
          to="/teachers/register"
          className="flex items-center gap-2 w-full sm:w-auto min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-4 sm:px-6 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #2563eb, #3b82f6)'
          }}
        >
          <Icon name="add" />
          <span className="truncate">Register Teacher</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6">
        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/20">
              <Icon name="group" className="text-primary text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">Total Teachers</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : totalCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Icon name="import_contacts" className="text-cyan-500 text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">Available Subjects</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : totalAsignaturas}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-fuchsia-600/20">
              <Icon name="school" className="text-fuchsia-600 text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">Total Competencies</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : getTotalCompetencias()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Registered Teachers</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-[#a19cba] mt-2">Loading teachers...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <Icon name="error" className="text-red-500 text-4xl mb-2" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : docentes.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="group" className="text-[#a19cba] text-4xl mb-2" />
            <p className="text-[#a19cba]">No teachers registered yet</p>
            <Link
              to="/teachers/register"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
            >
              <Icon name="add" />
              Register First Teacher
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pl-4 sm:pl-0">Name</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden lg:table-cell">Competencies</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden md:table-cell">Created Date</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pr-4 sm:pr-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docentes.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm pl-4 sm:pl-0">
                      <div className="flex items-center gap-2">
                        <Icon name="person" className="text-primary" />
                        {teacher.nombre}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm hidden lg:table-cell">
                      <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
                        {teacher.asignaturasCompetencia?.length || 0} subjects
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm hidden md:table-cell">
                      {formatDate(teacher.createdAt)}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 sm:pr-0">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(teacher)}
                          className="text-white/70 hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <Icon name="visibility" className="text-base" />
                        </button>
                        <button 
                          onClick={() => handleEdit(teacher)}
                          className="text-white/70 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Icon name="edit" className="text-base" />
                        </button>
                        <button 
                          onClick={() => handleDelete(teacher)}
                          className="text-white/70 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Icon name="delete" className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {showDetailModal && selectedTeacher && (
        <TeacherDetailModal
          teacher={selectedTeacher}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedTeacher(null);
          }}
        />
      )}

      {showEditModal && editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          onClose={() => {
            setShowEditModal(false);
            setEditingTeacher(null);
          }}
          onSave={handleSaveEdit}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </AdminLayout>
  );
};

export default TeachersDashboard;

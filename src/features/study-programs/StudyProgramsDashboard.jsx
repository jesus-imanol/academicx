import { Link } from 'react-router';
import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import ProgramDetailModal from '../../components/molecules/ProgramDetailModal';
import EditProgramModal from '../../components/molecules/EditProgramModal';
import { useProgramasEstudio } from '../../hooks/useProgramasEstudio';
import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../contexts/LanguageContext';

const StudyProgramsDashboard = () => {
  const { programas, loading, error, updatePrograma, deletePrograma } = useProgramasEstudio();
  const { showSuccess, showError } = useToast();
  const { t } = useLanguage();
  const [deleting, setDeleting] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [programaToDelete, setProgramaToDelete] = useState(null);
  
  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPrograma, setSelectedPrograma] = useState(null);

  const handleViewDetails = (programa) => {
    setSelectedPrograma(programa);
    setShowDetailModal(true);
  };

  const handleEditClick = (programa) => {
    setSelectedPrograma(programa);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      const result = await updatePrograma(id, updatedData);
      if (result.success) {
        setShowEditModal(false);
        setSelectedPrograma(null);
        showSuccess(t('studyPrograms.messages.updateSuccess'));
      } else {
        showError(result.error || t('studyPrograms.messages.updateError'));
      }
    } catch (error) {
      console.error('Error updating programa:', error);
      showError(t('studyPrograms.messages.updateError'));
    }
  };

  const handleDeleteClick = (programa) => {
    setProgramaToDelete(programa);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!programaToDelete) return;

    setShowDeleteConfirm(false);
    setDeleting(programaToDelete.id);
    const result = await deletePrograma(programaToDelete.id);
    setDeleting(null);
    setProgramaToDelete(null);

    if (result.success) {
      showSuccess(t('studyPrograms.messages.deleteSuccess'));
    } else {
      showError(result.error || t('studyPrograms.messages.deleteError'));
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setProgramaToDelete(null);
  };

  return (
    <AdminLayout activeNavItem="study-programs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-4 p-4 sm:p-6 items-start sm:items-center">
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
            {t('studyPrograms.title')}
          </p>
          <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
            {t('studyPrograms.subtitle')}
          </p>
        </div>
        
        <Link
          to="/study-programs/create"
          className="flex items-center gap-2 w-full sm:w-auto min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-4 sm:px-6 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #2563eb, #3b82f6)'
          }}
        >
          <Icon name="add" />
          <span className="truncate">{t('studyPrograms.createButton')}</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6">
        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/20">
              <Icon name="school" className="text-primary text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">{t('studyPrograms.stats.totalPrograms')}</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : programas.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Icon name="schedule" className="text-cyan-500 text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">{t('studyPrograms.stats.totalSemesters')}</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : programas.reduce((acc, p) => acc + (p.cantidadCuatrimestres || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-fuchsia-600/20">
              <Icon name="trending_up" className="text-fuchsia-600 text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">{t('studyPrograms.stats.active')}</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : programas.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{t('studyPrograms.table.title')}</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-[#a19cba] mt-2">{t('common.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <Icon name="error" className="text-red-500 text-4xl mb-2" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : programas.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="school" className="text-[#a19cba] text-4xl mb-2" />
            <p className="text-[#a19cba]">{t('home.empty.noData')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pl-4 sm:pl-0">{t('studyPrograms.table.program')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3">{t('studyPrograms.table.semesters')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden md:table-cell">{t('studyPrograms.table.created')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pr-4 sm:pr-0">{t('common.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {programas.map((programa) => (
                  <tr key={programa.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm font-medium pl-4 sm:pl-0">
                      <div className="flex items-center gap-2">
                        <Icon name="school" className="text-primary" />
                        {programa.nombre}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm">
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                        {programa.cantidadCuatrimestres}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm hidden md:table-cell">
                      {programa.createdAt ? new Date(programa.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 sm:pr-0">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(programa)}
                          className="text-white/70 hover:text-primary transition-colors"
                          title="Ver detalles"
                        >
                          <Icon name="visibility" className="text-base" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(programa)}
                          className="text-white/70 hover:text-blue-500 transition-colors"
                          title="Editar"
                        >
                          <Icon name="edit" className="text-base" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(programa)}
                          disabled={deleting === programa.id}
                          className="text-white/70 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="Eliminar"
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
      <ProgramDetailModal
        isOpen={showDetailModal}
        programa={selectedPrograma}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedPrograma(null);
        }}
      />

      <EditProgramModal
        isOpen={showEditModal}
        programa={selectedPrograma}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPrograma(null);
        }}
        onSave={handleSaveEdit}
      />

      {showDeleteConfirm && programaToDelete && (
        <ConfirmDialog
          type="warning"
          title={t('studyPrograms.messages.deleteConfirm')}
          message={t('studyPrograms.messages.deleteMessage').replace('{name}', programaToDelete?.nombre)}
          confirmText={t('common.yes') + ', ' + t('common.delete').toLowerCase()}
          cancelText={t('common.cancel')}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </AdminLayout>
  );
};

export default StudyProgramsDashboard;

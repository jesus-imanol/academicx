import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import { useGrupos } from '../../hooks/useGrupos';
import { GroupDetailModal, EditGroupModal } from '../../components/molecules';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import { useLanguage } from '../../contexts/LanguageContext';

const GroupsDashboard = () => {
  const { t } = useLanguage();
  const {
    grupos,
    loading,
    error,
    fetchGrupos,
    fetchGruposCount,
    fetchGrupoById,
    updateGrupo,
    deleteGrupo
  } = useGrupos();

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [totalCount, setTotalCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      await fetchGrupos();
      const count = await fetchGruposCount();
      setTotalCount(count);
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Calculate total students
    const total = grupos.reduce((acc, grupo) => {
      return acc + (grupo.alumnos?.length || 0);
    }, 0);
    setTotalStudents(total);
  }, [grupos]);

  const handleViewDetails = async (group) => {
    try {
      const fullGroup = await fetchGrupoById(group.id);
      setSelectedGroup(fullGroup);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error loading group details:', err);
    }
  };

  const handleEdit = async (group) => {
    try {
      const fullGroup = await fetchGrupoById(group.id);
      setEditingGroup(fullGroup);
      setShowEditModal(true);
    } catch (err) {
      console.error('Error loading group for edit:', err);
    }
  };

  const handleSaveEdit = async (updatedData) => {
    const result = await updateGrupo(editingGroup.id, updatedData);
    if (result.success) {
      setShowEditModal(false);
      setEditingGroup(null);
      fetchGrupos();
    }
  };

  const handleDelete = (group) => {
    setConfirmDialog({
      type: 'warning',
      title: t('groups.messages.deleteConfirm.title'),
      message: t('groups.messages.deleteConfirm.message', { name: group.nombre }),
      confirmText: t('common.actions.delete'),
      cancelText: t('common.actions.cancel'),
      onConfirm: async () => {
        try {
          await deleteGrupo(group.id);
          setConfirmDialog(null);
        } catch (err) {
          console.error('Error deleting group:', err);
        }
      },
      onCancel: () => setConfirmDialog(null),
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Count unique subjects
  const uniqueSubjects = [...new Set(grupos.map(g => g.asignaturaId))].length;

  return (
    <AdminLayout activeNavItem="groups">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-4 p-4 sm:p-6 items-start sm:items-center">
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
            {t('groups.title')}
          </p>
          <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
            {t('groups.subtitle')}
          </p>
        </div>

        <Link
          to="/groups/create"
          className="flex items-center gap-2 w-full sm:w-auto min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-4 sm:px-6 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #2563eb, #3b82f6)'
          }}
        >
          <Icon name="add" />
          <span className="truncate">{t('groups.createButton')}</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6">
        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/20">
              <Icon name="groups" className="text-primary text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">{t('groups.stats.totalGroups')}</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : totalCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Icon name="group" className="text-cyan-500 text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">{t('groups.stats.enrolledStudents')}</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : totalStudents}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-fuchsia-600/20">
              <Icon name="import_contacts" className="text-fuchsia-600 text-xl sm:text-2xl" />
            </div>
            <div>
              <p className="text-[#a19cba] text-xs sm:text-sm">{t('groups.stats.activeSubjects')}</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {loading ? '...' : uniqueSubjects}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{t('groups.table.title')}</h3>

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
        ) : grupos.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="groups" className="text-[#a19cba] text-4xl mb-2" />
            <p className="text-[#a19cba]">{t('groups.messages.noGroups')}</p>
            <Link
              to="/groups/create"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
            >
              <Icon name="add" />
              {t('groups.messages.createFirst')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pl-4 sm:pl-0">{t('groups.table.group')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3">{t('groups.table.subject')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden lg:table-cell">{t('groups.table.teacher')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden md:table-cell">{t('common.table.created')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3">{t('groups.table.students')}</th>
                  <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pr-4 sm:pr-0">{t('common.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {grupos.map((group) => (
                  <tr key={group.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm font-medium pl-4 sm:pl-0">
                      <div className="flex items-center gap-2">
                        <Icon name="groups" className="text-primary" />
                        {group.nombre}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm">
                      {group.asignaturaNombreSnapshot}
                    </td>
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm hidden lg:table-cell">
                      {group.docenteNombreSnapshot}
                    </td>
                    <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm hidden md:table-cell">
                      {formatDate(group.createdAt)}
                    </td>
                    <td className="py-3 sm:py-4 text-white text-xs sm:text-sm">
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                        {group.alumnos?.length || 0}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 pr-4 sm:pr-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(group)}
                          className="text-white/70 hover:text-primary transition-colors"
                          title={t('common.actions.view')}
                        >
                          <Icon name="visibility" className="text-base" />
                        </button>
                        <button
                          onClick={() => handleEdit(group)}
                          className="text-white/70 hover:text-white transition-colors"
                          title={t('common.actions.edit')}
                        >
                          <Icon name="edit" className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(group)}
                          className="text-white/70 hover:text-red-500 transition-colors"
                          title={t('common.actions.delete')}
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
      {showDetailModal && selectedGroup && (
        <GroupDetailModal
          group={selectedGroup}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedGroup(null);
          }}
        />
      )}

      {showEditModal && editingGroup && (
        <EditGroupModal
          group={editingGroup}
          onClose={() => {
            setShowEditModal(false);
            setEditingGroup(null);
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

export default GroupsDashboard;

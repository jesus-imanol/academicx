import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import SubjectDetailModal from '../../components/molecules/SubjectDetailModal';
import EditSubjectModal from '../../components/molecules/EditSubjectModal';
import { useAsignaturas } from '../../hooks/useAsignaturas';
import { useProgramasEstudio } from '../../hooks/useProgramasEstudio';
import { useLanguage } from '../../contexts/LanguageContext';

const SubjectsDashboard = () => {
  const { t } = useLanguage();
  const {
    asignaturas,
    loading,
    fetchAsignaturas,
    fetchAsignaturasCount,
    fetchAsignaturasByCuatrimestre,
    fetchAsignaturasByPrograma,
    fetchAsignaturasByProgramaAndCuatrimestre,
    updateAsignatura,
    deleteAsignatura
  } = useAsignaturas();

  const { programas } = useProgramasEstudio();

  const [totalCount, setTotalCount] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [asignaturaToDelete, setAsignaturaToDelete] = useState(null);
  
  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);
  
  // Filter states
  const [filterPrograma, setFilterPrograma] = useState('all');
  const [filterCuatrimestre, setFilterCuatrimestre] = useState('all');
  const [filteredAsignaturas, setFilteredAsignaturas] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [asignaturas, filterPrograma, filterCuatrimestre]);

  const loadData = async () => {
    await fetchAsignaturas();
    const count = await fetchAsignaturasCount();
    setTotalCount(count);
  };

  const applyFilters = async () => {
    setSearching(true);
    try {
      let filtered = [];

      if (filterPrograma !== 'all' && filterCuatrimestre !== 'all') {
        // Filtrar por programa Y cuatrimestre
        filtered = await fetchAsignaturasByProgramaAndCuatrimestre(filterPrograma, parseInt(filterCuatrimestre));
      } else if (filterPrograma !== 'all') {
        // Solo filtrar por programa
        filtered = await fetchAsignaturasByPrograma(filterPrograma);
      } else if (filterCuatrimestre !== 'all') {
        // Solo filtrar por cuatrimestre
        filtered = await fetchAsignaturasByCuatrimestre(parseInt(filterCuatrimestre));
      } else {
        // Sin filtros
        filtered = asignaturas;
      }

      setFilteredAsignaturas(filtered);
    } catch (error) {
      console.error('Error applying filters:', error);
      setFilteredAsignaturas([]);
    } finally {
      setSearching(false);
    }
  };

  const handleClearFilters = async () => {
    setFilterPrograma('all');
    setFilterCuatrimestre('all');
    await loadData();
  };

  const handleViewDetails = (asignatura) => {
    setSelectedAsignatura(asignatura);
    setShowDetailModal(true);
  };

  const handleEditClick = (asignatura) => {
    setSelectedAsignatura(asignatura);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (id, updatedData) => {
    const result = await updateAsignatura(id, updatedData);
    if (result.success) {
      setShowEditModal(false);
      setSelectedAsignatura(null);
      await loadData();
    }
  };

  const handleDeleteClick = (asignatura) => {
    setAsignaturaToDelete(asignatura);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!asignaturaToDelete) return;

    setShowDeleteConfirm(false);
    try {
      await deleteAsignatura(asignaturaToDelete.id);
      setAsignaturaToDelete(null);
      const count = await fetchAsignaturasCount();
      setTotalCount(count);
    } catch (error) {
      console.error('Error deleting asignatura:', error);
      setAsignaturaToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setAsignaturaToDelete(null);
  };

  const displayAsignaturas = (filterPrograma !== 'all' || filterCuatrimestre !== 'all') 
    ? filteredAsignaturas 
    : asignaturas;

  const getProgramaName = (programaId) => {
    const programa = programas.find(p => p.id === programaId);
    return programa?.nombre || 'N/A';
  };

  const getSelectedPrograma = (asignatura) => {
    return programas.find(p => p.id === asignatura?.programaEstudioId);
  };

  const getMaxCuatrimestre = () => {
    if (filterPrograma === 'all') return 10;
    const programa = programas.find(p => p.id === filterPrograma);
    return programa?.cantidadCuatrimestres || 10;
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title={t('subjects.messages.deleteConfirm.title')}
        message={t('subjects.messages.deleteConfirm.message', { name: asignaturaToDelete?.nombre })}
        confirmText={t('common.actions.delete')}
        cancelText={t('common.actions.cancel')}
        type="warning"
      />

      <SubjectDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedAsignatura(null);
        }}
        asignatura={selectedAsignatura}
        programa={getSelectedPrograma(selectedAsignatura)}
      />

      <EditSubjectModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAsignatura(null);
        }}
        onSave={handleSaveEdit}
        asignatura={selectedAsignatura}
        programas={programas}
      />

      <AdminLayout activeNavItem="subjects">
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-4 p-4 sm:p-6 items-start sm:items-center">
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              {t('subjects.title')}
            </p>
            <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
              {t('subjects.subtitle')}
            </p>
          </div>
          
          <Link
            to="/subjects/create"
            className="flex items-center gap-2 w-full sm:w-auto min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-4 sm:px-6 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #2563eb, #3b82f6)'
            }}
          >
            <Icon name="add" />
            <span className="truncate">{t('subjects.createButton')}</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 mt-4 sm:mt-6">
          <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/20">
                <Icon name="import_contacts" className="text-primary text-xl sm:text-2xl" />
              </div>
              <div>
                <p className="text-[#a19cba] text-xs sm:text-sm">{t('subjects.stats.totalSubjects')}</p>
                <p className="text-white text-xl sm:text-2xl font-bold">
                  {loading ? '...' : totalCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-cyan-500/20">
                <Icon name="school" className="text-cyan-500 text-xl sm:text-2xl" />
              </div>
              <div>
                <p className="text-[#a19cba] text-xs sm:text-sm">{t('subjects.stats.studyPrograms')}</p>
                <p className="text-white text-xl sm:text-2xl font-bold">
                  {loading ? '...' : programas.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-fuchsia-600/20">
                <Icon name="filter_alt" className="text-fuchsia-600 text-xl sm:text-2xl" />
              </div>
              <div>
                <p className="text-[#a19cba] text-xs sm:text-sm">{t('subjects.stats.filteredResults')}</p>
                <p className="text-white text-xl sm:text-2xl font-bold">
                  {loading ? '...' : displayAsignaturas.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter by Program */}
            <div className="flex-1">
              <label className="text-white text-sm font-medium mb-2 block">
                {t('subjects.filters.byProgram')}
              </label>
              <select
                value={filterPrograma}
                onChange={(e) => setFilterPrograma(e.target.value)}
                className="w-full form-input resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-11 px-4 text-sm"
              >
                <option value="all">{t('subjects.filters.allPrograms')}</option>
                {programas.map(programa => (
                  <option key={programa.id} value={programa.id}>
                    {programa.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Cuatrimestre */}
            <div className="flex-1">
              <label className="text-white text-sm font-medium mb-2 block">
                {t('subjects.filters.bySemester')}
              </label>
              <select
                value={filterCuatrimestre}
                onChange={(e) => setFilterCuatrimestre(e.target.value)}
                className="w-full form-input resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-11 px-4 text-sm"
              >
                <option value="all">{t('subjects.filters.allSemesters')}</option>
                {Array.from({ length: getMaxCuatrimestre() }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}° Cuatrimestre</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                disabled={searching}
                className="flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-transparent text-[#a19cba] font-medium border border-white/10 hover:border-[#a19cba] hover:text-white transition-all duration-200 w-full lg:w-auto disabled:opacity-50"
              >
                <Icon name="refresh" className={searching ? "animate-spin" : ""} />
                <span>{t('subjects.filters.clear')}</span>
              </button>
            </div>
          </div>

          {/* Active filters indicator */}
          {(filterPrograma !== 'all' || filterCuatrimestre !== 'all') && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Icon name="filter_alt" className="text-primary" />
              <span className="text-[#a19cba]">
                {t('subjects.filters.showing', { count: displayAsignaturas.length, total: totalCount })}
              </span>
            </div>
          )}
        </div>

        {/* Subjects Table */}
        <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{t('subjects.table.title')}</h3>
          
          {loading || searching ? (
            <div className="flex items-center justify-center py-12">
              <Icon name="sync" className="animate-spin text-primary text-4xl" />
              <span className="ml-3 text-white/60">{t('common.loading')}</span>
            </div>
          ) : displayAsignaturas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Icon name="import_contacts" className="text-white/20 text-6xl mb-4" />
              <p className="text-white/60 text-lg">
                {(filterPrograma !== 'all' || filterCuatrimestre !== 'all')
                  ? t('subjects.messages.noResults')
                  : t('subjects.messages.noSubjects')
                }
              </p>
              {filterPrograma === 'all' && filterCuatrimestre === 'all' && (
                <Link
                  to="/subjects/create"
                  className="mt-4 text-primary hover:text-primary/80 transition-colors"
                >
                  {t('subjects.messages.createFirst')}
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pl-4 sm:pl-0">{t('subjects.table.subject')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3">{t('subjects.table.semester')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden lg:table-cell">{t('subjects.table.program')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden md:table-cell">{t('common.table.created')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pr-4 sm:pr-0">{t('common.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {displayAsignaturas.map((asignatura) => (
                    <tr key={asignatura.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 sm:py-4 text-white text-xs sm:text-sm font-medium pl-4 sm:pl-0">
                        {asignatura.nombre}
                      </td>
                      <td className="py-3 sm:py-4 text-white text-xs sm:text-sm">
                        {asignatura.cuatrimestre}°
                      </td>
                      <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm hidden lg:table-cell">
                        {getProgramaName(asignatura.programaEstudioId)}
                      </td>
                      <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm hidden md:table-cell">
                        {new Date(asignatura.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 sm:py-4 pr-4 sm:pr-0">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewDetails(asignatura)}
                            className="text-white/70 hover:text-primary transition-colors"
                            title={t('subjects.tooltips.viewDetails')}
                          >
                            <Icon name="visibility" className="text-base" />
                          </button>
                          <button 
                            onClick={() => handleEditClick(asignatura)}
                            className="text-white/70 hover:text-blue-500 transition-colors"
                            title={t('subjects.tooltips.editSubject')}
                          >
                            <Icon name="edit" className="text-base" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(asignatura)}
                            className="text-white/70 hover:text-red-500 transition-colors"
                            title={t('subjects.tooltips.deleteSubject')}
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
      </AdminLayout>
    </>
  );
};

export default SubjectsDashboard;

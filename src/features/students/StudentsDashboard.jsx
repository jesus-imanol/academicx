import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import Icon from '../../components/atoms/Icon';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import StudentDetailModal from '../../components/molecules/StudentDetailModal';
import EditStudentModal from '../../components/molecules/EditStudentModal';
import { useAlumnos } from '../../hooks/useAlumnos';
import { useLanguage } from '../../contexts/LanguageContext';

const StudentsDashboard = () => {
  const { t } = useLanguage();
  const { 
    alumnos, 
    loading, 
    fetchAlumnos, 
    fetchAlumnosCount, 
    fetchAlumnoByMatricula,
    fetchAlumnosByCuatrimestre,
    updateAlumno,
    deleteAlumno 
  } = useAlumnos();
  const [totalCount, setTotalCount] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);
  
  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  
  // Filter states
  const [searchMatricula, setSearchMatricula] = useState('');
  const [filterCuatrimestre, setFilterCuatrimestre] = useState('all');
  const [filteredAlumnos, setFilteredAlumnos] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [alumnos, filterCuatrimestre]);

  const loadData = async () => {
    await fetchAlumnos();
    const count = await fetchAlumnosCount();
    setTotalCount(count);
  };

  const applyFilters = () => {
    let filtered = [...alumnos];
    
    if (filterCuatrimestre !== 'all') {
      filtered = filtered.filter(
        alumno => alumno.cuatrimestreActual === parseInt(filterCuatrimestre)
      );
    }
    
    setFilteredAlumnos(filtered);
  };

  const handleSearchByMatricula = async () => {
    if (!searchMatricula.trim()) {
      await loadData();
      return;
    }

    setSearching(true);
    try {
      const alumno = await fetchAlumnoByMatricula(searchMatricula.trim());
      setFilteredAlumnos([alumno]);
    } catch (error) {
      setFilteredAlumnos([]);
    } finally {
      setSearching(false);
    }
  };

  const handleClearFilters = async () => {
    setSearchMatricula('');
    setFilterCuatrimestre('all');
    await loadData();
  };

  const handleViewDetails = (alumno) => {
    setSelectedAlumno(alumno);
    setShowDetailModal(true);
  };

  const handleEditClick = (alumno) => {
    setSelectedAlumno(alumno);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateAlumno(id, updatedData);
      setShowEditModal(false);
      setSelectedAlumno(null);
      await loadData();
    } catch (error) {
      console.error('Error updating alumno:', error);
    }
  };

  const handleDeleteClick = (alumno) => {
    setAlumnoToDelete(alumno);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!alumnoToDelete) return;

    setShowDeleteConfirm(false);
    try {
      await deleteAlumno(alumnoToDelete.id);
      setAlumnoToDelete(null);
      // Actualizar el conteo
      const count = await fetchAlumnosCount();
      setTotalCount(count);
    } catch (error) {
      console.error('Error deleting alumno:', error);
      setAlumnoToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setAlumnoToDelete(null);
  };

  const calculateTotalEnrollments = () => {
    // Por ahora retornamos un cálculo simulado
    // Esto se debería calcular desde el backend cuando implementes materias
    return alumnos.length * 5; // Promedio de 5 materias por alumno
  };

  const displayAlumnos = searchMatricula ? filteredAlumnos : (filterCuatrimestre !== 'all' ? filteredAlumnos : alumnos);

  return (
    <AdminLayout activeNavItem="students">
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-4 p-4 sm:p-6 items-start sm:items-center">
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              {t('students.title')}
            </p>
            <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
              {t('students.subtitle')}
            </p>
          </div>
          
          <Link
            to="/students/register"
            className="flex items-center gap-2 w-full sm:w-auto min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-11 px-4 sm:px-6 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #2563eb, #3b82f6)'
            }}
          >
            <Icon name="add" />
            <span className="truncate">{t('students.registerButton')}</span>
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
                <p className="text-[#a19cba] text-xs sm:text-sm">{t('students.stats.totalStudents')}</p>
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
                <p className="text-[#a19cba] text-xs sm:text-sm">{t('students.stats.activeEnrollments')}</p>
                <p className="text-white text-xl sm:text-2xl font-bold">
                  {loading ? '...' : calculateTotalEnrollments()}
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
                <p className="text-[#a19cba] text-xs sm:text-sm">{t('students.stats.totalCourses')}</p>
                <p className="text-white text-xl sm:text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search by Matricula */}
            <div className="flex-1">
              <label className="text-white text-sm font-medium mb-2 block">
                {t('students.filters.searchByEnrollment')}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchMatricula}
                  onChange={(e) => setSearchMatricula(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchByMatricula()}
                  placeholder="A20240001"
                  className="flex-1 form-input resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-11 placeholder:text-[#a19cba] px-4 text-sm"
                />
                <button
                  onClick={handleSearchByMatricula}
                  disabled={searching || !searchMatricula.trim()}
                  className="flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-primary hover:bg-primary/80 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Icon name={searching ? "sync" : "search"} className={searching ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">{t('common.actions.search')}</span>
                </button>
              </div>
            </div>

            {/* Filter by Cuatrimestre */}
            <div className="flex-1">
              <label className="text-white text-sm font-medium mb-2 block">
                {t('students.filters.bySemester')}
              </label>
              <select
                value={filterCuatrimestre}
                onChange={(e) => setFilterCuatrimestre(e.target.value)}
                className="w-full form-input resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-11 px-4 text-sm"
              >
                <option value="all">{t('students.filters.allSemesters')}</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}° Cuatrimestre</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-transparent text-[#a19cba] font-medium border border-white/10 hover:border-[#a19cba] hover:text-white transition-all duration-200 w-full lg:w-auto"
              >
                <Icon name="refresh" />
                <span>{t('students.filters.clear')}</span>
              </button>
            </div>
          </div>

          {/* Active filters indicator */}
          {(searchMatricula || filterCuatrimestre !== 'all') && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Icon name="filter_alt" className="text-primary" />
              <span className="text-[#a19cba]">
                {t('students.filters.showing', { count: displayAlumnos.length, total: totalCount })}
              </span>
            </div>
          )}
        </div>

        {/* Students Table */}
        <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{t('students.table.title')}</h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Icon name="sync" className="animate-spin text-primary text-4xl" />
              <span className="ml-3 text-white/60">{t('common.loading')}</span>
            </div>
          ) : displayAlumnos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Icon name="group" className="text-white/20 text-6xl mb-4" />
              <p className="text-white/60 text-lg">
                {searchMatricula || filterCuatrimestre !== 'all' 
                  ? t('students.messages.noResults')
                  : t('students.messages.noStudents')
                }
              </p>
              {!searchMatricula && filterCuatrimestre === 'all' && (
                <Link
                  to="/students/register"
                  className="mt-4 text-primary hover:text-primary/80 transition-colors"
                >
                  {t('students.messages.registerFirst')}
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pl-4 sm:pl-0">{t('students.table.name')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3">{t('students.table.enrollment')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden lg:table-cell">{t('students.table.semester')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 hidden md:table-cell">{t('common.table.created')}</th>
                    <th className="text-left text-xs sm:text-sm font-medium text-[#a19cba] pb-3 pr-4 sm:pr-0">{t('common.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {displayAlumnos.map((alumno) => (
                    <tr key={alumno.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 sm:py-4 text-white text-xs sm:text-sm font-medium pl-4 sm:pl-0">
                        <div className="flex items-center gap-2">
                          <Icon name="person" className="text-primary" />
                          {alumno.nombre}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm">{alumno.matricula}</td>
                      <td className="py-3 sm:py-4 text-white text-xs sm:text-sm hidden lg:table-cell">
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                          {alumno.cuatrimestreActual}°
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 text-[#a19cba] text-xs sm:text-sm hidden md:table-cell">
                        {new Date(alumno.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 sm:py-4 pr-4 sm:pr-0">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewDetails(alumno)}
                            className="text-white/70 hover:text-primary transition-colors"
                            title={t('students.tooltips.viewDetails')}
                          >
                            <Icon name="visibility" className="text-base" />
                          </button>
                          <button 
                            onClick={() => handleEditClick(alumno)}
                            className="text-white/70 hover:text-blue-500 transition-colors"
                            title={t('students.tooltips.editStudent')}
                          >
                            <Icon name="edit" className="text-base" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(alumno)}
                            className="text-white/70 hover:text-red-500 transition-colors"
                            title={t('students.tooltips.deleteStudent')}
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
        {showDetailModal && selectedAlumno && (
          <StudentDetailModal
            isOpen={showDetailModal}
            alumno={selectedAlumno}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedAlumno(null);
            }}
          />
        )}

        {showEditModal && selectedAlumno && (
          <EditStudentModal
            isOpen={showEditModal}
            alumno={selectedAlumno}
            onClose={() => {
              setShowEditModal(false);
              setSelectedAlumno(null);
            }}
            onSave={handleSaveEdit}
          />
        )}

        {showDeleteConfirm && alumnoToDelete && (
          <ConfirmDialog
            type="warning"
            title={t('students.messages.deleteConfirm.title')}
            message={t('students.messages.deleteConfirm.message', { name: alumnoToDelete?.nombre })}
            confirmText={t('common.actions.delete')}
            cancelText={t('common.actions.cancel')}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </AdminLayout>
  );
};

export default StudentsDashboard;

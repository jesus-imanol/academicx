import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import Icon from '../components/atoms/Icon';
import { useProgramasEstudio } from '../hooks/useProgramasEstudio';
import { useAsignaturas } from '../hooks/useAsignaturas';
import { useGrupos } from '../hooks/useGrupos';
import { useDocentes } from '../hooks/useDocentes';
import { useAlumnos } from '../hooks/useAlumnos';

function HomeView() {
    const [activeTab, setActiveTab] = useState('grupos');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({
        programaId: '',
        cuatrimestre: '',
        asignaturaId: ''
    });
    const [stats, setStats] = useState({
        totalGrupos: 0,
        totalAlumnos: 0,
        totalDocentes: 0,
        totalAsignaturas: 0
    });

    // Hooks
    const { programas, loading: loadingProgramas } = useProgramasEstudio();
    const { asignaturas, fetchAsignaturas, fetchAsignaturasByPrograma, fetchAsignaturasByProgramaAndCuatrimestre } = useAsignaturas();
    const { grupos, fetchGrupos, fetchGruposByAsignatura } = useGrupos();
    const { docentes, fetchDocentes, fetchDocentesByAsignatura } = useDocentes();
    const { alumnos, fetchAlumnos } = useAlumnos();

    // Cargar datos iniciales
    useEffect(() => {
        const loadInitialData = async () => {
            await Promise.all([
                fetchAsignaturas(),
                fetchGrupos(),
                fetchDocentes(),
                fetchAlumnos()
            ]);
        };
        loadInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Actualizar stats
    useEffect(() => {
        setStats({
            totalGrupos: grupos.length,
            totalAlumnos: alumnos.length,
            totalDocentes: docentes.length,
            totalAsignaturas: asignaturas.length
        });
    }, [grupos, alumnos, docentes, asignaturas]);

    // Obtener cuatrimestres únicos
    const cuatrimestresDisponibles = useMemo(() => {
        const cuatrimestres = new Set();
        asignaturas.forEach(asig => {
            if (asig.cuatrimestre) {
                cuatrimestres.add(asig.cuatrimestre);
            }
        });
        return Array.from(cuatrimestres).sort((a, b) => a - b);
    }, [asignaturas]);

    // Filtrar asignaturas según programa y cuatrimestre
    const asignaturasFiltradas = useMemo(() => {
        let filtered = asignaturas;

        if (filters.programaId) {
            filtered = filtered.filter(asig => asig.programaEstudioId === filters.programaId);
        }

        if (filters.cuatrimestre) {
            filtered = filtered.filter(asig => asig.cuatrimestre === parseInt(filters.cuatrimestre));
        }

        return filtered;
    }, [asignaturas, filters]);

    // Datos filtrados para mostrar
    const datosFiltrados = useMemo(() => {
        if (!filters.asignaturaId) {
            return { grupos: [], docentes: [] };
        }

        const gruposFiltrados = grupos.filter(g => g.asignaturaId === filters.asignaturaId);
        const docentesFiltrados = docentes.filter(d => 
            d.asignaturasCompetencia?.some(asig => asig.id === filters.asignaturaId)
        );

        return {
            grupos: gruposFiltrados,
            docentes: docentesFiltrados
        };
    }, [grupos, docentes, filters.asignaturaId]);

    const handleFilterChange = async (e) => {
        const { name, value } = e.target;
        setFilters(prev => {
            const newFilters = { ...prev, [name]: value };

            // Si cambió programa, resetear cuatrimestre y materia
            if (name === 'programaId') {
                newFilters.cuatrimestre = '';
                newFilters.asignaturaId = '';
            }

            // Si cambió cuatrimestre, resetear materia
            if (name === 'cuatrimestre') {
                newFilters.asignaturaId = '';
            }

            return newFilters;
        });
    };

    return (
        <div className="relative flex min-h-screen w-full bg-[#131022]">
            {/* Hamburger Button - Mobile Only */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2744] border border-white/10 text-white hover:bg-[#2b2839] transition-colors"
                aria-label="Toggle menu"
            >
                <Icon name={sidebarOpen ? 'close' : 'menu'} />
            </button>

            {/* Overlay - Mobile Only */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Side Navigation */}
            <aside className={`
                flex flex-col w-64 bg-[#131022] border-r border-white/10 p-4 shrink-0 h-screen
                lg:sticky lg:top-0
                fixed top-0 left-0 z-40
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-3 items-center px-2">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                                <Icon name="school" className="text-white text-xl" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-white text-base font-medium leading-normal">Academic System</h1>
                                <p className="text-white/60 text-sm font-normal leading-normal">Management Platform</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link 
                                to="/"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-white"
                            >
                                <Icon name="dashboard" filled />
                                <p className="text-sm font-medium leading-normal">Dashboard</p>
                            </Link>
                            <Link 
                                to="/students/dashboard"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="school" />
                                <p className="text-sm font-medium leading-normal">Alumnos</p>
                            </Link>
                            <Link 
                                to="/teachers/dashboard"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="person" />
                                <p className="text-sm font-medium leading-normal">Docentes</p>
                            </Link>
                            <Link 
                                to="/groups/dashboard"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="groups" />
                                <p className="text-sm font-medium leading-normal">Grupos</p>
                            </Link>
                            <Link 
                                to="/subjects/dashboard"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="menu_book" />
                                <p className="text-sm font-medium leading-normal">Asignaturas</p>
                            </Link>
                            <Link 
                                to="/programs/dashboard"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="account_tree" />
                                <p className="text-sm font-medium leading-normal">Programas</p>
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link 
                            to="/groups/create"
                            onClick={() => setSidebarOpen(false)}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
                        >
                            <span className="truncate">Crear Grupo</span>
                        </Link>
                        <div className="flex flex-col gap-1">
                            <button 
                                onClick={() => {
                                    setFilters({ programaId: '', cuatrimestre: '', asignaturaId: '' });
                                    setSidebarOpen(false);
                                }}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="refresh" />
                                <p className="text-sm font-medium leading-normal">Limpiar Filtros</p>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 pt-16 sm:p-6 lg:pt-8 lg:p-8 relative overflow-hidden">
                {/* Noisy Gradient Background */}
                <div className="absolute inset-0 -z-10 opacity-15 pointer-events-none"
                     style={{
                         backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(129, 61, 255, 0.3), transparent 30%), radial-gradient(circle at 80% 90%, rgba(51, 13, 242, 0.4), transparent 40%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuAwFBvQWwntLImLOGMC63EkPyK6AM2G4uRHVh_YRyMQgiC5_u_Khi-HC23Ef-y0lmuIRvkidnvOgdHAB6fc19KJD6T-cal64Qa2-VOEKjklELSLxOrGhAd6yeGP5rFDV8a_F2V51UE9OuEqBxbz1037VHQChRtKm7b9t2B_I-QDgHKQeyoImtEYwuIbno4dGT5Lof0-Hgev-CessSrU36EayaFErlMza8PpHH9X3LWIPsrgkDc0fWEq8U8kop_xCewpWZzAo4Jgoi0)',
                         backgroundSize: 'cover, cover, auto',
                         backgroundBlendMode: 'color-dodge, normal, normal'
                     }}
                />

                <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
                    {/* Header */}
                    <header className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-white text-xl sm:text-2xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                                Academic Management System
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Icon name="school" className="text-primary text-xl" />
                            <span className="text-white/80 text-sm sm:text-base font-medium">
                                {filters.asignaturaId 
                                    ? `${asignaturasFiltradas.find(a => a.id === filters.asignaturaId)?.nombre || 'Materia'}`
                                    : 'Selecciona una materia para comenzar'}
                            </span>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20">
                                    <Icon name="groups" className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs">Grupos</p>
                                    <p className="text-white text-xl font-bold">{stats.totalGrupos}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20">
                                    <Icon name="school" className="text-green-400" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs">Alumnos</p>
                                    <p className="text-white text-xl font-bold">{stats.totalAlumnos}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-purple-500/20">
                                    <Icon name="person" className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs">Docentes</p>
                                    <p className="text-white text-xl font-bold">{stats.totalDocentes}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-cyan-500/20">
                                    <Icon name="menu_book" className="text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs">Asignaturas</p>
                                    <p className="text-white text-xl font-bold">{stats.totalAsignaturas}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        <div className="relative">
                            <select 
                                name="programaId"
                                value={filters.programaId}
                                onChange={handleFilterChange}
                                disabled={loadingProgramas}
                                className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none disabled:opacity-50"
                            >
                                <option value="">Todos los Programas</option>
                                {programas.map(programa => (
                                    <option key={programa.id} value={programa.id}>
                                        {programa.nombre}
                                    </option>
                                ))}
                            </select>
                            <Icon name="expand_more" className="text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select 
                                name="cuatrimestre"
                                value={filters.cuatrimestre}
                                onChange={handleFilterChange}
                                disabled={!filters.programaId}
                                className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none disabled:opacity-50"
                            >
                                <option value="">Todos los Cuatrimestres</option>
                                {cuatrimestresDisponibles.map(cuatri => (
                                    <option key={cuatri} value={cuatri}>
                                        Cuatrimestre {cuatri}
                                    </option>
                                ))}
                            </select>
                            <Icon name="expand_more" className="text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select 
                                name="asignaturaId"
                                value={filters.asignaturaId}
                                onChange={handleFilterChange}
                                disabled={asignaturasFiltradas.length === 0}
                                className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none disabled:opacity-50"
                            >
                                <option value="">Selecciona una Materia</option>
                                {asignaturasFiltradas.map(asignatura => (
                                    <option key={asignatura.id} value={asignatura.id}>
                                        {asignatura.nombre}
                                    </option>
                                ))}
                            </select>
                            <Icon name="expand_more" className="text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                        {/* Left/Center Content */}
                        <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
                            {!filters.asignaturaId ? (
                                /* Empty State */
                                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                                    <Icon name="filter_alt" className="text-white/30 text-6xl mb-4" />
                                    <p className="text-white text-lg font-semibold mb-2">
                                        Selecciona una materia
                                    </p>
                                    <p className="text-white/60 text-sm max-w-md">
                                        Utiliza los filtros superiores para seleccionar un programa, cuatrimestre y materia para ver grupos y docentes relacionados.
                                    </p>
                                </div>
                            ) : (
                                /* Tables */
                                <div className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                    <div className="pb-3">
                                        <div className="flex border-b border-white/10 px-4 sm:px-6 gap-6 sm:gap-8 overflow-x-auto">
                                            <button
                                                onClick={() => setActiveTab('grupos')}
                                                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors whitespace-nowrap ${
                                                    activeTab === 'grupos'
                                                        ? 'border-b-primary text-white'
                                                        : 'border-b-transparent text-white/60 hover:text-white'
                                                }`}
                                            >
                                                <p className="text-xs sm:text-sm font-bold leading-normal tracking-[0.015em]">
                                                    Grupos ({datosFiltrados.grupos.length})
                                                </p>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('docentes')}
                                                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors whitespace-nowrap ${
                                                    activeTab === 'docentes'
                                                        ? 'border-b-primary text-white'
                                                        : 'border-b-transparent text-white/60 hover:text-white'
                                                }`}
                                            >
                                                <p className="text-xs sm:text-sm font-bold leading-normal tracking-[0.015em]">
                                                    Docentes ({datosFiltrados.docentes.length})
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        {activeTab === 'grupos' ? (
                                            datosFiltrados.grupos.length === 0 ? (
                                                <div className="px-6 py-12 text-center">
                                                    <Icon name="group_off" className="text-white/30 text-5xl mb-3 mx-auto" />
                                                    <p className="text-white/60 text-sm">
                                                        No hay grupos registrados para esta materia
                                                    </p>
                                                </div>
                                            ) : (
                                                <table className="w-full text-xs sm:text-sm text-left text-white/80 min-w-[500px]">
                                                    <thead className="text-[10px] sm:text-xs text-white/60 uppercase">
                                                        <tr>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Nombre Grupo</th>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Docente</th>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Alumnos</th>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Fecha Creación</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datosFiltrados.grupos.map((grupo) => (
                                                            <tr key={grupo.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-white whitespace-nowrap">
                                                                    <div className="flex items-center gap-2">
                                                                        <Icon name="groups" className="text-blue-400" />
                                                                        {grupo.nombre}
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                                    {grupo.docenteNombreSnapshot || 'N/A'}
                                                                </td>
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                                                                        <Icon name="person" className="text-xs" />
                                                                        {grupo.alumnos?.length || 0}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-white/60">
                                                                    {new Date(grupo.createdAt).toLocaleDateString('es-MX', { 
                                                                        year: 'numeric', 
                                                                        month: 'short', 
                                                                        day: 'numeric' 
                                                                    })}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )
                                        ) : (
                                            datosFiltrados.docentes.length === 0 ? (
                                                <div className="px-6 py-12 text-center">
                                                    <Icon name="person_off" className="text-white/30 text-5xl mb-3 mx-auto" />
                                                    <p className="text-white/60 text-sm">
                                                        No hay docentes con competencia en esta materia
                                                    </p>
                                                </div>
                                            ) : (
                                                <table className="w-full text-xs sm:text-sm text-left text-white/80 min-w-[500px]">
                                                    <thead className="text-[10px] sm:text-xs text-white/60 uppercase">
                                                        <tr>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Nombre</th>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Email</th>
                                                            <th className="px-4 sm:px-6 py-3" scope="col">Competencias</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datosFiltrados.docentes.map((docente) => (
                                                            <tr key={docente.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-white">
                                                                    <div className="flex items-center gap-2">
                                                                        <Icon name="person" className="text-purple-400" />
                                                                        {docente.nombre}
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-white/60">
                                                                    {docente.email}
                                                                </td>
                                                                <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                                                                        <Icon name="workspace_premium" className="text-xs" />
                                                                        {docente.asignaturasCompetencia?.length || 0}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Panel */}
                        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                            <h2 className="text-white text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">
                                Acciones Rápidas
                            </h2>
                            <div className="flex flex-col gap-3 sm:gap-4">
                                <Link 
                                    to="/groups/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Icon name="groups" className="text-blue-400 text-lg sm:text-xl" />
                                        <span className="text-white font-medium text-xs sm:text-sm">Ver Grupos</span>
                                    </div>
                                    <Icon name="arrow_forward" className="text-white/50 group-hover:text-white transition-colors" />
                                </Link>
                                
                                <Link 
                                    to="/groups/create"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Icon name="add_circle" className="text-cyan-400 text-lg sm:text-xl" />
                                        <span className="text-white font-medium text-xs sm:text-sm">Crear Grupo</span>
                                    </div>
                                    <Icon name="arrow_forward" className="text-white/50 group-hover:text-white transition-colors" />
                                </Link>

                                <Link 
                                    to="/students/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Icon name="school" className="text-green-400 text-lg sm:text-xl" />
                                        <span className="text-white font-medium text-xs sm:text-sm">Gestionar Alumnos</span>
                                    </div>
                                    <Icon name="arrow_forward" className="text-white/50 group-hover:text-white transition-colors" />
                                </Link>

                                <Link 
                                    to="/teachers/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Icon name="person" className="text-purple-400 text-lg sm:text-xl" />
                                        <span className="text-white font-medium text-xs sm:text-sm">Gestionar Docentes</span>
                                    </div>
                                    <Icon name="arrow_forward" className="text-white/50 group-hover:text-white transition-colors" />
                                </Link>

                                <Link 
                                    to="/subjects/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Icon name="menu_book" className="text-cyan-400 text-lg sm:text-xl" />
                                        <span className="text-white font-medium text-xs sm:text-sm">Ver Asignaturas</span>
                                    </div>
                                    <Icon name="arrow_forward" className="text-white/50 group-hover:text-white transition-colors" />
                                </Link>

                                <Link 
                                    to="/programs/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Icon name="account_tree" className="text-yellow-400 text-lg sm:text-xl" />
                                        <span className="text-white font-medium text-xs sm:text-sm">Ver Programas</span>
                                    </div>
                                    <Icon name="arrow_forward" className="text-white/50 group-hover:text-white transition-colors" />
                                </Link>
                            </div>

                            {/* Info Box */}
                            {filters.asignaturaId && (
                                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <Icon name="info" className="text-blue-400 text-xl shrink-0" />
                                        <div>
                                            <p className="text-blue-400 text-xs font-semibold mb-1">
                                                Materia Seleccionada
                                            </p>
                                            <p className="text-white text-sm">
                                                {asignaturasFiltradas.find(a => a.id === filters.asignaturaId)?.nombre}
                                            </p>
                                            <p className="text-white/60 text-xs mt-1">
                                                {datosFiltrados.grupos.length} grupos • {datosFiltrados.docentes.length} docentes
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomeView;
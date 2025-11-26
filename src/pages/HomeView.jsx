import { useState } from 'react';
import { Link } from 'react-router';
import Icon from '../components/atoms/Icon';

function HomeView() {
    const [activeTab, setActiveTab] = useState('grupo');
    const [filters, setFilters] = useState({
        programa: '',
        cuatrimestre: '',
        materia: ''
    });

    const grupos = [
        { id: 'G-IS-401', course: 'Bases de Datos Avanzadas', students: 32, status: 'Active' },
        { id: 'G-IS-402', course: 'Inteligencia Artificial', students: 28, status: 'Active' },
        { id: 'G-CS-301', course: 'Algoritmos y Estructuras de Datos', students: 45, status: 'Pending' }
    ];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="relative flex min-h-screen w-full bg-[#131022]">
            {/* Side Navigation */}
            <aside className="flex flex-col w-64 bg-[#131022] border-r border-white/10 p-4 shrink-0">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-3 items-center px-2">
                            <div 
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                style={{
                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZkTqbrr-fnWVJxtCQNclixNiqZ4Fd-k9WkqN3SGAsIpzPFCattKiLsaPQ-35l6Toza4dt4gEWSUP2pEbTJDBzmqQn24ZktM05I5-lOJO0M-H4Dh67KGV5k_qNMsjVZok9EmygwqAeKm8KvUd5E3g-wJ0YFaHR2ODtwzkiVG7_wOelo3QWZKtTKjai0FrMo69Om1-HlgE5L36F-JxocC6NjvCWBhKZe9zUm3yeHca_S3vg0L1ySS6RueOYXqUW_xrGQR9SBf8SC4g")'
                                }}
                                aria-label="CEM Platform logo"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-white text-base font-medium leading-normal">CEM Platform</h1>
                                <p className="text-white/60 text-sm font-normal leading-normal">Moodle Management</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link 
                                to="/"
                                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-white"
                            >
                                <Icon name="dashboard" filled />
                                <p className="text-sm font-medium leading-normal">Dashboard</p>
                            </Link>
                            <Link 
                                to="/students/dashboard"
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="group" />
                                <p className="text-sm font-medium leading-normal">Users</p>
                            </Link>
                            <Link 
                                to="/groups/dashboard"
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                            >
                                <Icon name="school" />
                                <p className="text-sm font-medium leading-normal">Courses</p>
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                            <span className="truncate">New Report</span>
                        </button>
                        <div className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors" href="#">
                                <Icon name="settings" />
                                <p className="text-sm font-medium leading-normal">Settings</p>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors" href="#">
                                <Icon name="help" />
                                <p className="text-sm font-medium leading-normal">Help</p>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 relative overflow-hidden">
                {/* Noisy Gradient Background */}
                <div className="absolute inset-0 -z-10 opacity-15 pointer-events-none"
                     style={{
                         backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(129, 61, 255, 0.3), transparent 30%), radial-gradient(circle at 80% 90%, rgba(51, 13, 242, 0.4), transparent 40%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuAwFBvQWwntLImLOGMC63EkPyK6AM2G4uRHVh_YRyMQgiC5_u_Khi-HC23Ef-y0lmuIRvkidnvOgdHAB6fc19KJD6T-cal64Qa2-VOEKjklELSLxOrGhAd6yeGP5rFDV8a_F2V51UE9OuEqBxbz1037VHQChRtKm7b9t2B_I-QDgHKQeyoImtEYwuIbno4dGT5Lof0-Hgev-CessSrU36EayaFErlMza8PpHH9X3LWIPsrgkDc0fWEq8U8kop_xCewpWZzAo4Jgoi0)',
                         backgroundSize: 'cover, cover, auto',
                         backgroundBlendMode: 'color-dodge, normal, normal'
                     }}
                />

                <div className="relative z-10 flex flex-col gap-8">
                    {/* Header */}
                    <header className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                                Concurrent Educational Management
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-white text-base font-medium leading-normal">
                                Programa de Estudio / Cuatrimestre / Materia
                            </span>
                        </div>
                    </header>

                    {/* Filters */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="relative">
                            <select 
                                name="programa"
                                value={filters.programa}
                                onChange={handleFilterChange}
                                className="w-full bg-white/5 border border-white/10 text-white/80 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                            >
                                <option value="">Programa de Estudio</option>
                                <option value="software">Ingeniería de Software</option>
                                <option value="computacion">Ciencias de la Computación</option>
                            </select>
                            <Icon name="expand_more" className="text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select 
                                name="cuatrimestre"
                                value={filters.cuatrimestre}
                                onChange={handleFilterChange}
                                className="w-full bg-white/5 border border-white/10 text-white/80 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                            >
                                <option value="">Cuatrimestre</option>
                                <option value="q3">2024 - Q3</option>
                                <option value="q4">2024 - Q4</option>
                            </select>
                            <Icon name="expand_more" className="text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select 
                                name="materia"
                                value={filters.materia}
                                onChange={handleFilterChange}
                                className="w-full bg-white/5 border border-white/10 text-white/80 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                            >
                                <option value="">Materia</option>
                                <option value="bd">Bases de Datos Avanzadas</option>
                                <option value="ia">Inteligencia Artificial</option>
                            </select>
                            <Icon name="expand_more" className="text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Left/Center Content */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            {/* Tables */}
                            <div className="flex flex-col bg-white/5 border border-white/10 rounded-xl">
                                <div className="pb-3">
                                    <div className="flex border-b border-white/10 px-6 gap-8">
                                        <button
                                            onClick={() => setActiveTab('grupo')}
                                            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                                                activeTab === 'grupo'
                                                    ? 'border-b-primary text-white'
                                                    : 'border-b-transparent text-white/60 hover:text-white'
                                            }`}
                                        >
                                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Grupo</p>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('docente')}
                                            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                                                activeTab === 'docente'
                                                    ? 'border-b-primary text-white'
                                                    : 'border-b-transparent text-white/60 hover:text-white'
                                            }`}
                                        >
                                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Docente</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-white/80">
                                        <thead className="text-xs text-white/60 uppercase">
                                            <tr>
                                                <th className="px-6 py-3" scope="col">Group ID</th>
                                                <th className="px-6 py-3" scope="col">Course Name</th>
                                                <th className="px-6 py-3" scope="col">Student Count</th>
                                                <th className="px-6 py-3" scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {grupos.map((grupo) => (
                                                <tr key={grupo.id} className="border-t border-white/10">
                                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{grupo.id}</td>
                                                    <td className="px-6 py-4">{grupo.course}</td>
                                                    <td className="px-6 py-4">{grupo.students}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                                            grupo.status === 'Active'
                                                                ? 'bg-green-500/20 text-green-400'
                                                                : 'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                            {grupo.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Action Panel */}
                        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-6">
                            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                                Panel de Acciones Concurrente
                            </h2>
                            <div className="flex flex-col gap-4">
                                <button className="flex items-center justify-between w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <Icon name="cloud_sync" className="text-primary" />
                                        <span className="text-white font-medium text-sm">Verificar Curso en Moodle</span>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                                </button>
                                <button className="flex items-center justify-between w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <Icon name="add_circle" className="text-cyan-400" />
                                        <span className="text-white font-medium text-sm">Crear Curso en Moodle</span>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                        <div className="absolute w-4 h-4 rounded-full bg-cyan-500/50 animate-ping"></div>
                                    </div>
                                </button>
                                <button className="flex items-center justify-between w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <Icon name="person_add" className="text-green-400" />
                                        <span className="text-white font-medium text-sm">Crear y Matricular Alumnos</span>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </button>
                                <button className="flex items-center justify-between w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <Icon name="error" className="text-red-400" />
                                        <span className="text-white font-medium text-sm">Sincronización Fallida</span>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomeView;
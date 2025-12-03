import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const EditSubjectModal = ({ isOpen, onClose, onSave, asignatura, programas }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    cuatrimestre: '',
    programaEstudioId: ''
  });
  const [saving, setSaving] = useState(false);
  const [maxCuatrimestre, setMaxCuatrimestre] = useState(10);

  useEffect(() => {
    if (asignatura) {
      setFormData({
        nombre: asignatura.nombre,
        cuatrimestre: asignatura.cuatrimestre.toString(),
        programaEstudioId: asignatura.programaEstudioId
      });
      
      // Set max cuatrimestre based on programa
      const programa = programas?.find(p => p.id === asignatura.programaEstudioId);
      if (programa) {
        setMaxCuatrimestre(programa.cantidadCuatrimestres);
      }
    }
  }, [asignatura, programas]);

  if (!isOpen || !asignatura) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update max cuatrimestre when programa changes
    if (name === 'programaEstudioId') {
      const programa = programas?.find(p => p.id === value);
      if (programa) {
        setMaxCuatrimestre(programa.cantidadCuatrimestres);
        // Reset cuatrimestre if it exceeds new max
        if (parseInt(formData.cuatrimestre) > programa.cantidadCuatrimestres) {
          setFormData(prev => ({ ...prev, cuatrimestre: '1' }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const updatedData = {
      nombre: formData.nombre.trim(),
      cuatrimestre: parseInt(formData.cuatrimestre),
      programaEstudioId: formData.programaEstudioId
    };

    await onSave(asignatura.id, updatedData);
    setSaving(false);
  };

  const selectedPrograma = programas?.find(p => p.id === formData.programaEstudioId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#252233] rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20">
              <Icon name="edit" className="text-blue-500 text-2xl" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Editar Asignatura</h3>
              <p className="text-[#a19cba] text-sm">Actualiza la información de la asignatura</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#a19cba] hover:text-white transition-colors"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Nombre de la Asignatura
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 placeholder:text-[#a19cba] px-4 py-3 text-sm"
              required
            />
          </div>

          {/* Programa de Estudio */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Programa de Estudio
            </label>
            <select
              name="programaEstudioId"
              value={formData.programaEstudioId}
              onChange={handleChange}
              className="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 px-4 text-sm"
              required
            >
              <option value="">Selecciona un programa</option>
              {programas?.map(programa => (
                <option key={programa.id} value={programa.id}>
                  {programa.nombre} ({programa.cantidadCuatrimestres} cuatrimestres)
                </option>
              ))}
            </select>
          </div>

          {/* Cuatrimestre */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Cuatrimestre
            </label>
            <select
              name="cuatrimestre"
              value={formData.cuatrimestre}
              onChange={handleChange}
              className="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252233] focus:ring-primary border border-[#3f3b54] bg-[#1d1b27] h-12 px-4 text-sm"
              required
              disabled={!formData.programaEstudioId}
            >
              <option value="">Selecciona un cuatrimestre</option>
              {Array.from({ length: maxCuatrimestre }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}° Cuatrimestre</option>
              ))}
            </select>
            {selectedPrograma && (
              <p className="text-[#a19cba] text-xs">
                Máximo {maxCuatrimestre} cuatrimestres para {selectedPrograma.nombre}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Icon name="sync" className="animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Icon name="check" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-transparent text-[#a19cba] text-sm font-bold border border-white/10 hover:border-[#a19cba] hover:text-white transition-all duration-200 disabled:opacity-50"
            >
              <Icon name="close" />
              <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditSubjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  asignatura: PropTypes.object,
  programas: PropTypes.array
};

export default EditSubjectModal;

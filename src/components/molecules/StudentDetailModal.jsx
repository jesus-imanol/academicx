import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const StudentDetailModal = ({ isOpen, onClose, alumno }) => {
  if (!isOpen || !alumno) return null;

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
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
              <Icon name="person" className="text-primary text-2xl" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">{alumno.nombre}</h3>
              <p className="text-[#a19cba] text-sm">{alumno.matricula}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#a19cba] hover:text-white transition-colors"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">ID</p>
              <p className="text-white text-sm font-mono">{alumno.id}</p>
            </div>
            
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">Matrícula</p>
              <p className="text-white text-sm font-bold">{alumno.matricula}</p>
            </div>
            
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">Cuatrimestre Actual</p>
              <p className="text-white text-2xl font-bold">{alumno.cuatrimestreActual}</p>
            </div>
            
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">Fecha de Registro</p>
              <p className="text-white text-sm">
                {new Date(alumno.createdAt).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
            <p className="text-[#a19cba] text-xs font-medium mb-1">Última Actualización</p>
            <p className="text-white text-sm">
              {new Date(alumno.updatedAt).toLocaleString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-transparent text-[#a19cba] text-sm font-bold border border-white/10 hover:border-[#a19cba] hover:text-white transition-all duration-200"
          >
            <Icon name="close" />
            <span>Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

StudentDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  alumno: PropTypes.object
};

export default StudentDetailModal;

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const ProgramDetailModal = ({ isOpen, onClose, programa }) => {
  if (!isOpen || !programa) return null;

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
              <Icon name="school" className="text-primary text-2xl" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">{programa.nombre}</h3>
              <p className="text-[#a19cba] text-sm">Programa de Estudio</p>
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
          {/* Program Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">ID</p>
              <p className="text-white text-sm font-mono break-all">{programa.id}</p>
            </div>
            
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">Nombre del Programa</p>
              <p className="text-white text-sm font-bold">{programa.nombre}</p>
            </div>
            
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">Cantidad de Cuatrimestres</p>
              <div className="flex items-center gap-2">
                <Icon name="schedule" className="text-primary text-2xl" />
                <p className="text-white text-2xl font-bold">{programa.cantidadCuatrimestres}</p>
              </div>
            </div>
            
            <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
              <p className="text-[#a19cba] text-xs font-medium mb-1">Fecha de Creación</p>
              <p className="text-white text-sm">
                {new Date(programa.createdAt).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Duration Info */}
          <div className="rounded-lg p-4 border border-primary/20" style={{background: 'linear-gradient(to right, rgb(var(--primary) / 0.1), rgb(6 182 212 / 0.1))'}}>
            <div className="flex items-center gap-3">
              <Icon name="event" className="text-primary text-3xl" />
              <div>
                <p className="text-white font-bold text-lg">
                  Duración Total: {programa.cantidadCuatrimestres * 4} meses
                </p>
                <p className="text-[#a19cba] text-sm">
                  Aproximadamente {Math.ceil(programa.cantidadCuatrimestres / 3)} años
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-[#1d1b27] rounded-lg p-4 border border-white/5">
            <p className="text-[#a19cba] text-xs font-medium mb-1">Última Actualización</p>
            <p className="text-white text-sm">
              {new Date(programa.updatedAt).toLocaleString('es-MX', {
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

ProgramDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  programa: PropTypes.object
};

export default ProgramDetailModal;

import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import CreateProgramForm from '../../components/organisms/CreateProgramForm';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import { useProgramasEstudio } from '../../hooks/useProgramasEstudio';
import { useToast } from '../../hooks/useToast';

const CreateStudyProgramPage = () => {
  const navigate = useNavigate();
  const { createPrograma } = useProgramasEstudio();
  const { showSuccess, showError } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (data) => {
    if (!data.nombre?.trim()) {
      showError('Por favor ingresa el nombre del programa.');
      return;
    }

    if (!data.cantidadCuatrimestres || data.cantidadCuatrimestres < 1) {
      showError('Por favor ingresa una cantidad válida de cuatrimestres.');
      return;
    }

    setSubmitting(true);

    const programaData = {
      nombre: data.nombre.trim(),
      cantidadCuatrimestres: parseInt(data.cantidadCuatrimestres)
    };

    const result = await createPrograma(programaData);
    setSubmitting(false);

    if (result.success) {
      showSuccess('Programa de estudio creado exitosamente!');
      
      // Mostrar diálogo de confirmación
      setTimeout(() => {
        setShowConfirm(true);
      }, 1000);
    } else {
      // Manejar diferentes códigos de error
      const errorMessage = result.error?.includes('409') || result.error?.includes('ya existe')
        ? 'Ya existe un programa con ese nombre. Por favor elige otro nombre.'
        : result.error?.includes('400') || result.error?.includes('inválido')
        ? 'Datos inválidos. Verifica que todos los campos estén correctos.'
        : result.error || 'Error al crear programa de estudio. Intenta de nuevo.';
      
      showError(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/study-programs');
  };

  const handleClose = () => {
    navigate('/study-programs');
  };

  const handleConfirmCreateAnother = () => {
    setShowConfirm(false);
    window.location.reload();
  };

  const handleCancelCreateAnother = () => {
    setShowConfirm(false);
    navigate('/study-programs');
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirmCreateAnother}
        onCancel={handleCancelCreateAnother}
        title="¡Programa creado exitosamente!"
        message="¿Deseas crear otro programa de estudio?"
        confirmText="Sí, crear otro"
        cancelText="No, ir al dashboard"
        type="success"
      />
      
      <AdminLayout activeNavItem="study-programs">
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-4 p-4 sm:p-6 items-start sm:items-center">
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
            Create New Study Program
          </p>
          <p className="text-[#a19cba] text-sm sm:text-base font-normal leading-normal">
            Fill in the details below to create a new program.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <CreateProgramForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={submitting}
        />
      </div>
    </AdminLayout>
    </>
  );
};

export default CreateStudyProgramPage;

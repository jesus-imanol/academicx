import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PageHeader from '../../components/molecules/PageHeader';
import CreateProgramForm from '../../components/organisms/CreateProgramForm';
import ProgramVisualizer from '../../components/organisms/ProgramVisualizer';

const CreateStudyProgramPage = () => {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Aquí puedes agregar la lógica para cancelar o redirigir
  };

  const handleClose = () => {
    console.log('Close clicked');
    // Aquí puedes agregar la lógica para cerrar o redirigir
  };

  return (
    <MainLayout activeNavItem="study-programs">
      <PageHeader
        title="Create New Study Program"
        subtitle="Fill in the details below to create a new program."
        onClose={handleClose}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Container */}
        <div className="lg:col-span-3">
          <CreateProgramForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>

        {/* Visualizer Panel */}
        <ProgramVisualizer />
      </div>
    </MainLayout>
  );
};

export default CreateStudyProgramPage;

import { useState } from 'react';
import CenteredLayout from '../../layouts/CenteredLayout';
import SubjectForm from '../../components/organisms/SubjectForm';
import Toast from '../../components/molecules/Toast';

const CreateSubjectPage = () => {
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
    // Auto hide after 3 seconds
    setTimeout(() => {
      setToast({ visible: false, type: 'success', message: '' });
    }, 3000);
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    
    // Validation
    if (!data.subjectName || !data.semester) {
      showToast('error', 'Please fill out all required fields.');
      return;
    }

    // Simulate API call
    showToast('success', 'Subject created successfully!');
    
    // Here you can add the logic to send data to backend
    // try {
    //   const response = await fetch('/api/subjects', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    //   });
    //   if (response.ok) {
    //     showToast('success', 'Subject created successfully!');
    //   }
    // } catch (error) {
    //   showToast('error', 'Failed to create subject. Please try again.');
    // }
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Add navigation or reset logic here
  };

  const handleCloseToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <CenteredLayout>
      <SubjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
      
      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={handleCloseToast}
      />
    </CenteredLayout>
  );
};

export default CreateSubjectPage;

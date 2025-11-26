import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import TeacherForm from '../../components/organisms/TeacherForm';
import Toast from '../../components/molecules/Toast';

const RegisterTeacherPage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
    setTimeout(() => {
      setToast({ visible: false, type: 'success', message: '' });
    }, 3000);
  };

  const handleSubmit = (data) => {
    console.log('Teacher registered:', data);

    // Validation
    if (!data.fullName || !data.email || !data.username || !data.password || !data.department) {
      showToast('error', 'Please fill out all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }

    // Simulate API call
    showToast('success', 'Teacher registered successfully!');
    
    // Redirect to teachers dashboard after 2 seconds
    setTimeout(() => {
      navigate('/teachers/dashboard');
    }, 2000);

    // Here you can add the logic to send data to backend
    // try {
    //   const response = await fetch('/api/teachers', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    //   });
    //   if (response.ok) {
    //     showToast('success', 'Teacher registered successfully!');
    //     setTimeout(() => navigate('/teachers/dashboard'), 2000);
    //   }
    // } catch (error) {
    //   showToast('error', 'Failed to register teacher. Please try again.');
    // }
  };

  const handleCancel = () => {
    navigate('/teachers/dashboard');
  };

  const handleCloseToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <AdminLayout activeNavItem="teachers">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Register New Teacher
          </p>
          <p className="text-[#a19cba] text-base font-normal leading-normal">
            Fill in the details below to create a new teacher account.
          </p>
        </div>
      </div>

      <TeacherForm onSubmit={handleSubmit} onCancel={handleCancel} />

      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={handleCloseToast}
      />
    </AdminLayout>
  );
};

export default RegisterTeacherPage;

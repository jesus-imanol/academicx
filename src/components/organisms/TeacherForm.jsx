import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import PasswordInput from '../atoms/PasswordInput';
import Select from '../atoms/Select';
import Button from '../atoms/Button';

const TeacherForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    department: ''
  });

  const departments = [
    'Computer Science',
    'Arts',
    'Mathematics',
    'Physics'
  ];

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="mt-6 sm:mt-8 mx-4 sm:mx-0 rounded-xl border border-white/10 bg-[#252233] p-4 sm:p-6 lg:p-8">
      <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Personal Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-xs sm:text-sm font-medium leading-normal pb-2">Full Name</p>
              <Input
                placeholder="Enter teacher's full name"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                className="border-white/20 bg-white/5"
              />
            </label>

            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-sm font-medium leading-normal pb-2">Email Address</p>
              <Input
                type="email"
                placeholder="teacher@example.com"
                value={formData.email}
                onChange={handleChange('email')}
                className="border-white/20 bg-white/5"
              />
            </label>

            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-sm font-medium leading-normal pb-2">
                Phone Number <span className="text-white/50">(Optional)</span>
              </p>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange('phone')}
                className="border-white/20 bg-white/5"
              />
            </label>
          </div>
        </div>

        <div className="border-t border-white/10"></div>

        {/* Platform Credentials Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Platform Credentials</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-sm font-medium leading-normal pb-2">Moodle Username</p>
              <Input
                placeholder="Enter Moodle username"
                value={formData.username}
                onChange={handleChange('username')}
                className="border-white/20 bg-white/5"
              />
            </label>

            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-sm font-medium leading-normal pb-2">Create Password</p>
              <PasswordInput
                placeholder="Enter a secure password"
                value={formData.password}
                onChange={handleChange('password')}
              />
            </label>
          </div>
        </div>

        <div className="border-t border-white/10"></div>

        {/* Administrative Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Administrative</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-sm font-medium leading-normal pb-2">Assign Department</p>
              <Select
                options={departments}
                value={formData.department}
                onChange={handleChange('department')}
                placeholder="Select a department"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 sm:h-11 px-4 sm:px-6 bg-transparent text-white/80 hover:bg-white/10 text-sm font-bold leading-normal tracking-[0.015em] transition-colors duration-200"
          >
            <span className="truncate">Cancel</span>
          </button>
          <button
            type="submit"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 sm:h-11 px-4 sm:px-6 bg-linear-to-r from-[#330df2] to-[#330df2] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#330df2] hover:to-[#330df2] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            <span className="truncate">Register Teacher</span>
          </button>
        </div>
      </form>
    </div>
  );
};

TeacherForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default TeacherForm;

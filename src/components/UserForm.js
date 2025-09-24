import React, { useState, useEffect } from 'react';
import { User, Mail, Building } from 'lucide-react'; 


const UserForm = ({ user, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });
  const [errors, setErrors] = useState({});

 
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        department: user.department || ''
      });
    } else {
      setFormData({ name: '', email: '', department: '' });
    }
    setErrors({});
  }, [user]);

  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = () => {
    console.log('📝 Form submitted:', formData);
    
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department
      });
    }
  };

 
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
            {user ? (
              <>📝 Edit User #{user.id}</>
            ) : (
              <>➕ Add New User</>
            )}
          </h3>

         
          <div className="space-y-4">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  ❌ {errors.name}
                </p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  ❌ {errors.email}
                </p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Building size={16} className="inline mr-2" />
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.department ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
              {errors.department && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  ❌ {errors.department}
                </p>
              )}
            </div>
          </div>

         
          <div className="flex space-x-3 mt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                '⏳ Saving...'
              ) : user ? (
                '💾 UPDATE'
              ) : (
                '✅ CREATE'
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              ❌ CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm; 
import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';


const FilterModal = ({ isOpen, onClose, filters, onApplyFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  if (!isOpen) return null;

  const handleApply = () => {
    console.log('🔍 Applying filters:', localFilters);
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = { name: '', email: '', department: '' };
    setLocalFilters(clearedFilters);
    onClearFilters();
    onClose();
  };

  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
         
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Filter size={24} className="text-blue-500" />
              Filter Users
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={20} />
            </button>
          </div>

          
          <div className="space-y-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Name
              </label>
              <input
                type="text"
                value={localFilters.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter name to filter..."
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Email
              </label>
              <input
                type="text"
                value={localFilters.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email to filter..."
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Department
              </label>
              <select
                value={localFilters.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button
              onClick={handleApply}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
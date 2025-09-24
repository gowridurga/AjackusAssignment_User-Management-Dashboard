import React, { useState } from 'react';
import { Search, Plus, CheckCircle, X } from 'lucide-react';
import { useUsers } from './hooks/useUsers';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import FilterModal from './components/FilterModal';
import Pagination from './components/Pagination';



const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-xl z-50 flex items-center space-x-3 font-bold ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`}>
    <CheckCircle size={24} />
    <span className="text-lg">{message}</span>
    <button onClick={onClose}>
      <X size={20} />
    </button>
  </div>
);


const DeleteConfirmModal = ({ isOpen, user, onConfirm, onCancel }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">🗑️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Delete User?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Are you sure you want to delete <br />
            <strong className="text-red-600">"{user.name}"</strong>?
            <br />
            <small className="text-gray-500">This action cannot be undone.</small>
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg"
            >
              🗑️ YES, DELETE
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg"
            >
              ❌ CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  
  const {
    users,
    loading,
    error,
    paginatedUsers,
    totalPages,
    updateId,
    searchTerm,
    filters,
    sortField,
    sortDirection,
    currentPage,
    pageSize,
    addUser,
    updateUser,
    deleteUser,
    setSearch,
    setFilters,
    setSort,
    setPage,
    setPageSize,
    loadUsers
  } = useUsers();

  
  const [showUserForm, setShowUserForm] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  
  const handleAddUser = () => {
    console.log('🟢 ADD USER CLICKED');
    setEditingUser(null);
    setShowUserForm(true);
  };

  
  const handleEditUser = (user) => {
    console.log('🟡 EDIT USER CLICKED:', user);
    setEditingUser(user);
    setShowUserForm(true);
  };

  
  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    console.log('🔴 DELETE USER CLICKED:', user);
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

 
  const confirmDelete = async () => {
    console.log('🗑️ CONFIRMING DELETE for:', userToDelete);
    setShowDeleteConfirm(false);
    
    const result = await deleteUser(userToDelete.id);
    if (result.success) {
      showToast(`Deleted ${userToDelete.name}`, 'success');
    } else {
      showToast(result.message, 'error');
    }
    
    setUserToDelete(null);
  };

  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

 
  const handleFormSubmit = async (userData) => {
    console.log('📝 FORM SUBMITTED:', userData);
    setIsSubmitting(true);

    let result;
    if (editingUser) {
      result = await updateUser(editingUser.id, userData);
    } else {
      result = await addUser(userData);
    }

    if (result.success) {
      showToast(result.message, 'success');
      setShowUserForm(false);
      setEditingUser(null);
    } else {
      showToast(result.message, 'error');
    }

    setIsSubmitting(false);
  };

  
  const handleFormCancel = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    showToast('Filters applied!');
  };

 
  const handleClearFilters = () => {
    setFilters({ name: '', email: '', department: '' });
    showToast('Filters cleared!');
  };

  
  const hasActiveFilters = filters.name || filters.email || filters.department;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your users with ease - view, add, edit, and delete user records
          </p>
          
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm font-mono">
              👥 Users: <span className="font-bold text-blue-600">{users.length}</span> | 
              🔄 Updates: <span className="font-bold text-green-600">{updateId}</span> | 
              📝 Modal: <span className="font-bold">{showUserForm ? '🟢 OPEN' : '🔴 CLOSED'}</span> | 
              ✏️ Editing: <span className="font-bold">{editingUser ? `#${editingUser.id}` : 'NONE'}</span>
            </div>
          </div>
        </div>

        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button 
                onClick={loadUsers}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
             
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 hover:border-gray-400 transition-colors"
                />
              </div>
              
             
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search size={20} />
                Filter
                {hasActiveFilters && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    Active
                  </span>
                )}
              </button>
            </div>

          
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-bold shadow-lg transform hover:scale-105"
            >
              <Plus size={20} />
              ADD USER
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="font-bold text-lg text-gray-800">
              📋 Users List ({users.length} total)
            </h2>
          </div>

          
          <UserList
            users={paginatedUsers}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onSort={setSort}
            sortField={sortField}
            sortDirection={sortDirection}
            updateId={updateId}
          />

          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={users.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>

       
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.department === 'Engineering').length}
            </div>
            <div className="text-sm text-gray-600">Engineering</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.department === 'Marketing').length}
            </div>
            <div className="text-sm text-gray-600">Marketing</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.department === 'Sales').length}
            </div>
            <div className="text-sm text-gray-600">Sales</div>
          </div>
        </div>
      </div>

      
      {showUserForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isSubmitting={isSubmitting}
        />
      )}

      
      {showFilterModal && (
        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      )}

    
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        user={userToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;

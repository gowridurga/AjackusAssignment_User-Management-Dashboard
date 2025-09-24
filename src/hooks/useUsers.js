import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api';


export const useUsers = () => {
  const [state, setState] = useState({
    users: [],
    loading: true,
    error: null,
    searchTerm: '',
    filters: { name: '', email: '', department: '' },
    sortField: '',
    sortDirection: 'asc',
    currentPage: 1,
    pageSize: 10,
    updateId: 0
  });

  const updateState = (changes) => {
    setState(prev => ({
      ...prev,
      ...changes,
      updateId: prev.updateId + 1
    }));
  };

  
  const loadUsers = useCallback(async () => {
    try {
      updateState({ loading: true, error: null });
      const users = await api.getUsers();
      updateState({ users, loading: false });
    } catch (error) {
      updateState({ 
        error: 'Failed to load users', 
        loading: false 
      });
    }
  }, []); 

 
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  
  const filteredUsers = useMemo(() => {
    let filtered = state.users;

    if (state.searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.filters.name) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(state.filters.name.toLowerCase())
      );
    }
    if (state.filters.email) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(state.filters.email.toLowerCase())
      );
    }
    if (state.filters.department) {
      filtered = filtered.filter(user => user.department === state.filters.department);
    }

    return filtered;
  }, [state.users, state.searchTerm, state.filters]);

  const sortedUsers = useMemo(() => {
    if (!state.sortField) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aVal = state.sortField === 'id' ? Number(a[state.sortField]) : a[state.sortField].toLowerCase();
      const bVal = state.sortField === 'id' ? Number(b[state.sortField]) : b[state.sortField].toLowerCase();

      if (state.sortField === 'id') {
        return state.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      } else {
        return state.sortDirection === 'asc' ?
          (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) :
          (bVal < aVal ? -1 : bVal > aVal ? 1 : 0);
      }
    });
  }, [filteredUsers, state.sortField, state.sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.pageSize;
    return sortedUsers.slice(startIndex, startIndex + state.pageSize);
  }, [sortedUsers, state.currentPage, state.pageSize]);

  const addUser = async (userData) => {
    try {
      console.log('Adding user:', userData);
      await api.createUser(userData);
      
      const newId = Math.max(...state.users.map(u => u.id), 0) + 1;
      const newUser = { ...userData, id: newId };
      const newUsers = [...state.users, newUser];
      
      updateState({ users: newUsers });
      console.log('User added successfully');
      return { success: true, message: 'User added successfully!' };
    } catch (error) {
      console.error('Failed to add user:', error);
      return { success: false, message: 'Failed to add user' };
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      console.log('Updating user:', userId, userData);
      await api.updateUser(userId, userData);
      
      const newUsers = state.users.map(user =>
        user.id === userId ? { ...user, ...userData } : user
      );
      
      updateState({ users: newUsers });
      console.log('User updated successfully');
      return { success: true, message: 'User updated successfully!' };
    } catch (error) {
      console.error('Failed to update user:', error);
      return { success: false, message: 'Failed to update user' };
    }
  };

  const deleteUser = async (userId) => {
    try {
      console.log('Deleting user:', userId);
      await api.deleteUser(userId);
      
      const newUsers = state.users.filter(user => user.id !== userId);
      updateState({ users: newUsers });
      
      console.log('User deleted successfully');
      return { success: true, message: 'User deleted successfully!' };
    } catch (error) {
      console.error('Failed to delete user:', error);
      return { success: false, message: 'Failed to delete user' };
    }
  };

  const setSearch = (searchTerm) => {
    updateState({ searchTerm, currentPage: 1 });
  };

  const setFilters = (filters) => {
    updateState({ filters, currentPage: 1 });
  };

  const setSort = (field) => {
    const direction = state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc';
    updateState({ sortField: field, sortDirection: direction, currentPage: 1 });
  };

  const setPage = (page) => {
    updateState({ currentPage: page });
  };

  const setPageSize = (pageSize) => {
    updateState({ pageSize, currentPage: 1 });
  };

  return {
    ...state,
    filteredUsers,
    sortedUsers,
    paginatedUsers,
    totalPages: Math.ceil(sortedUsers.length / state.pageSize),
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
    setSearch,
    setFilters,
    setSort,
    setPage,
    setPageSize
  };
};

export default useUsers;
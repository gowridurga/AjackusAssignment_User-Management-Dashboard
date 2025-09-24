
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  
  getUsers: async () => {
    try {
      console.log('🌐 Fetching users from API...');
      const response = await fetch(`${API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users = await response.json();
      
      
      const transformedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)]
      }));
      
      console.log('✅ Users fetched successfully:', transformedUsers.length);
      return transformedUsers;
    } catch (error) {
      console.warn('⚠️ API failed, using demo data:', error.message);
      
      return [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Sales' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'HR' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', department: 'Finance' },
        { id: 6, firstName: 'Jack Garcia',  email: 'jack.garcia@company.com', department: 'Engineering' },
        { id: 7, Name: 'Karen Martinez',  email: 'karen.martinez@company.com', department: 'Finance' },
        { id: 8, Name: 'Leo Rodriguez',  email: 'leo.rodriguez@company.com', department: 'Sales' },
        { id: 9, Name: 'Mia Lopez',  email: 'mia.lopez@company.com', department: 'HR' },
        { id: 10, Name: 'Nathan White',  email: 'nathan.white@company.com', department: 'Operations' },
        { id: 11, firstName: 'Frank Miller',  email: 'frank.miller@company.com', department: 'Operations' },
        { id: 12, firstName: 'Grace Taylor',  email: 'grace.taylor@company.com', department: 'Design' },
        { id: 13, firstName: 'Henry Anderson',  email: 'henry.anderson@company.com', department: 'Marketing' },
        { id: 14, firstName: 'Ivy Thomas',  email: 'ivy.thomas@company.com', department: 'Legal' },
        { id: 15, firstName: 'Diana Davis', email: 'diana.davis@company.com', department: 'Engineering' }
      ];
    }
  },

  
  createUser: async (userData) => {
    try {
      console.log('📝 Creating user via API:', userData);
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      
      const result = await response.json();
      console.log('✅ User created via API:', result);
      return result;
    } catch (error) {
      console.warn('⚠️ API create failed, returning mock success:', error.message);
      return { ...userData, id: Date.now() };
    }
  },


  updateUser: async (id, userData) => {
    try {
      console.log('🔄 Updating user via API:', id, userData);
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) throw new Error('Failed to update user');
      
      const result = await response.json();
      console.log('✅ User updated via API:', result);
      return result;
    } catch (error) {
      console.warn('⚠️ API update failed, returning mock success:', error.message);
      return { ...userData, id };
    }
  },

  
  deleteUser: async (id) => {
    try {
      console.log('🗑️ Deleting user via API:', id);
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      console.log('✅ User deleted via API');
      return true;
    } catch (error) {
      console.warn('⚠️ API delete failed, returning mock success:', error.message);
      return true;
    }
  }
};

export default api;
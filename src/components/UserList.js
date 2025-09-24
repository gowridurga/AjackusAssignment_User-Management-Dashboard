import React from 'react';
import { Edit2, Trash2, User } from 'lucide-react';


const UserList = ({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onSort, 
  sortField, 
  sortDirection,
  updateId 
}) => {
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800 border-blue-300',
      'Marketing': 'bg-green-100 text-green-800 border-green-300',
      'Sales': 'bg-purple-100 text-purple-800 border-purple-300',
      'HR': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Finance': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[department] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">👥</div>
        <p className="text-gray-500 text-xl mb-6 font-medium">
          No users found
        </p>
        <p className="text-gray-400 text-sm">
          Try adjusting your search criteria or add a new user
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              <button
                onClick={() => onSort('id')}
                className="flex items-center gap-1 hover:text-gray-800 transition-colors"
              >
                ID
                {getSortIcon('id') && (
                  <span className="text-blue-500 font-bold">
                    {getSortIcon('id')}
                  </span>
                )}
              </button>
            </th>

            
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              <button
                onClick={() => onSort('name')}
                className="flex items-center gap-1 hover:text-gray-800 transition-colors"
              >
                Name
                {getSortIcon('name') && (
                  <span className="text-blue-500 font-bold">
                    {getSortIcon('name')}
                  </span>
                )}
              </button>
            </th>

            
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              <button
                onClick={() => onSort('email')}
                className="flex items-center gap-1 hover:text-gray-800 transition-colors"
              >
                Email
                {getSortIcon('email') && (
                  <span className="text-blue-500 font-bold">
                    {getSortIcon('email')}
                  </span>
                )}
              </button>
            </th>

           
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              <button
                onClick={() => onSort('department')}
                className="flex items-center gap-1 hover:text-gray-800 transition-colors"
              >
                Department
                {getSortIcon('department') && (
                  <span className="text-blue-500 font-bold">
                    {getSortIcon('department')}
                  </span>
                )}
              </button>
            </th>

            
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr 
              key={`user-${user.id}-update-${updateId}`} 
              className="hover:bg-blue-50 transition-colors"
            >
             
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                #{user.id}
              </td>

              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  {user.name}
                </div>
              </td>

              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                {user.email}
              </td>

              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-2 inline-flex text-xs font-bold rounded-full border-2 ${getDepartmentColor(user.department)}`}>
                  {user.department}
                </span>
              </td>

              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transform hover:scale-105 transition-all flex items-center gap-1"
                    title="Edit user"
                  >
                    <Edit2 size={14} />
                    EDIT
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transform hover:scale-105 transition-all flex items-center gap-1"
                    title="Delete user"
                  >
                    <Trash2 size={14} />
                    DELETE
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
'use client';

import { useState } from 'react';
import { approveAccount, rejectAccount } from '@/app/request-account/actions';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface AccountRequestClientPageProps {
  pendingUsers: User[];
}

export default function AccountRequestClientPage({ pendingUsers: initialPendingUsers }: AccountRequestClientPageProps) {
  const { settings } = useWhitelabel();
  const [pendingUsers, setPendingUsers] = useState(initialPendingUsers);

  const handleApprove = async (userId: number) => {
    const result = await approveAccount(userId);
    if (result?.error) {
      alert(result.error);
    } else {
      alert(result?.message);
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleReject = async (userId: number) => {
    const result = await rejectAccount(userId);
    if (result?.error) {
      alert(result.error);
    } else {
      alert(result?.message);
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {pendingUsers.length === 0 ? (
        <p className="text-gray-600">No pending account requests.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pendingUsers.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1 mb-2 md:mb-0">
                <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                <p className="text-gray-700">Email: {user.email}</p>
                <p className="text-gray-700">Phone: {user.phone}</p>
                <p className="text-gray-700">Requested Role: {user.role}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(user.id)}
                  className="px-3 py-1 rounded-md text-sm font-medium text-white"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(user.id)}
                  className="px-3 py-1 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

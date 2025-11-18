'use client';

import { useActionState } from 'react';
import { createCategory } from './actions';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

const initialState = {
  message: '',
  error: '',
};

interface CreateCategoryModalProps {
  onClose: () => void;
}

export default function CreateCategoryModal({ onClose }: CreateCategoryModalProps) {
  const { settings } = useWhitelabel();
  const [state, formAction] = useActionState(createCategory, initialState);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-background">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-foreground">Add New Category</h3>
          <form action={formAction} className="mt-2 px-7 py-3 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Add Category
              </button>
            </div>
            {state?.message && <p className="text-green-500">{state.message}</p>}
            {state?.error && <p className="text-red-500">{state.error}</p>}
          </form>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

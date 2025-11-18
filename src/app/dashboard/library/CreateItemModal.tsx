'use client';

import { useActionState } from 'react';
import { createLibraryItem, getCategories } from './actions';
import { useEffect, useState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

const initialState = {
  message: '',
  error: '',
};

interface CreateItemModalProps {
  onClose: () => void;
}

type Category = {
  id: number;
  name: string;
};

export default function CreateItemModal({ onClose }: CreateItemModalProps) {
  const { settings } = useWhitelabel();
  const [state, formAction] = useActionState(createLibraryItem, initialState);
  const [itemType, setItemType] = useState<'document' | 'video'>('document');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const allCategories = await getCategories();
      setCategories(allCategories as Category[]);
    }
    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-background">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-foreground">Add New Library Item</h3>
          <form action={formAction} className="mt-2 px-7 py-3 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 text-left">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-left">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 text-left">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 text-left">
                Item Type
              </label>
              <select
                id="itemType"
                name="itemType"
                value={itemType}
                onChange={(e) => setItemType(e.target.value as 'document' | 'video')}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="document">Document</option>
                <option value="video">Video</option>
              </select>
            </div>
            {itemType === 'video' ? (
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 text-left">
                  YouTube URL
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 text-left">
                  File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  required
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white"
                  style={{ backgroundColor: settings.primaryColor }}
                />
              </div>
            )}
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Add Item
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
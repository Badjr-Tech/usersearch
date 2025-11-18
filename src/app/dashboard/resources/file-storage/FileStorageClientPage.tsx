'use client';

import { useState, useEffect, useActionState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

type FileItem = {
  id: number;
  name: string;
  url: string;
  category: string | null;
  uploadedAt: Date;
  uploaderId: number;
};

type FormState = {
  message: string;
  error: string;
} | undefined;

interface FileStorageClientPageProps {
  isAdmin: boolean;
  isInternal: boolean;
}

export default function FileStorageClientPage({ isAdmin, isInternal }: FileStorageClientPageProps) {
  const { settings } = useWhitelabel();
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [uploadState, uploadAction] = useActionState<FormState, FormData>(uploadFile, undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileCategory, setFileCategory] = useState('');

  useEffect(() => {
    async function fetchFiles() {
      const files = await getFiles();
      setFileList(files);
    }
    fetchFiles();
  }, [uploadState]); // Re-fetch files after an upload

  const handleDelete = async (fileId: number) => {
    if (confirm('Are you sure you want to delete this file?')) {
      const result = await deleteFile(fileId);
      if (result?.error) {
        alert(result.error);
      } else {
        // Re-fetch files after deletion
        const files = await getFiles();
        setFileList(files);
      }
    }
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Internal File Storage</h1>
      <p className="text-lg text-gray-700 mb-8">
        This section provides access to all internal documents and files.
      </p>

      {isAdmin && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Upload New File</h2>
          <form action={uploadAction} className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Select File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                required
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                className="mt-1 block w-full text-sm text-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:text-white"
                style={{ backgroundColor: settings.primaryColor }}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category (Optional)
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={fileCategory}
                onChange={(e) => setFileCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {uploadState?.message && <p className="text-green-500 text-sm">{uploadState.message}</p>}
            {uploadState?.error && <p className="text-red-500 text-sm">{uploadState.error}</p>}
            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Upload File
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display Existing Files */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Uploaded Documents</h2>
        {fileList.length === 0 ? (
          <p className="text-gray-600">No files uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fileList.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  {/* Generic Document Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25m-9-4.5h6m-6 2.25h6m-6 2.25h6" />
                    </svg>
                  <h3 className="text-lg font-semibold text-foreground">{file.name}</h3>
                  {file.category && (
                    <p className="text-sm text-gray-500">Category: {file.category}</p>
                  )}
                  <p className="text-sm text-gray-500">Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                    Download
                  </a>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

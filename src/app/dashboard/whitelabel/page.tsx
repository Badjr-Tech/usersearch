"use client";

import { useState } from 'react';

export default function WhitelabelPage() {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log({ businessName, ownerName, primaryColor, secondaryColor, logoFile });
    alert('Whitelabel settings saved (not really, just logged to console)!');
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Whitelabel Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-5">
          <label htmlFor="businessName" className="block text-gray-700 text-sm font-bold mb-2">
            Business Name:
          </label>
          <input
            type="text"
            id="businessName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="ownerName" className="block text-gray-700 text-sm font-bold mb-2">
            Owner Name:
          </label>
          <input
            type="text"
            id="ownerName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Enter owner name"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="primaryColor" className="block text-gray-700 text-sm font-bold mb-2">
            Primary Color:
          </label>
          <input
            type="color"
            id="primaryColor"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 w-24"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="secondaryColor" className="block text-gray-700 text-sm font-bold mb-2">
            Secondary Color:
          </label>
          <input
            type="color"
            id="secondaryColor"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 w-24"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="logoUpload" className="block text-gray-700 text-sm font-bold mb-2">
            Logo Upload:
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              onChange={handleLogoUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {logoFile && (
              <img
                src={URL.createObjectURL(logoFile)}
                alt="Logo Preview"
                className="h-20 w-20 object-contain border rounded-md"
              />
            )}
          </div>
          {logoFile && (
            <p className="mt-2 text-sm text-gray-600">Selected file: {logoFile.name}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
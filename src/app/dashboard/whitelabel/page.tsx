"use client";

import { useState } from 'react';
import { useWhitelabel, defaultSettings } from '@/app/context/WhitelabelContext'; // Import useWhitelabel hook and defaultSettings

export default function WhitelabelPage() {
  const { updateSettings, resetSettings } = useWhitelabel(); // Use the hook
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [tertiaryColor, setTertiaryColor] = useState('#cccccc'); // New state for tertiary color
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null); // State for logo preview URL

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogoFile(file);
      setLogoPreviewUrl(URL.createObjectURL(file)); // Set preview URL
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let logoDataUrl: string | null = null;
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        logoDataUrl = reader.result as string;
        updateSettings({
          businessName,
          ownerName,
          primaryColor,
          secondaryColor,
          tertiaryColor,
          logoUrl: logoDataUrl,
        });
        alert('Whitelabel settings saved!');
      };
      reader.readAsDataURL(logoFile);
    } else {
      updateSettings({
        businessName,
        ownerName,
        primaryColor,
        secondaryColor,
        tertiaryColor,
        logoUrl: null, // Clear logo if no file is selected
      });
      alert('Whitelabel settings saved!');
    }
  };

  const handleReset = () => {
    resetSettings(); // Call context reset
    setBusinessName(defaultSettings.businessName);
    setOwnerName(defaultSettings.ownerName);
    setPrimaryColor(defaultSettings.primaryColor);
    setSecondaryColor(defaultSettings.secondaryColor);
    setTertiaryColor(defaultSettings.tertiaryColor);
    setLogoFile(null);
    setLogoPreviewUrl(null);
    alert('Whitelabel settings reset!');
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

        {/* New Tertiary Color Input */}
        <div className="mb-5">
          <label htmlFor="tertiaryColor" className="block text-gray-700 text-sm font-bold mb-2">
            Tertiary Color:
          </label>
          <input
            type="color"
            id="tertiaryColor"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 w-24"
            value={tertiaryColor}
            onChange={(e) => setTertiaryColor(e.target.value)}
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
            {logoPreviewUrl && ( // Use logoPreviewUrl for display
              <img
                src={logoPreviewUrl}
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
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
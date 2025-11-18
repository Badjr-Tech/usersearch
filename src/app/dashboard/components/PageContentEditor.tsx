'use client';

import { useState, useEffect, useActionState } from 'react';
import { updatePageContent } from '../page-content/actions';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

interface PageContentEditorProps {
  pagePath: string;
  initialContent: any; // Can be a complex object
  onSaveSuccess: () => void;
}

export default function PageContentEditor({ pagePath, initialContent, onSaveSuccess }: PageContentEditorProps) {
  const { settings } = useWhitelabel();
  const [content, setContent] = useState(initialContent);
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await updatePageContent(pagePath, content);
    if (result?.message) {
      onSaveSuccess();
    }
    return result;
  }, undefined);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (listName: string, index: number, value: string) => {
    setContent((prev: any) => {
      const list = [...prev[listName]];
      list[index] = value;
      return { ...prev, [listName]: list };
    });
  };

  const handleAddListItem = (listName: string, defaultValue: string = '') => {
    setContent((prev: any) => ({
      ...prev,
      [listName]: [...(prev[listName] || []), defaultValue],
    }));
  };

  const handleRemoveListItem = (listName: string, index: number) => {
    setContent((prev: any) => {
      const list = [...prev[listName]];
      list.splice(index, 1);
      return { ...prev, [listName]: list };
    });
  };

  const handleLinkChange = (listName: string, index: number, field: 'text' | 'href', value: string) => {
    setContent((prev: any) => {
      const list = [...prev[listName]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listName]: list };
    });
  };

  const handleAddLinkItem = (listName: string) => {
    setContent((prev: any) => ({
      ...prev,
      [listName]: [...(prev[listName] || []), { text: '', href: '' }],
    }));
  };

  const handleRemoveLinkItem = (listName: string, index: number) => {
    setContent((prev: any) => {
      const list = [...prev[listName]];
      list.splice(index, 1);
      return { ...prev, [listName]: list };
    });
  };

  const renderOnboardingEditor = () => (
    <>
      <div className="mb-4">
        <label htmlFor="mainTitle" className="block text-sm font-medium text-gray-700">Main Title</label>
        <input type="text" id="mainTitle" name="mainTitle" value={content.mainTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="mainDescription" className="block text-sm font-medium text-gray-700">Main Description</label>
        <textarea id="mainDescription" name="mainDescription" value={content.mainDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>

      <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Welcome Section</h4>
      <div className="mb-4">
        <label htmlFor="welcomeTitle" className="block text-sm font-medium text-gray-700">Welcome Title</label>
        <input type="text" id="welcomeTitle" name="welcomeTitle" value={content.welcomeTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="welcomeDescription" className="block text-sm font-medium text-gray-700">Welcome Description</label>
        <textarea id="welcomeDescription" name="welcomeDescription" value={content.welcomeDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Welcome List</label>
        {content.welcomeList?.map((item: string, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input type="text" value={item} onChange={(e) => handleListChange('welcomeList', index, e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            <button type="button" onClick={() => handleRemoveListItem('welcomeList', index)} className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddListItem('welcomeList')} className="mt-2 px-3 py-1 rounded-md text-white" style={{ backgroundColor: settings.secondaryColor }}>Add Item</button>
      </div>

      <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Training & Development Section</h4>
      <div className="mb-4">
        <label htmlFor="trainingTitle" className="block text-sm font-medium text-gray-700">Training Title</label>
        <input type="text" id="trainingTitle" name="trainingTitle" value={content.trainingTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="trainingDescription" className="block text-sm font-medium text-gray-700">Training Description</label>
        <textarea id="trainingDescription" name="trainingDescription" value={content.trainingDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Training Links</label>
        {content.trainingLinks?.map((link: { text: string; href: string }, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input type="text" placeholder="Text" value={link.text || ''} onChange={(e) => handleLinkChange('trainingLinks', index, 'text', e.target.value)} className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="URL" value={link.href || ''} onChange={(e) => handleLinkChange('trainingLinks', index, 'href', e.target.value)} className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md" />
            <button type="button" onClick={() => handleRemoveLinkItem('trainingLinks', index)} className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddLinkItem('trainingLinks')} className="mt-2 px-3 py-1 rounded-md text-white" style={{ backgroundColor: settings.secondaryColor }}>Add Link</button>
      </div>

      <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Important Links Section</h4>
      <div className="mb-4">
        <label htmlFor="linksTitle" className="block text-sm font-medium text-gray-700">Links Title</label>
        <input type="text" id="linksTitle" name="linksTitle" value={content.linksTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Important Links</label>
        {content.importantLinks?.map((link: { text: string; href: string }, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input type="text" placeholder="Text" value={link.text || ''} onChange={(e) => handleLinkChange('importantLinks', index, 'text', e.target.value)} className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="URL" value={link.href || ''} onChange={(e) => handleLinkChange('importantLinks', index, 'href', e.target.value)} className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md" />
            <button type="button" onClick={() => handleRemoveLinkItem('importantLinks', index)} className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddLinkItem('importantLinks')} className="mt-2 px-3 py-1 rounded-md text-white" style={{ backgroundColor: settings.secondaryColor }}>Add Link</button>
      </div>
    </>
  );

  const renderProcessManualEditor = () => (
    <>
      <div className="mb-4">
        <label htmlFor="mainTitle" className="block text-sm font-medium text-gray-700">Main Title</label>
        <input type="text" id="mainTitle" name="mainTitle" value={content.mainTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="mainDescription" className="block text-sm font-medium text-gray-700">Main Description</label>
        <textarea id="mainDescription" name="mainDescription" value={content.mainDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="tocTitle" className="block text-sm font-medium text-gray-700">Table of Contents Title</label>
        <input type="text" id="tocTitle" name="tocTitle" value={content.tocTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Table of Contents Items</label>
        {content.tocItems?.map((item: string, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input type="text" value={item} onChange={(e) => handleListChange('tocItems', index, e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            <button type="button" onClick={() => handleRemoveListItem('tocItems', index)} className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddListItem('tocItems')} className="mt-2 px-3 py-1 rounded-md text-white" style={{ backgroundColor: settings.secondaryColor }}>Add Item</button>
      </div>
    </>
  );

  const renderPhilosophyEditor = () => (
    <>
      <div className="mb-4">
        <label htmlFor="mainTitle" className="block text-sm font-medium text-gray-700">Main Title</label>
        <input type="text" id="mainTitle" name="mainTitle" value={content.mainTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="mainDescription" className="block text-sm font-medium text-gray-700">Main Description</label>
        <textarea id="mainDescription" name="mainDescription" value={content.mainDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="missionTitle" className="block text-sm font-medium text-gray-700">Mission Title</label>
        <input type="text" id="missionTitle" name="missionTitle" value={content.missionTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="missionDescription" className="block text-sm font-medium text-gray-700">Mission Description</label>
        <textarea id="missionDescription" name="missionDescription" value={content.missionDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="valuesTitle" className="block text-sm font-medium text-gray-700">Values Title</label>
        <input type="text" id="valuesTitle" name="valuesTitle" value={content.valuesTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Values List</label>
        {content.valuesList?.map((item: string, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input type="text" value={item} onChange={(e) => handleListChange('valuesList', index, e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            <button type="button" onClick={() => handleRemoveListItem('valuesList', index)} className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddListItem('valuesList')} className="mt-2 px-3 py-1 rounded-md text-white" style={{ backgroundColor: settings.secondaryColor }}>Add Item</button>
      </div>
    </>
  );

  const renderScheduleATimeEditor = () => (
    <>
      <div className="mb-4">
        <label htmlFor="mainTitle" className="block text-sm font-medium text-gray-700">Main Title</label>
        <input type="text" id="mainTitle" name="mainTitle" value={content.mainTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="mainDescription" className="block text-sm font-medium text-gray-700">Main Description</label>
        <textarea id="mainDescription" name="mainDescription" value={content.mainDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="bookingLinkTitle" className="block text-sm font-medium text-gray-700">Booking Link Title</label>
        <input type="text" id="bookingLinkTitle" name="bookingLinkTitle" value={content.bookingLinkTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="bookingLinkUrl" className="block text-sm font-medium text-gray-700">Booking Link URL</label>
        <input type="text" id="bookingLinkUrl" name="bookingLinkUrl" value={content.bookingLinkUrl || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea id="instructions" name="instructions" value={content.instructions || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
    </>
  );

  return (
    <div className="mt-8 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-foreground mb-4">Edit Page Content</h3>
      <form action={formAction} className="space-y-4">
        {pagePath === '/dashboard/onboarding' && renderOnboardingEditor()}
        {pagePath === '/dashboard/process-manual' && renderProcessManualEditor()}
        {pagePath === '/dashboard/philosophy' && renderPhilosophyEditor()}
        {pagePath === '/dashboard/schedule-a-time' && renderScheduleATimeEditor()}

        {state?.message && <p className="text-green-500 text-sm">{state.message}</p>}
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

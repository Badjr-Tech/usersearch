'use client';

import { getLibraryItems, deleteLibraryItem } from './actions';
import { useEffect, useState } from 'react';
import CreateItemModal from './CreateItemModal';
import CreateCategoryModal from './CreateCategoryModal';

type Category = {
  id: number;
  name: string;
};

type LibraryItem = {
  id: number;
  title: string;
  description: string | null;
  url: string;
  itemType: "document" | "video";
  uploaderId: number;
  createdAt: Date;
  category: Category | null;
};

function LibraryItemCard({ item, handleDelete }: { item: LibraryItem, handleDelete: (id: number) => void }) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
        {item.itemType === 'video' ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={getYouTubeEmbedUrl(item.url)}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            View Document
          </a>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const items = await getLibraryItems();
      setLibraryItems(items as LibraryItem[]);
    }
    fetchItems();
  }, [isItemModalOpen, isCategoryModalOpen]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteLibraryItem(id);
      const items = await getLibraryItems();
      setLibraryItems(items as LibraryItem[]);
    }
  };

  const groupedItems = libraryItems.reduce((acc, item) => {
    const categoryName = item.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, LibraryItem[]>);

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Library</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Add New Category
          </button>
          <button
            onClick={() => setIsItemModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add New Item
          </button>
        </div>
      </div>
      
      {isItemModalOpen && <CreateItemModal onClose={() => setIsItemModalOpen(false)} />}
      {isCategoryModalOpen && <CreateCategoryModal onClose={() => setIsCategoryModalOpen(false)} />}

      <div className="mt-8 space-y-8">
        {Object.entries(groupedItems).map(([categoryName, items]) => (
          <div key={categoryName}>
            <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <LibraryItemCard key={item.id} item={item} handleDelete={handleDelete} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
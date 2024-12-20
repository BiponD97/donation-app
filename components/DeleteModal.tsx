import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  id: string;
  onDelete: () => void;
  onClose: () => void;
}

export default function DeleteModal({ id, onDelete, onClose }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .match({ id });

      if (error) throw error;
      onDelete();
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting donation');
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-medium text-gray-900">Delete Donation</h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete this donation? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
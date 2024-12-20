import { useState } from 'react';
import { DonationFormData } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

export default function DonationForm({ onSubmit, onClose }: Props) {
  const [formData, setFormData] = useState<DonationFormData>({
    name: '',
    phone: '',
    relationship: '',
    relname: '',
    guru: '',
    address: '',
    amount: '',
    date: '',
    info: '',
    image: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = null;
      
      if (formData.image) {
        const file = formData.image;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('donation-images')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        imageUrl = uploadData.path;
      }
      
      const { error } = await supabase.from('donations').insert([{
        ...formData,
        image: imageUrl,
        amount: parseFloat(formData.amount)
      }]);
      
      if (error) throw error;
      
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving donation');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        {/* Add other form fields similarly */}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md text-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Donation
        </button>
      </div>
    </form>
  );
}
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DonationFormData } from '@/types';

interface Props {
  onSubmit: () => void;
  onClose: () => void;
  onError: (message: string) => void;
}

export default function DonationForm({ onSubmit, onClose, onError }: Props) {
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
          
        if (uploadError) {
          onError('Error uploading image');
          return;
        }
        imageUrl = uploadData.path;
      }
      
      const { error } = await supabase.from('donations').insert([{
        ...formData,
        image: imageUrl,
        amount: parseFloat(formData.amount)
      }]);
      
      if (error) throw error;
      
      onSubmit();
    } catch (error) {
      console.error('Error:', error);
      onError('Error saving donation');
    }
  };

  // Rest of your form JSX...
}
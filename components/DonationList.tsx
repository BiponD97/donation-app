'use client';

import { useState, useEffect } from 'react';
import { Donation } from '../types';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

export default function DonationList() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Transform image URLs
      const transformedData = data?.map(donation => ({
        ...donation,
        image: donation.image ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/donation-images/${donation.image}` : null
      }));
      
      setDonations(transformedData || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching donations');
    }
  };

  // Rest of your component code...
}
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
      setDonations(data || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching donations');
    }
  };

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              {/* Add other table headers */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap">{donation.name}</td>
                {/* Add other table cells */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
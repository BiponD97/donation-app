// pages/index.js
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera } from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DonationApp() {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
    relname: '',
    guru: '',
    address: '',
    amount: '',
    date: '',
    info: '',
    image: null
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      setAlert({
        type: 'error',
        message: 'Error fetching donations'
      });
      return;
    }
    
    setDonations(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Upload image if exists
    let imageUrl = null;
    if (formData.image) {
      const file = formData.image;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('donation-images')
        .upload(fileName, file);
        
      if (uploadError) {
        setAlert({
          type: 'error',
          message: 'Error uploading image'
        });
        return;
      }
      
      imageUrl = uploadData.path;
    }
    
    // Save donation data
    const { data, error } = await supabase
      .from('donations')
      .insert([{
        ...formData,
        image: imageUrl
      }]);
      
    if (error) {
      setAlert({
        type: 'error',
        message: 'Error saving donation'
      });
      return;
    }
    
    setAlert({
      type: 'success',
      message: 'Donation saved successfully'
    });
    
    setFormData({
      name: '',
      phone: '',
      relationship: '',
      relname: '',
      guru: '',
      address: '',
      amount: '',
      date: '',
      info: '',
      image: null
    });
    
    setShowForm(false);
    fetchDonations();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Donation Management
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {alert && (
          <Alert className={alert.type === 'error' ? 'bg-red-100' : 'bg-green-100'}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <div className="px-4 py-6 sm:px-0">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? 'Close Form' : 'New Donation'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Add other form fields similarly */}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Donation
                </button>
              </div>
            </form>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donation.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donation.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${donation.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
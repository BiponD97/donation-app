'use client';

import { useState } from 'react';
import Header from '../components/Header';
import DonationForm from '../components/DonationForm';
import DonationList from '../components/DonationList';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Donation
          </button>

          {showForm && (
            <DonationForm
              onSubmit={() => {
                // Refresh list
                window.location.reload();
              }}
              onClose={() => setShowForm(false)}
            />
          )}

          <DonationList />
        </div>
      </main>
    </div>
  );
}
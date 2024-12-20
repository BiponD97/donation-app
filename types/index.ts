export interface Donation {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  relname: string;
  guru: string;
  address: string;
  amount: number;
  date: string;
  info: string;
  image: string | null;
  created_at: string;
}

export interface DonationFormData {
  name: string;
  phone: string;
  relationship: string;
  relname: string;
  guru: string;
  address: string;
  amount: string;
  date: string;
  info: string;
  image: File | null;
}
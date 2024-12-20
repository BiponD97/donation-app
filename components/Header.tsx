import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center space-x-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold text-gray-900">
          Donation Management System
        </h1>
      </div>
    </header>
  );
}
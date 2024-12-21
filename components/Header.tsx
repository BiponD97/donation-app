import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center space-x-4">
        <div className="relative w-[50px] h-[50px]">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Donation Management System
        </h1>
      </div>
    </header>
  );
}
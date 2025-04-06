import { JSX } from 'react'
import { AlertTriangle, List } from 'lucide-react';
import { PageType } from '../types';

interface HomePageProps {
  setCurrentPage: (page: PageType) => void;
}

const HomePage = ({ setCurrentPage }: HomePageProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Water & Electricity Fault Reporting</h1>

      <div className="flex justify-center mb-8 w-full">
        <button
          onClick={() => setCurrentPage('report')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center w-full max-w-xs transition-all transform hover:scale-105"
        >
          <AlertTriangle className="mr-2" />
          Report Fault
        </button>
      </div>

      <div className="w-full">
        <button
          onClick={() => setCurrentPage('list')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow flex items-center justify-center w-full mb-6 transition-all"
        >
          <List className="mr-2" />
          View Existing Faults
        </button>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 w-full">
        <h3 className="font-semibold mb-2 text-blue-800">Report issues quickly</h3>
        <p className="text-sm text-gray-700">Use this app to report water leaks, electricity outages, or other infrastructure problems in your area.</p>
      </div>
    </div>
  );
};

export default HomePage;
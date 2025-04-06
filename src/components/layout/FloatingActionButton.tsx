import { AlertTriangle } from 'lucide-react';
import { PageType } from '../../types';

interface FloatingActionButtonProps {
  setCurrentPage: (page: PageType) => void;
}

const FloatingActionButton = ({ setCurrentPage }: FloatingActionButtonProps): JSX.Element => {
  return (
    <div className="fixed bottom-4 right-4">
      <button 
        onClick={() => setCurrentPage('report')}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105"
      >
        <AlertTriangle />
      </button>
    </div>
  );
};

export default FloatingActionButton;
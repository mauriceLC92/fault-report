import { Home, List } from 'lucide-react';
import { PageType } from '../../types';

interface AppHeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const AppHeader = ({ currentPage, setCurrentPage }: AppHeaderProps): JSX.Element => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="max-w-md mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <div className="flex space-x-1">
            <span className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">💧</span>
            </span>
            <span className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </span>
          </div>
          <h2 className="text-lg font-semibold ml-2">FixItFast</h2>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setCurrentPage('home')} 
            className={`p-2 rounded-full ${currentPage === 'home' ? 'bg-gray-100' : ''}`}
          >
            <Home size={20} className={currentPage === 'home' ? 'text-blue-600' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('list')} 
            className={`p-2 rounded-full ${currentPage === 'list' ? 'bg-gray-100' : ''}`}
          >
            <List size={20} className={currentPage === 'list' ? 'text-blue-600' : 'text-gray-500'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
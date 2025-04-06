import { ChevronLeft } from 'lucide-react';
import { PageType } from '../../types';

interface BackButtonProps {
  setCurrentPage: (page: PageType) => void;
  targetPage: PageType;
}

const BackButton = ({ setCurrentPage, targetPage }: BackButtonProps): JSX.Element => {
  return (
    <button onClick={() => setCurrentPage(targetPage)} className="mr-2 p-1">
      <ChevronLeft />
    </button>
  );
};

export default BackButton;
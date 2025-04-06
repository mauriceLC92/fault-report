import { List } from 'lucide-react';

const EmptyState = (): JSX.Element => {
  return (
    <div className="text-center py-8 text-gray-500">
      <List className="w-12 h-12 mx-auto mb-2 text-gray-400" />
      <p>No faults found with current filters</p>
    </div>
  );
};

export default EmptyState;
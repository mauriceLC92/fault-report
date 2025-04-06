import { ChangeEvent } from 'react';
import { AlertTriangle, List } from 'lucide-react';
import { Fault, PageType } from '../types';
import BackButton from '../components/ui/BackButton';
import EmptyState from '../components/ui/EmptyState';
import FaultCard from '../components/ui/FaultCard';

interface FaultListPageProps {
  setCurrentPage: (page: PageType) => void;
  filteredFaults: Fault[];
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  areaFilter: string;
  setAreaFilter: (filter: string) => void;
  areas: string[];
}

const FaultListPage = ({
  setCurrentPage,
  filteredFaults,
  statusFilter,
  setStatusFilter,
  areaFilter,
  setAreaFilter,
  areas
}: FaultListPageProps): JSX.Element => {
  
  const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleAreaFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAreaFilter(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BackButton setCurrentPage={setCurrentPage} targetPage="home" />
          <h1 className="text-xl font-bold">Fault List</h1>
        </div>
        <button 
          onClick={() => setCurrentPage('report')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded-lg flex items-center"
        >
          <AlertTriangle size={16} className="mr-1" />
          Report
        </button>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <select 
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        
        <select 
          value={areaFilter}
          onChange={handleAreaFilterChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
        >
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>
      
      {filteredFaults.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {/* Group by area */}
          {areas.filter(area => area !== 'All').map(area => {
            const areaFaults = filteredFaults.filter(fault => fault.area === area);
            if (areaFaults.length === 0) return null;
            
            return (
              <div key={area}>
                <h3 className="font-medium text-gray-700 bg-gray-100 p-2 rounded mt-4">{area}</h3>
                {areaFaults.map(fault => (
                  <FaultCard key={fault.id} fault={fault} />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FaultListPage;
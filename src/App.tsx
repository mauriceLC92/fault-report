import { useState, FormEvent, ReactElement } from 'react';
import { Fault, NewFault, PageType } from './types';
import AppHeader from './components/layout/AppHeader';
import FloatingActionButton from './components/layout/FloatingActionButton';
import HomePage from './pages/HomePage';
import ReportFaultPage from './pages/ReportFaultPage';
import FaultListPage from './pages/FaultListPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

// Main App Component
const FaultReportingApp = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [faults, setFaults] = useState<Fault[]>([
    { id: 1, description: 'Water pipe burst on street corner', address: '123 Main St, Downtown', severity: 'High', name: 'John Smith', contact: '555-0123', area: 'Downtown', status: 'Pending', image: null },
    { id: 2, description: 'Power outage affecting entire block', address: '456 Oak Ave, Westside', severity: 'High', name: 'Maria Garcia', contact: '555-0456', area: 'Westside', status: 'In Progress', image: null },
    { id: 3, description: 'Flickering street light', address: '789 Pine Rd, Northside', severity: 'Low', name: 'Robert Johnson', contact: '555-0789', area: 'Northside', status: 'Resolved', image: null },
  ]);
  const [newFault, setNewFault] = useState<NewFault>({
    description: '',
    address: '',
    severity: 'Medium',
    name: '',
    contact: '',
    area: '',
    status: 'Pending',
    image: null
  });
  const [submittedFault, setSubmittedFault] = useState<Fault | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [areaFilter, setAreaFilter] = useState<string>('All');

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newFaultWithId = { ...newFault, id: faults.length + 1 };
    setFaults([...faults, newFaultWithId]);
    setSubmittedFault(newFaultWithId);
    setCurrentPage('confirmation');
    // Reset form
    setNewFault({
      description: '',
      address: '',
      severity: 'Medium',
      name: '',
      contact: '',
      area: '',
      status: 'Pending',
      image: null
    });
  };

  // Filter faults
  const filteredFaults: Fault[] = faults.filter(fault => {
    const matchesStatus = statusFilter === 'All' || fault.status === statusFilter;
    const matchesArea = areaFilter === 'All' || fault.area === areaFilter;
    return matchesStatus && matchesArea;
  });

  // Get unique areas for filter
  const areas: string[] = ['All', ...new Set(faults.map(fault => fault.area))];

  // Render pages based on current state
  const renderPage = (): ReactElement => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
        
      case 'report':
        return (
          <ReportFaultPage 
            setCurrentPage={setCurrentPage}
            newFault={newFault}
            setNewFault={setNewFault}
            handleSubmit={handleSubmit}
          />
        );
        
      case 'list':
        return (
          <FaultListPage
            setCurrentPage={setCurrentPage}
            filteredFaults={filteredFaults}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            areaFilter={areaFilter}
            setAreaFilter={setAreaFilter}
            areas={areas}
          />
        );
        
      case 'confirmation':
        return (
          <ConfirmationPage
            setCurrentPage={setCurrentPage}
            submittedFault={submittedFault}
          />
        );
        
      default:
        return <div>Unknown page</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AppHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="pb-20">
        {renderPage()}
      </main>
      
      {currentPage !== 'report' && (
        <FloatingActionButton setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default FaultReportingApp;
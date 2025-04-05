import { useState, ChangeEvent, FormEvent, ReactElement } from 'react';
import { Camera, List, Home, AlertTriangle, Check, X, ChevronLeft, MapPin, Phone, User, Share2 } from 'lucide-react';

// Define types for our application
interface Fault {
  id: number;
  description: string;
  address: string;
  severity: string;
  name: string;
  contact: string;
  area: string;
  status: string;
  image: string | null;
}

interface NewFault {
  description: string;
  address: string;
  severity: string;
  name: string;
  contact: string;
  area: string;
  status: string;
  image: string | null;
}

// Main App Component
const FaultReportingApp = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<string>('home');
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

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setNewFault({ ...newFault, [name]: value });
    
    // Extract area from address for filtering purposes
    if (name === 'address' && value.includes(',')) {
      const area = value.split(',')[1].trim();
      setNewFault(prev => ({ ...prev, area }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFault({ ...newFault, image: reader.result as string | null });
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Share via WhatsApp
  const shareViaWhatsApp = (): void => {
    if (!submittedFault) return;
    
    const text = `🚨 Fault Report 🚨
Description: ${submittedFault.description}
Address: ${submittedFault.address}
Severity: ${submittedFault.severity}
Name: ${submittedFault.name}
Contact: ${submittedFault.contact}
Status: Pending`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
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
        
      case 'report':
        return (
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center mb-4">
              <button onClick={() => setCurrentPage('home')} className="mr-2 p-1">
                <ChevronLeft />
              </button>
              <h1 className="text-xl font-bold">Report New Fault</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fault Description*</label>
                <textarea 
                  name="description" 
                  value={newFault.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe the issue..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    name="address" 
                    value={newFault.address}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Street address, City"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity*</label>
                <select 
                  name="severity" 
                  value={newFault.severity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    name="name" 
                    value={newFault.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <input 
                    type="tel" 
                    name="contact" 
                    value={newFault.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-xs text-gray-500">Click to upload photo</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                {newFault.image && (
                  <div className="mt-2 relative">
                    <img src={newFault.image} alt="Preview" className="h-20 w-auto rounded" />
                    <button 
                      type="button"
                      onClick={() => setNewFault({...newFault, image: null})}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-colors"
                >
                  Submit Fault Report
                </button>
              </div>
            </form>
          </div>
        );
        
      case 'list':
        return (
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button onClick={() => setCurrentPage('home')} className="mr-2 p-1">
                  <ChevronLeft />
                </button>
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
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              
              <select 
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            
            {filteredFaults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <List className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No faults found with current filters</p>
              </div>
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
                        <div key={fault.id} className="border rounded-lg p-3 shadow-sm mb-3 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{fault.description}</p>
                              <p className="text-sm text-gray-600">{fault.address}</p>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              fault.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              fault.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {fault.status}
                            </span>
                          </div>
                          <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>Severity: {fault.severity}</span>
                            <span>Reported by: {fault.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
        
      case 'confirmation':
        return (
          <div className="max-w-md mx-auto p-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-xl font-bold">Fault Reported Successfully</h1>
              <p className="text-gray-600 mt-1">Thank you for your report</p>
            </div>
            
            {submittedFault && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="font-semibold mb-3 pb-2 border-b">Fault Summary</h2>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Description:</span>
                    <p>{submittedFault.description}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Address:</span>
                    <p>{submittedFault.address}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Severity:</span>
                    <p>{submittedFault.severity}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <p>{submittedFault.name}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Contact number:</span>
                    <p>{submittedFault.contact}</p>
                  </div>
                  
                  {submittedFault.image && (
                    <div>
                      <span className="text-sm text-gray-500">Image:</span>
                      <img src={submittedFault.image} alt="Reported fault" className="mt-1 rounded h-32 w-auto" />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={shareViaWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow flex items-center justify-center"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share via WhatsApp
              </button>
              
              <button 
                onClick={() => setCurrentPage('list')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow flex items-center justify-center"
              >
                <List className="mr-2 h-5 w-5" />
                View All Faults
              </button>
              
              <button 
                onClick={() => setCurrentPage('home')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg shadow flex items-center justify-center"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </button>
            </div>
          </div>
        );
        
      default:
        return <div>Unknown page</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
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
      
      <main className="pb-20">
        {renderPage()}
      </main>
      
      {currentPage !== 'report' && (
        <div className="fixed bottom-4 right-4">
          <button 
            onClick={() => setCurrentPage('report')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105"
          >
            <AlertTriangle />
          </button>
        </div>
      )}
    </div>
  );
};

export default FaultReportingApp;
import { Check, Home, List, Share2 } from 'lucide-react';
import { Fault, PageType } from '../types';
import ActionButton from '../components/ui/ActionButton';

interface ConfirmationPageProps {
  setCurrentPage: (page: PageType) => void;
  submittedFault: Fault | null;
}

const ConfirmationPage = ({ 
  setCurrentPage, 
  submittedFault 
}: ConfirmationPageProps): JSX.Element => {
  
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
        <ActionButton 
          onClick={shareViaWhatsApp}
          icon={Share2}
          label="Share via WhatsApp"
        />
        
        <ActionButton 
          onClick={() => setCurrentPage('list')}
          icon={List}
          label="View All Faults"
          secondary
        />
        
        <ActionButton 
          onClick={() => setCurrentPage('home')}
          icon={Home}
          label="Back to Home"
          tertiary
        />
      </div>
    </div>
  );
};

export default ConfirmationPage;
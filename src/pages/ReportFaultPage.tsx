import { ChangeEvent, FormEvent } from 'react';
import { MapPin, Phone, User } from 'lucide-react';
import { NewFault, PageType } from '../types';
import BackButton from '../components/ui/BackButton';
import IconInput from '../components/ui/IconInput';
import ImageUploader from '../components/ui/ImageUploader';

interface ReportFaultPageProps {
  setCurrentPage: (page: PageType) => void;
  newFault: NewFault;
  setNewFault: React.Dispatch<React.SetStateAction<NewFault>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ReportFaultPage = ({ 
  setCurrentPage, 
  newFault, 
  setNewFault, 
  handleSubmit 
}: ReportFaultPageProps): JSX.Element => {
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setNewFault({ ...newFault, [name]: value });
    
    // Extract area from address for filtering purposes
    if (name === 'address' && value.includes(',')) {
      const area = value.split(',')[1].trim();
      setNewFault(prev => ({ ...prev, area }));
    }
  };

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

  const handleImageRemove = (): void => {
    setNewFault({...newFault, image: null});
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center mb-4">
        <BackButton setCurrentPage={setCurrentPage} targetPage="home" />
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
        
        <IconInput 
          type="text" 
          name="address" 
          value={newFault.address}
          onChange={handleInputChange}
          required={true}
          placeholder="Street address, City"
          label="Address"
          Icon={MapPin}
        />
        
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
        
        <IconInput 
          type="text" 
          name="name" 
          value={newFault.name}
          onChange={handleInputChange}
          required={true}
          placeholder="Full name"
          label="Your Name"
          Icon={User}
        />
        
        <IconInput 
          type="tel" 
          name="contact" 
          value={newFault.contact}
          onChange={handleInputChange}
          required={true}
          placeholder="Your phone number"
          label="Contact Number"
          Icon={Phone}
        />
        
        <ImageUploader 
          image={newFault.image} 
          onImageUpload={handleImageUpload} 
          onImageRemove={handleImageRemove} 
        />
        
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
};

export default ReportFaultPage;
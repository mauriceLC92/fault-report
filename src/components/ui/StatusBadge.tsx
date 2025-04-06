interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps): JSX.Element => {
  const badgeClasses = 
    status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
    status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
    'bg-green-100 text-green-800';

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
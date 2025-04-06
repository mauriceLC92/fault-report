import { JSX } from 'react'
import { Fault } from "../../types";
import StatusBadge from "./StatusBadge";

interface FaultCardProps {
  fault: Fault;
}

const FaultCard = ({ fault }: FaultCardProps): JSX.Element => {
  return (
    <div className="border rounded-lg p-3 shadow-sm mb-3 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{fault.description}</p>
          <p className="text-sm text-gray-600">{fault.address}</p>
        </div>
        <StatusBadge status={fault.status} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>Severity: {fault.severity}</span>
        <span>Reported by: {fault.name}</span>
      </div>
    </div>
  );
};

export default FaultCard;
import React from 'react';
import { BranchesContactPage } from './BranchesContactPage';

interface LocationsPageProps {
  onOpenRegister: (program?: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ onOpenRegister }) => {
  return <BranchesContactPage onOpenRegister={onOpenRegister} />;
};

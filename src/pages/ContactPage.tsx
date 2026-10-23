import React from 'react';
import { BranchesContactPage } from './BranchesContactPage';

interface ContactPageProps {
  onOpenRegister: (program?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenRegister }) => {
  return <BranchesContactPage onOpenRegister={onOpenRegister} />;
};

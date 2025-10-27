import type { ReactNode } from 'react';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const CardHeaderCustom = ({ title, description, icon }: Props) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

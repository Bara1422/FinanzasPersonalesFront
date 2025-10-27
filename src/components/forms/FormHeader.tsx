import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

interface Props {
  title: string;
  description: string;
}

export const FormDialogHeader = ({title, description}: Props) => {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );
};

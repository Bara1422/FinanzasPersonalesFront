import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export const EditDeleteButtons = () => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer hover:bg-accent-foreground/10"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer hover:bg-accent-foreground/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = React.ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

export default function Field({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

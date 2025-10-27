import { UserFormButtons } from "@/components/forms/UserFormButtons";
import { CardFooter } from "@/components/ui/card";

export const UserCardFooter = () => {
  return (
    <CardFooter>
      <UserFormButtons
        onChangeEditting={onChangeEditting}
        isEditting={isEditting}
        form={form}
        uniqueId={uniqueId}
        isLoading={isLoading}
      />
    </CardFooter>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface Props {
  title: string;
  description: string;
  text: string;
}

export const EmptyDataCard = ({ title, description, text }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          {text}
        </p>
      </CardContent>
    </Card>
  );
};

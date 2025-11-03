import type { PropsWithChildren } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">Finanzas Personales</p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

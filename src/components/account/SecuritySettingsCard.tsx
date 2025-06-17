// src/components/account/SecuritySettingsCard.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SecuritySettingsCard() {
  return (
    <Card className="shadow-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Configurações de Segurança</CardTitle>
        <CardDescription>Gerencie sua senha e autenticação.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Mudar Senha</Button>
      </CardContent>
    </Card>
  );
}
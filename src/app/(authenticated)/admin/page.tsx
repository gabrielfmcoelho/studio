"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Users, AppWindow, Edit, Code, Package, BarChart2 } from 'lucide-react';

// --- MOCK DATA ---
type Application = { id: string; name: string; description: string; isActive: boolean; };
type Organization = { id: string; name: string; isActive: boolean; inviteCode: string; allowedAppIds: string[]; };
type User = { id: string; name: string; email: string; orgId: string; role: string; };
type AccessLog = { logId: string; userId: string; userName: string; orgId: string; orgName: string; accessDate: string; };

const ALL_APPLICATIONS_LIST: Application[] = [
    { id: 'app_data_analyzer', name: 'Analisador de Dados IA', description: 'Business Intelligence com IA.', isActive: true },
    { id: 'app_project_tracker', name: 'Gerenciador de Projetos Ágil', description: 'Quadros Kanban e Scrum.', isActive: true },
    { id: 'app_crm_plus', name: 'CRM Plus', description: 'Otimize seu funil de vendas.', isActive: true },
    { id: 'app_inventory_pro', name: 'Controle de Estoque Pro', description: 'Gestão de inventário e pedidos.', isActive: false },
];

const initialOrganizations: Organization[] = [
    { id: 'ORG001', name: 'InovaCorp', isActive: true, inviteCode: 'INVC-8421', allowedAppIds: ['app_data_analyzer', 'app_crm_plus'] },
    { id: 'ORG002', name: 'Solutions Ltda', isActive: true, inviteCode: 'SLTN-1597', allowedAppIds: ['app_project_tracker'] },
    { id: 'ORG003', name: 'TechGlobal', isActive: false, inviteCode: 'TCGL-3579', allowedAppIds: [] },
];

const initialUsers: User[] = [
    { id: 'USR01', name: 'Alice', email: 'alice@inovacorp.com', orgId: 'ORG001', role: 'Admin' },
    { id: 'USR04', name: 'David', email: 'dave@inovacorp.com', orgId: 'ORG001', role: 'User' },
    { id: 'USR02', name: 'Bruno', email: 'bruno@solutions.com', orgId: 'ORG002', role: 'User' },
];

// New Mock Data for Usage Tab
const initialAccessLogs: AccessLog[] = [
    // Today's Date (June 17, 2025)
    { logId: 'L01', userId: 'USR01', userName: 'Alice', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-17T09:05:00Z' },
    { logId: 'L02', userId: 'USR02', userName: 'Bruno', orgId: 'ORG002', orgName: 'Solutions Ltda', accessDate: '2025-06-17T10:15:00Z' },
    { logId: 'L03', userId: 'USR01', userName: 'Alice', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-17T11:30:00Z' },
    // Yesterday
    { logId: 'L04', userId: 'USR04', userName: 'David', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-16T14:00:00Z' },
    { logId: 'L05', userId: 'USR02', userName: 'Bruno', orgId: 'ORG002', orgName: 'Solutions Ltda', accessDate: '2025-06-16T16:45:00Z' },
    { logId: 'L06', userId: 'USR01', userName: 'Alice', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-16T09:00:00Z' },
    // Two Days Ago
    { logId: 'L07', userId: 'USR01', userName: 'Alice', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-15T10:00:00Z' },
    { logId: 'L08', userId: 'USR04', userName: 'David', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-15T11:00:00Z' },
    { logId: 'L09', userId: 'USR02', userName: 'Bruno', orgId: 'ORG002', orgName: 'Solutions Ltda', accessDate: '2025-06-15T12:00:00Z' },
    { logId: 'L10', userId: 'USR01', userName: 'Alice', orgId: 'ORG001', orgName: 'InovaCorp', accessDate: '2025-06-15T13:00:00Z' },
];
// --- END MOCK DATA ---

// --- MODAL COMPONENTS (unchanged from previous step, included for completeness) ---
const CreateOrganizationModal=({open,setOpen,onSave}:any)=><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Criar Nova Organização</DialogTitle><DialogDescription>Insira o nome da nova organização.</DialogDescription></DialogHeader><div className="py-4"><Label htmlFor="org-name">Nome</Label><Input id="org-name" onInput={(e:any)=>e.target.value&&onSave(e.target.value)} /></div><DialogFooter><DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose><Button onClick={()=>setOpen(false)}>Salvar</Button></DialogFooter></DialogContent></Dialog>;
const ManageOrgApplicationsModal=({open,setOpen,organization,allApps,onSave}:any)=><Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-md"><DialogHeader><DialogTitle>Gerenciar Aplicações</DialogTitle><DialogDescription>Selecione as aplicações para <span className="font-bold">{organization?.name}</span>.</DialogDescription></DialogHeader><div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">{allApps.filter((app:any)=>app.isActive).map((app:any)=><div key={app.id} className="flex items-center space-x-3 rounded-md border p-4"><Checkbox id={`app-${app.id}`} defaultChecked={organization?.allowedAppIds.includes(app.id)} /><Label htmlFor={`app-${app.id}`} className="font-medium flex-1 cursor-pointer">{app.name}</Label></div>)}</div><DialogFooter><DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose><Button onClick={()=>setOpen(false)}>Salvar</Button></DialogFooter></DialogContent></Dialog>;
const ManageAppDetailsModal=({open,setOpen,app,onSave}:any)=><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{app?'Editar':'Criar'} Aplicação</DialogTitle></DialogHeader><div className="py-4 space-y-4"><div><Label htmlFor="app-detail-name">Nome</Label><Input id="app-detail-name" defaultValue={app?.name}/></div><div><Label htmlFor="app-detail-desc">Descrição</Label><Input id="app-detail-desc" defaultValue={app?.description}/></div></div><DialogFooter><DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose><Button onClick={()=>setOpen(false)}>Salvar</Button></DialogFooter></DialogContent></Dialog>;


// --- MAIN ADMIN PAGE COMPONENT ---

export default function AdminPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    // --- State Management ---
    const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [applications, setApplications] = useState<Application[]>(ALL_APPLICATIONS_LIST);
    const [accessLogs, setAccessLogs] = useState<AccessLog[]>(initialAccessLogs);
    
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
    const [orgToManage, setOrgToManage] = useState<Organization | null>(null);
    const [appToManage, setAppToManage] = useState<Application | null>(null);
    const [usageOrgFilter, setUsageOrgFilter] = useState<string>('all');

    // Modal visibility states
    const [isCreateOrgModalOpen, setCreateOrgModalOpen] = useState(false);
    const [isManageAppsModalOpen, setManageAppsModalOpen] = useState(false);
    const [isManageAppDetailsModalOpen, setManageAppDetailsModalOpen] = useState(false);
    
    // --- Memoized Derived State for Usage Tab ---
    const usageData = useMemo(() => {
        const filteredLogs = accessLogs.filter(log => usageOrgFilter === 'all' || log.orgId === usageOrgFilter);
        
        // 1. Data for Chart (Accesses per day)
        const accessesByDate = filteredLogs.reduce((acc, log) => {
            const date = log.accessDate.split('T')[0]; // Get YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // 2. Data for Table (Last access per user)
        const lastAccessPerUser = filteredLogs.reduce((acc, log) => {
            if (!acc[log.userId] || new Date(log.accessDate) > new Date(acc[log.userId].accessDate)) {
                acc[log.userId] = log;
            }
            return acc;
        }, {} as Record<string, AccessLog>);
        
        return {
            chartData: Object.entries(accessesByDate).sort((a,b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()),
            tableData: Object.values(lastAccessPerUser).sort((a,b) => new Date(b.accessDate).getTime() - new Date(a.accessDate).getTime()),
        };
    }, [accessLogs, usageOrgFilter]);

    const appNameMap = useMemo(()=>applications.reduce((acc,app)=>{acc[app.id]=app.name;return acc},{} as Record<string,string>), [applications]);
    useEffect(()=>{(user&&!isLoading&&user.role_id!==1)&&router.push('/hub')}, [user, isLoading, router]);
    const handleOrgRowClick=(orgId:string)=>{setSelectedOrgId(p=>p===orgId?null:orgId)};
    const handleSaveOrgApps=(orgId:string,allowedAppIds:string[])=>{setOrganizations(p=>p.map(o=>o.id===orgId?{...o,allowedAppIds}:o))}; 
    
    const handleCreateOrganization = (name: string) => {
       const newOrg: Organization = {
           id: `ORG${(Math.random() * 900 + 100).toFixed(0)}`,
           name,
           isActive: true,
           inviteCode: `${name.substring(0, 4).toUpperCase()}-${(Math.random() * 9000 + 1000).toFixed(0)}`,
           allowedAppIds: [],
       };
       setOrganizations(prev => [...prev, newOrg]);
    };
    
    const handleManageOrgApps = (org: Organization) => {
       setOrgToManage(org);
       setManageAppsModalOpen(true);
    };
    
    const handleAppStatusChange = (appId: string, isActive: boolean) => {
       setApplications(prev => prev.map(a => a.id === appId ? { ...a, isActive } : a));
    };
    
    const handleSaveAppDetails = (appData: Application) => {
       setApplications(prev => {
           const existing = prev.find(a => a.id === appData.id);
           if (existing) {
               return prev.map(a => a.id === appData.id ? appData : a);
           }
           return [...prev, appData];
       });
    };
    if (isLoading || user?.role_id !== 1) {
        return <div className="text-center p-10">Carregando ou verificando permissões...</div>;
    }

    return (
      <>
        {/* --- Modals Rendered at Top Level --- */}
        <CreateOrganizationModal open={isCreateOrgModalOpen} setOpen={setCreateOrgModalOpen} onSave={(name:string)=>console.log(name)} />
        <ManageOrgApplicationsModal open={isManageAppsModalOpen} setOpen={setManageAppsModalOpen} organization={orgToManage} allApps={applications} onSave={handleSaveOrgApps} />
        <ManageAppDetailsModal open={isManageAppDetailsModalOpen} setOpen={setManageAppDetailsModalOpen} app={appToManage} onSave={(app:Application)=>console.log(app)} />

        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground mb-8">Gerencie a plataforma e seus usuários.</p>

          <Tabs defaultValue="organizations">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="organizations">Organizações</TabsTrigger>
              <TabsTrigger value="applications">Aplicações</TabsTrigger>
              <TabsTrigger value="usage">Uso</TabsTrigger>
            </TabsList>

            {/* --- Organizations Tab (condensed for brevity) --- */}
            <TabsContent value="organizations">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div><CardTitle>Organizações</CardTitle><CardDescription>Liste e gerencie as organizações.</CardDescription></div>
                        <Button onClick={() => setCreateOrgModalOpen(true)}><PlusCircle className="mr-2 h-4 w-4" />Criar</Button>
                    </CardHeader>
                    <CardContent>
                        <Table><TableHeader><TableRow><TableHead>Nome</TableHead><TableHead>Código</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{organizations.map(org => (<React.Fragment key={org.id}><TableRow onClick={() => handleOrgRowClick(org.id)} className="cursor-pointer"><TableCell>{org.name}</TableCell><TableCell><Badge variant="outline">{org.inviteCode}</Badge></TableCell><TableCell onClick={e=>e.stopPropagation()}><Switch checked={org.isActive} /></TableCell></TableRow>{selectedOrgId===org.id&&<TableRow><TableCell colSpan={3} className="p-4 bg-muted/50"><div className="flex justify-between items-center mb-2"><h4 className="font-semibold">Usuários e Aplicações</h4><Button variant="outline" size="sm" onClick={()=>setManageAppsModalOpen(true)}>Gerenciar</Button></div><p className="text-sm">...</p></TableCell></TableRow>}</React.Fragment>))}</TableBody></Table>
                    </CardContent>
                 </Card>
            </TabsContent>

            {/* --- Applications Tab (condensed for brevity) --- */}
            <TabsContent value="applications">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div><CardTitle>Aplicações</CardTitle><CardDescription>Gerencie as aplicações globais.</CardDescription></div>
                        <Button onClick={() => setManageAppDetailsModalOpen(true)}><PlusCircle className="mr-2 h-4 w-4" />Criar</Button>
                    </CardHeader>
                    <CardContent>
                         <Table><TableHeader><TableRow><TableHead>Aplicação</TableHead><TableHead>Descrição</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader><TableBody>{applications.map(app=><TableRow key={app.id}><TableCell>{app.name}</TableCell><TableCell>{app.description}</TableCell><TableCell><Switch checked={app.isActive}/></TableCell><TableCell><Button variant="ghost" size="icon" onClick={()=>setManageAppDetailsModalOpen(true)}><Edit className="h-4 w-4"/></Button></TableCell></TableRow>)}</TableBody></Table>
                    </CardContent>
                </Card>
            </TabsContent>
            
            {/* --- Usage Tab --- */}
            <TabsContent value="usage" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Análise de Uso</h2>
                        <p className="text-muted-foreground">Monitore a atividade da plataforma.</p>
                    </div>
                    <div className="w-full sm:w-auto">
                         <Select value={usageOrgFilter} onValueChange={setUsageOrgFilter}>
                            <SelectTrigger className="w-full sm:w-[250px]">
                                <SelectValue placeholder="Filtrar por organização..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as Organizações</SelectItem>
                                {organizations.map(org => (
                                    <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Chart of Accesses by Date */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5" />Acessos por Dia</CardTitle>
                        <CardDescription>Número total de logins na plataforma por dia.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full p-4 border-dashed border-2 rounded-lg flex items-end justify-around gap-2 bg-muted/50">
                           {usageData.chartData.length > 0 ? usageData.chartData.map(([date, count]) => {
                                const maxHeight = Math.max(...usageData.chartData.map(d => d[1]));
                                const height = (count / maxHeight) * 100;
                                return (
                                    <div key={date} className="flex flex-col items-center justify-end gap-2 h-full flex-1 group">
                                        <div className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">{count}</div>
                                        <div style={{ height: `${height}%` }} className="w-full max-w-[50px] bg-primary rounded-t-md group-hover:bg-primary/80 transition-colors"></div>
                                        <div className="text-xs text-muted-foreground">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { day:'2-digit', month: '2-digit' })}</div>
                                    </div>
                                );
                           }) : <p className="self-center text-muted-foreground">Sem dados de acesso para o período ou filtro selecionado.</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Table of User Accesses */}
                <Card>
                    <CardHeader>
                        <CardTitle>Últimos Acessos por Usuário</CardTitle>
                        <CardDescription>A data e hora do login mais recente de cada usuário.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Usuário</TableHead><TableHead>Organização</TableHead><TableHead>Último Acesso</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {usageData.tableData.map(log => (
                                    <TableRow key={log.logId}>
                                        <TableCell className="font-medium">{log.userName}</TableCell>
                                        <TableCell>{log.orgName}</TableCell>
                                        <TableCell>{new Date(log.accessDate).toLocaleString('pt-BR')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>
        </div>
      </>
    );
}

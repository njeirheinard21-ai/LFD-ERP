import { 
  TrendingUp, Users, CalendarClock, AlertCircle, Wallet, UserCheck, 
  ArrowRight, FileText, Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../lib/utils";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { format } from "date-fns";

// Mock Data
const revenueData = [
  { name: 'Mon', revenue: 1200000, expenses: 800000 },
  { name: 'Tue', revenue: 1350000, expenses: 850000 },
  { name: 'Wed', revenue: 1100000, expenses: 750000 },
  { name: 'Thu', revenue: 1600000, expenses: 900000 },
  { name: 'Fri', revenue: 1842000, expenses: 1000000 },
  { name: 'Sat', revenue: 1950000, expenses: 1100000 },
  { name: 'Sun', revenue: 1400000, expenses: 850000 },
];

const patientFlow = [
  { stage: "Registration", count: 12, status: "active" },
  { stage: "Waiting", count: 24, status: "warning" },
  { stage: "Consultation", count: 8, status: "active" },
  { stage: "Laboratory", count: 15, status: "info" },
  { stage: "Pharmacy", count: 6, status: "active" },
  { stage: "Completed", count: 63, status: "success" },
];

const appointments = [
  { time: "09:00", patient: "Marie T.", provider: "Dr. Kamga", service: "General", status: "Completed" },
  { time: "09:30", patient: "Jean P.", provider: "Dr. Kamga", service: "Follow-up", status: "In Consultation" },
  { time: "10:00", patient: "Alice M.", provider: "Dr. Kamga", service: "Consultation", status: "Waiting" },
  { time: "10:15", patient: "Paul B.", provider: "Nurse Sara", service: "Dressing", status: "Waiting" },
  { time: "11:00", patient: "Sarah K.", provider: "Dr. Ndongo", service: "Specialist", status: "Confirmed" },
];

const criticalStock = [
  { name: "Paracetamol 500mg", sku: "MED-001", current: 45, threshold: 100 },
  { name: "Amoxicillin 250mg", sku: "MED-012", current: 12, threshold: 50 },
  { name: "Surgical Masks", sku: "SUP-104", current: 50, threshold: 200 },
  { name: "Syringes 5ml", sku: "SUP-089", current: 18, threshold: 100 },
];

export function Dashboard() {
  const today = new Date();

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">Good morning, Administrator</h1>
          <p className="text-xs sm:text-sm text-slate mt-1">Here's your operational overview for today.</p>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-[10px] sm:text-xs text-slate font-medium">
            <CalendarClock className="w-3.5 h-3.5 text-marine" />
            <span>{format(today, 'EEEE, MMMM d, yyyy')}</span>
            <span className="mx-2 text-mist">•</span>
            <span className="text-brass">Main Branch</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2">
            <UserCheck className="w-3.5 h-3.5" /> New Patient
          </Button>
          <Button className="flex-1 sm:flex-none gap-2">
            <Wallet className="w-3.5 h-3.5" /> New Sale
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <Card className="shadow-none border-mist/60 bg-gradient-to-br from-surface to-paper">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-medium text-slate uppercase tracking-wider">Revenue</p>
              <div className="p-1 bg-success-light/50 rounded-md">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-bold text-ink">{formatCurrency(1842000)}</h3>
              <p className="text-[10px] font-medium text-success mt-0.5">+12.6% vs yesterday</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-mist/60">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-medium text-slate uppercase tracking-wider">Patients</p>
              <div className="p-1 bg-marine/10 rounded-md">
                <Users className="w-3.5 h-3.5 text-marine" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-bold text-ink">128</h3>
              <p className="text-[10px] font-medium text-success mt-0.5">+8.4% vs yesterday</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-mist/60">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-medium text-slate uppercase tracking-wider">Pending Appts</p>
              <div className="p-1 bg-brass/10 rounded-md">
                <CalendarClock className="w-3.5 h-3.5 text-brass" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-bold text-ink">18</h3>
              <p className="text-[10px] font-medium text-slate mt-0.5">For today</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-mist/60">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-medium text-slate uppercase tracking-wider">Low Stock</p>
              <div className="p-1 bg-danger-light/50 rounded-md">
                <AlertCircle className="w-3.5 h-3.5 text-danger" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-bold text-ink">18</h3>
              <p className="text-[10px] font-medium text-danger mt-0.5">Requires attention</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-mist/60">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-medium text-slate uppercase tracking-wider">Receivables</p>
              <div className="p-1 bg-warning-light/50 rounded-md">
                <FileText className="w-3.5 h-3.5 text-warning" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-bold text-ink">{formatCurrency(428000)}</h3>
              <p className="text-[10px] font-medium text-slate mt-0.5">Outstanding</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-mist/60">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-medium text-slate uppercase tracking-wider">Staff On Duty</p>
              <div className="p-1 bg-info-light/50 rounded-md">
                <Activity className="w-3.5 h-3.5 text-info" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-bold text-ink">42</h3>
              <p className="text-[10px] font-medium text-slate mt-0.5">Checked in</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Left Column - Larger span */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
          {/* Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-base">Business Performance</CardTitle>
                <CardDescription className="text-xs">Revenue vs Expenses over the last 7 days</CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-surface cursor-pointer hover:bg-slate/5 py-0 px-2 text-[10px]">7D</Badge>
                <Badge variant="outline" className="text-slate font-normal cursor-pointer hover:bg-slate/5 py-0 px-2 text-[10px]">30D</Badge>
                <Badge variant="outline" className="text-slate font-normal cursor-pointer hover:bg-slate/5 py-0 px-2 text-[10px]">3M</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-marine)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--color-marine)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-mist)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-slate)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-slate)' }} 
                      tickFormatter={(value) => `${value / 1000}k`} dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-mist)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--color-marine)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="expenses" stroke="var(--color-brass)" strokeWidth={2} fillOpacity={0.1} fill="var(--color-brass)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Patient Flow Pipeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Patient Flow Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2 w-full justify-between items-center">
                {patientFlow.map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                        ${step.status === 'active' ? 'bg-marine/10 text-marine border border-marine/20' : 
                          step.status === 'warning' ? 'bg-warning-light text-warning border border-warning/20' :
                          step.status === 'success' ? 'bg-success-light text-success border border-success/20' :
                          'bg-info-light text-info border border-info/20'
                        }`}
                      >
                        {step.count}
                      </div>
                      <span className="text-[10px] font-medium text-ink text-center w-16">{step.stage}</span>
                    </div>
                    {idx < patientFlow.length - 1 && (
                      <div className="h-[1px] w-6 md:w-8 bg-mist mx-1 md:mx-2 rounded-full self-start mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Today's Schedule */}
          <Card className="flex flex-col h-[280px]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Today's Schedule</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-marine px-2">View All</Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              <div className="space-y-2">
                {appointments.map((appt, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-slate/5 transition-colors border border-transparent hover:border-mist">
                    <div className="flex flex-col items-center justify-center min-w-[40px]">
                      <span className="text-xs font-bold text-ink">{appt.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-ink truncate">{appt.patient}</p>
                      <p className="text-[10px] text-slate truncate">{appt.provider} • {appt.service}</p>
                    </div>
                    <div>
                      <Badge variant={
                        appt.status === 'Completed' ? 'success' :
                        appt.status === 'In Consultation' ? 'info' :
                        appt.status === 'Waiting' ? 'warning' : 'outline'
                      } className="text-[10px] px-1.5 py-0.5">
                        {appt.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Health */}
          <Card className="flex flex-col h-[280px]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Inventory Health</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-marine px-2">Restock</Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              <div className="space-y-2">
                {criticalStock.map((item, i) => {
                  const percent = Math.max(5, Math.round((item.current / item.threshold) * 100));
                  return (
                    <div key={i} className="p-2 rounded-md border border-mist bg-surface">
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-ink truncate">{item.name}</p>
                          <p className="text-[10px] text-slate font-mono mt-0.5">{item.sku}</p>
                        </div>
                        <span className="text-[10px] font-bold text-danger bg-danger-light px-1.5 py-0.5 rounded-full">
                          {item.current} left
                        </span>
                      </div>
                      <div className="w-full bg-slate/10 rounded-full h-1 mt-1.5">
                        <div className="bg-danger h-1 rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Activity, 
  Package, ShoppingCart, 
  Settings, CreditCard, ChevronRight, ChevronLeft, Menu, 
  Bell, Search, MapPin, Building2, User, ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

export function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (v: boolean) => void }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navGroups = [
    {
      label: "OVERVIEW",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, href: "/" },
      ]
    },
    {
      label: "CARE",
      items: [
        { name: "Customers", icon: Users, href: "/customers" },
        { name: "Appointments", icon: Calendar, href: "/appointments" },
        { name: "Clinical", icon: Activity, href: "/clinical" },
      ]
    },
    {
      label: "OPERATIONS",
      items: [
        { name: "Inventory", icon: Package, href: "/inventory" },
      ]
    },
    {
      label: "COMMERCE",
      items: [
        { name: "Point of Sale", icon: ShoppingCart, href: "/pos" },
        { name: "Sales", icon: CreditCard, href: "/sales" },
      ]
    },
    {
      label: "ADMINISTRATION",
      items: [
        { name: "Settings", icon: Settings, href: "/settings" },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <div className={cn(
        "flex flex-col border-r border-mist bg-surface h-full transition-all duration-300 z-40 fixed inset-y-0 left-0 md:relative",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        collapsed ? "md:w-[64px]" : "md:w-[220px]",
        "w-[240px]"
      )}>
        <div className="h-12 flex items-center px-4 border-b border-mist justify-between shrink-0">
          {(!collapsed || mobileMenuOpen) && (
            <div className="flex items-center gap-2.5 text-ink font-bold text-base tracking-tight truncate">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/jo-accessories-44ffa.firebasestorage.app/o/Einort%2FBrown%20and%20Pink%20Illustrative%20Monkey%20Gaming%20Logo%20(1).png?alt=media&token=65556dd5-2734-43a9-b01c-d991ca6260e1"
                alt="LFD Service Logo"
                className="w-7 h-7 rounded-md object-cover shrink-0 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="truncate">LFD Service</span>
            </div>
          )}
          {(collapsed && !mobileMenuOpen) && (
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/jo-accessories-44ffa.firebasestorage.app/o/Einort%2FBrown%20and%20Pink%20Illustrative%20Monkey%20Gaming%20Logo%20(1).png?alt=media&token=65556dd5-2734-43a9-b01c-d991ca6260e1"
              alt="LFD Service Logo"
              className="w-7 h-7 rounded-md object-cover mx-auto shrink-0 shadow-sm"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {navGroups.map((group, i) => (
            <div key={i} className="mb-5 px-3">
              {(!collapsed || mobileMenuOpen) && (
                <h4 className="text-[10px] font-bold text-slate/70 mb-2 px-3 tracking-widest uppercase">
                  {group.label}
                </h4>
              )}
              <div className="space-y-0.5">
                {group.items.map((item, j) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <div key={j} className="relative group/nav">
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-marine rounded-r-full z-10" />
                      )}
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        title={(collapsed && !mobileMenuOpen) ? item.name : undefined}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-all duration-200",
                          isActive 
                            ? "bg-marine/10 text-marine font-semibold" 
                            : "text-slate font-medium hover:bg-slate/10 hover:text-ink"
                        )}
                      >
                        <item.icon className={cn(
                          "w-4 h-4 transition-colors shrink-0", 
                          isActive ? "text-marine" : "text-slate group-hover/nav:text-ink"
                        )} />
                        {(!collapsed || mobileMenuOpen) && <span className="truncate">{item.name}</span>}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t border-mist hidden md:block">
           <button 
             onClick={() => setCollapsed(!collapsed)} 
             className="flex items-center justify-center w-full text-slate hover:text-ink p-2 rounded-md hover:bg-slate/10 transition-colors"
             title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
           >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
           </button>
        </div>
      </div>
    </>
  );
}

export function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (v: boolean) => void }) {
  return (
    <header className="h-12 border-b border-mist bg-surface flex items-center justify-between px-3 md:px-4 z-10 sticky top-0 shrink-0">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 text-slate shrink-0" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-4 h-4" />
        </Button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
          <input 
            type="text" 
            placeholder="Search patients, products, invoices..."
            className="w-full h-8 pl-8 pr-3 rounded-md border border-mist bg-paper text-xs focus:outline-none focus:ring-2 focus:ring-marine/20 focus:border-marine transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-2 text-xs text-ink hidden lg:flex cursor-pointer hover:bg-slate/5 p-1.5 rounded-md border border-transparent hover:border-mist transition-colors">
          <MapPin className="w-3.5 h-3.5 text-slate" />
          <div className="flex flex-col">
            <span className="font-medium leading-none">LFD Service</span>
            <span className="text-[10px] text-slate mt-0.5">Main Branch</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate ml-1" />
        </div>

        <div className="h-5 w-px bg-mist hidden lg:block"></div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative text-slate h-8 w-8">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full border border-surface"></span>
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-2 pl-1.5 pr-2 h-8">
            <div className="w-6 h-6 rounded-full bg-marine text-white flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="flex-col items-start hidden sm:flex">
              <span className="text-xs font-medium leading-none text-ink">Administrator</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-paper">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

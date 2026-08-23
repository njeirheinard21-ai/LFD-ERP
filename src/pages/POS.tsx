import { useState } from "react";
import { 
  Search, ShoppingCart, Plus, Minus, X, CreditCard, 
  Wifi, WifiOff, RefreshCw, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { formatCurrency, cn } from "../lib/utils";

const mockProducts = [
  { id: "P1", name: "Paracetamol 500mg", sku: "MED-001", price: 1500, stock: 45, category: "Pharmacy" },
  { id: "P2", name: "Malaria Rapid Test", sku: "SRV-012", price: 3500, stock: 999, category: "Laboratory" },
  { id: "P3", name: "Amoxicillin 250mg", sku: "MED-012", price: 2500, stock: 12, category: "Pharmacy" },
  { id: "P4", name: "General Consultation", sku: "SRV-001", price: 10000, stock: 999, category: "Clinical" },
];

export function POS() {
  const [cart, setCart] = useState<{product: typeof mockProducts[0], qty: number}[]>([
    { product: mockProducts[3], qty: 1 },
    { product: mockProducts[0], qty: 2 }
  ]);
  const [syncState, setSyncState] = useState<'online' | 'offline' | 'syncing'>('online');
  const [queueCount, setQueueCount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const total = subtotal;

  const simulateOffline = () => {
    setSyncState('offline');
    setTimeout(() => {
      setSyncState('syncing');
      setTimeout(() => {
        setSyncState('online');
        setQueueCount(0);
      }, 2000);
    }, 5000);
  };

  const handleCompleteSale = () => {
    if (syncState === 'offline') {
      setQueueCount(prev => prev + 1);
      setCart([]);
    } else {
      setCart([]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] bg-paper animate-in fade-in duration-500">
      {/* Left: Product Catalog */}
      <div className="flex-1 flex flex-col p-4 space-y-3 overflow-hidden border-r border-mist">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-ink">Point of Sale</h1>
          
          {/* Sync Status Indicator */}
          <div 
            onClick={simulateOffline}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-colors border",
              syncState === 'online' ? "bg-success-light/50 text-success border-success/20 hover:bg-success-light" :
              syncState === 'syncing' ? "bg-warning-light/50 text-warning border-warning/20" :
              "bg-danger-light/50 text-danger border-danger/20"
            )}
          >
            {syncState === 'online' && <><Wifi className="w-3 h-3" /> Online</>}
            {syncState === 'syncing' && <><RefreshCw className="w-3 h-3 animate-spin" /> Syncing ({queueCount})</>}
            {syncState === 'offline' && <><WifiOff className="w-3 h-3" /> Offline - Queue ({queueCount})</>}
          </div>
        </div>

        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate" />
          <input 
            type="text" 
            placeholder="Search products, services, or scan barcode..."
            className="w-full h-9 pl-9 pr-3 rounded-md border border-mist bg-surface text-xs focus:outline-none focus:ring-2 focus:ring-marine/20 focus:border-marine transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-1.5 pb-1 overflow-x-auto scrollbar-hide">
          <Badge variant="default" className="px-3 py-1 cursor-pointer text-xs">All</Badge>
          <Badge variant="outline" className="px-3 py-1 cursor-pointer text-xs bg-surface">Pharmacy</Badge>
          <Badge variant="outline" className="px-3 py-1 cursor-pointer text-xs bg-surface">Laboratory</Badge>
          <Badge variant="outline" className="px-3 py-1 cursor-pointer text-xs bg-surface">Clinical</Badge>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
          {mockProducts.map((p) => (
            <Card key={p.id} className="cursor-pointer hover:border-marine/50 transition-colors group flex flex-col h-full rounded-lg">
              <CardContent className="p-3 flex flex-col h-full justify-between gap-2">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate bg-slate/10 px-1.5 py-0.5 rounded-sm">{p.category}</span>
                    {p.stock < 20 && <span className="text-[9px] font-bold text-danger bg-danger-light px-1.5 py-0.5 rounded-sm">Low</span>}
                  </div>
                  <h3 className="text-sm font-semibold text-ink leading-tight group-hover:text-marine transition-colors">{p.name}</h3>
                  <p className="text-[10px] font-mono text-slate mt-0.5">{p.sku}</p>
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <span className="font-bold text-base text-ink">{formatCurrency(p.price)}</span>
                  <span className="text-[10px] font-medium text-slate">{p.stock > 900 ? '∞' : p.stock} left</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right: Cart & Payment */}
      <div className="w-[320px] flex flex-col bg-surface z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
        <div className="p-3 border-b border-mist flex justify-between items-center bg-slate/5">
          <h2 className="font-bold text-base text-ink flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4 text-marine" /> Current Sale
          </h2>
          <Button variant="ghost" size="sm" className="text-danger hover:text-danger hover:bg-danger-light/50 h-7 text-xs px-2" onClick={() => setCart([])}>
            Clear
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate space-y-2 opacity-60">
              <ShoppingCart className="w-8 h-8" />
              <p className="text-xs">Cart is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 p-2.5 rounded-md border border-mist bg-paper/50">
                <div className="flex justify-between items-start">
                  <div className="min-w-0 pr-2">
                    <p className="font-medium text-xs text-ink truncate">{item.product.name}</p>
                    <p className="text-[10px] text-slate mt-0.5">{formatCurrency(item.product.price)} / unit</p>
                  </div>
                  <button className="text-slate hover:text-danger p-0.5 -mr-0.5"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <div className="flex items-center gap-1.5 bg-surface border border-mist rounded-md p-0.5">
                    <button className="p-0.5 hover:bg-slate/5 rounded-sm"><Minus className="w-3 h-3" /></button>
                    <span className="text-xs font-semibold w-5 text-center">{item.qty}</span>
                    <button className="p-0.5 hover:bg-slate/5 rounded-sm"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="font-bold text-sm text-ink">{formatCurrency(item.product.price * item.qty)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-mist bg-surface space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate">
              <span>Discount</span>
              <span>FCFA 0</span>
            </div>
            <div className="pt-1.5 border-t border-mist/50 flex justify-between items-end">
              <span className="text-sm font-semibold text-ink">Total</span>
              <span className="text-xl font-bold text-marine">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Button variant="outline" className="h-9 border-mist bg-paper text-ink font-semibold gap-1.5 text-xs">
              <CreditCard className="w-3.5 h-3.5 text-slate" /> Card
            </Button>
            <Button variant="outline" className="h-9 border-mist bg-paper text-ink font-semibold gap-1.5 text-xs">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png" alt="MTN" className="w-3.5 h-3.5 object-contain" /> Mobile
            </Button>
            <Button className="h-10 col-span-2 bg-marine hover:bg-marine/90 font-bold text-sm gap-2" onClick={handleCompleteSale} disabled={cart.length === 0}>
              Complete Sale
            </Button>
          </div>
          
          {syncState === 'offline' && (
             <div className="flex items-start gap-1.5 bg-warning-light/50 p-2 rounded-md text-[10px] text-warning leading-tight">
               <AlertTriangle className="w-3 h-3 shrink-0" />
               <p>Offline Mode. Transaction will be queued and synced when connection is restored.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

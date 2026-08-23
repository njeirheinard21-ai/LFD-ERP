import { useState } from "react";
import { Search, Filter, MoreHorizontal, Plus, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const mockCustomers = [
  { id: "CUS-8921", name: "Amadou Diallo", contact: "+237 671 23 45 67", location: "Douala", lastActivity: "2026-08-12", purchases: 12, patientStatus: "Active", status: "Verified" },
  { id: "CUS-8922", name: "Sarah Nguema", contact: "+237 692 34 56 78", location: "Yaoundé", lastActivity: "2026-08-11", purchases: 4, patientStatus: "None", status: "Verified" },
  { id: "CUS-8923", name: "Jean-Paul Kamga", contact: "+237 673 45 67 89", location: "Douala", lastActivity: "2026-08-10", purchases: 28, patientStatus: "Active", status: "Verified" },
  { id: "CUS-8924", name: "Marie Tchuente", contact: "+237 694 56 78 90", location: "Bafoussam", lastActivity: "2026-08-09", purchases: 1, patientStatus: "Active", status: "Pending" },
  { id: "CUS-8925", name: "Paul Biya", contact: "+237 675 67 89 01", location: "Yaoundé", lastActivity: "2026-08-08", purchases: 5, patientStatus: "Discharged", status: "Verified" },
  { id: "CUS-8926", name: "Alice Mvondo", contact: "+237 696 78 90 12", location: "Douala", lastActivity: "2026-08-07", purchases: 0, patientStatus: "None", status: "Pending" },
  { id: "CUS-8927", name: "Celine Ndongo", contact: "+237 677 89 01 23", location: "Garoua", lastActivity: "2026-08-06", purchases: 9, patientStatus: "Active", status: "Verified" },
];

export function CustomersList() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Customers</h1>
          <p className="text-xs text-slate mt-1">Manage customer relationships and patient profiles.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
          <Button className="gap-2">
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate" />
              <input 
                type="text" 
                placeholder="Search by name, ID, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-3 rounded-md border border-mist bg-surface text-xs focus:outline-none focus:ring-2 focus:ring-marine/20 focus:border-marine transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1.5 h-8 text-slate text-xs">
                <Filter className="w-3.5 h-3.5" /> Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate/5 text-slate font-medium border-y border-mist">
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Purchases</th>
                <th className="px-4 py-2">Patient Status</th>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist text-ink">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate/5 transition-colors group">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-ink group-hover:text-marine transition-colors cursor-pointer">{customer.name}</span>
                      <span className="text-[10px] text-slate font-mono mt-0.5">{customer.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-slate">{customer.contact}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-slate">{customer.location}</td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium">{customer.purchases}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Badge variant={
                      customer.patientStatus === 'Active' ? 'info' :
                      customer.patientStatus === 'Discharged' ? 'outline' : 'secondary'
                    } className="text-[10px] px-1.5 py-0.5">
                      {customer.patientStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Badge variant={customer.status === 'Verified' ? 'success' : 'warning'} className="text-[10px] px-1.5 py-0.5">
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-slate hover:text-ink">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-mist flex items-center justify-between text-xs text-slate">
          <span>Showing 1 to 7 of 42 entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs px-2" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

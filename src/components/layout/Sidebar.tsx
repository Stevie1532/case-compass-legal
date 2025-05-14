
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Folder, 
  FileText, 
  Calendar, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Users,
  CheckSquare,
  FilePlus,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Receipt,
  Clock,
  ScrollText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  // State for tracking which collapsible sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    clientReports: false,
    compensationReports: false,
    accountingReports: false,
    vendorReports: false,
    productivityReports: false
  });

  // Toggle function for collapsible sections
  const toggleSection = (section: string) => {
    if (collapsed) return; // Don't toggle if sidebar is collapsed
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[250px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center p-4 border-b border-sidebar-border",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && <h1 className="text-lg font-bold text-sidebar-foreground">LegalERP</h1>}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 pt-2 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {/* Primary Navigation Items */}
          {[
            { name: 'Events Dashboard', icon: LayoutDashboard, path: '/' },
            { name: 'General Dashboard', icon: LayoutDashboard, path: '/general' },
            { name: 'Registrar\'s Dashboard', icon: LayoutDashboard, path: '/registrars' },
            { name: 'Judge\'s Dashboard', icon: LayoutDashboard, path: '/judges' },
            { name: 'Lawyer\'s Dashboard', icon: LayoutDashboard, path: '/lawyers' },
            { name: 'Clerk\'s Dashboard', icon: LayoutDashboard, path: '/clerks' },
            { name: 'Court Detail Dashboard', icon: LayoutDashboard, path: '/court-detail' },
            { name: 'Juvenile Courts Dashboard', icon: LayoutDashboard, path: '/juvenile-courts' },
            { name: 'Cases Analysis', icon: BarChart3, path: '/cases-analysis' },
            { name: 'Court Schedules', icon: Calendar, path: '/court-schedules' },
            { name: 'Case Schedules', icon: Calendar, path: '/case-schedules' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent group transition-all",
                  window.location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="text-sm">{item.name}</span>}
                {collapsed && (
                  <span className="absolute left-full ml-2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}

          {/* Client Reports Section */}
          {!collapsed && (
            <li>
              <Collapsible
                open={openSections.clientReports}
                onOpenChange={() => toggleSection('clientReports')}
              >
                <CollapsibleTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ScrollText size={20} />
                      <span className="text-sm">Client Reports</span>
                    </div>
                    {openSections.clientReports ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1 mt-1">
                  {['AR Aging Summary', 'Statement of Account', 'Sales Tax', 'Client Payments', 'Matter Rate Cards', 'Total Billings'].map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/reports/client/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-1.5 px-2 text-xs rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                    >
                      {subItem}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </li>
          )}

          {/* Compensation Reports Section */}
          {!collapsed && (
            <li>
              <Collapsible
                open={openSections.compensationReports}
                onOpenChange={() => toggleSection('compensationReports')}
              >
                <CollapsibleTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt size={20} />
                      <span className="text-sm">Compensation Reports</span>
                    </div>
                    {openSections.compensationReports ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1 mt-1">
                  {['Referral Reports', 'Originating Attorney', 'Split Compensation', 'Free Allocation', 'Split Payout'].map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/reports/compensation/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-1.5 px-2 text-xs rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                    >
                      {subItem}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </li>
          )}

          {/* Accounting Reports Section */}
          {!collapsed && (
            <li>
              <Collapsible
                open={openSections.accountingReports}
                onOpenChange={() => toggleSection('accountingReports')}
              >
                <CollapsibleTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt size={20} />
                      <span className="text-sm">Accounting Reports</span>
                    </div>
                    {openSections.accountingReports ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1 mt-1">
                  {[
                    'General Ledger', 'Profit & Loss', 'Profit & Loss by Location', 
                    'Balance Sheet', 'Trial Balance', 'Chart of Accounts',
                    'Account Reconciliation', 'Write-Off', 'Firm Budgeting'
                  ].map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/reports/accounting/${subItem.toLowerCase().replace(/[\s&]+/g, '-')}`}
                      className="block py-1.5 px-2 text-xs rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                    >
                      {subItem}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </li>
          )}

          {/* Vendor Reports Section */}
          {!collapsed && (
            <li>
              <Collapsible
                open={openSections.vendorReports}
                onOpenChange={() => toggleSection('vendorReports')}
              >
                <CollapsibleTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Users size={20} />
                      <span className="text-sm">Vendor Reports</span>
                    </div>
                    {openSections.vendorReports ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1 mt-1">
                  {['Account Payable Aging Summary', 'Vendor Payments', 'Vendor Reimbursements', '1099 Reporting'].map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/reports/vendor/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-1.5 px-2 text-xs rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                    >
                      {subItem}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </li>
          )}

          {/* Productivity Reports Section */}
          {!collapsed && (
            <li>
              <Collapsible
                open={openSections.productivityReports}
                onOpenChange={() => toggleSection('productivityReports')}
              >
                <CollapsibleTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={20} />
                      <span className="text-sm">Productivity Reports</span>
                    </div>
                    {openSections.productivityReports ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1 mt-1">
                  {[
                    'Work in Progress', 'Timekeeper Productivity', 'Billable Hours',
                    'Timekeeper Goals', 'Billed & Collected', 'Flat Fee Productivity',
                    'Effective Rates'
                  ].map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/reports/productivity/${subItem.toLowerCase().replace(/[\s&]+/g, '-')}`}
                      className="block py-1.5 px-2 text-xs rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                    >
                      {subItem}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </li>
          )}

          {/* Additional standard navigation items */}
          {[
            { name: 'Case Management', icon: Folder, path: '/cases' },
            { name: 'Task Management', icon: CheckSquare, path: '/tasks' },
            { name: 'Documents', icon: FileText, path: '/documents' },
            { name: 'Memos', icon: FilePlus, path: '/memos' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent group transition-all",
                  window.location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="text-sm">{item.name}</span>}
                {collapsed && (
                  <span className="absolute left-full ml-2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="mt-auto border-t border-sidebar-border p-2">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent group transition-all",
            window.location.pathname === '/settings' && "bg-sidebar-accent text-sidebar-primary-foreground"
          )}
        >
          <Settings size={20} />
          {!collapsed && <span className="text-sm">Settings</span>}
          {collapsed && (
            <span className="absolute left-full ml-2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
              Settings
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;


import React from 'react';
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
  FilePlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
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
      <nav className="flex-1 pt-2">
        <ul className="space-y-1 px-2">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
            { name: 'Case Mgmt', icon: Folder, path: '/cases' },
            { name: 'Task Mgmt', icon: CheckSquare, path: '/tasks' },
            { name: 'Documents', icon: FileText, path: '/documents' },
            { name: 'Memos', icon: FilePlus, path: '/memos' }
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

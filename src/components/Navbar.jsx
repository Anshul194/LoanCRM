import React, { useState } from 'react';
import { Menu, Bell, Plus, User, MoreVertical, Settings, Wallet, BarChart3, Users, FileText, Zap, Activity, LogOut, HelpCircle } from 'lucide-react';
import logo from '../assets/logo-gradient.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', icon: BarChart3, active: true, href: '/' },
    { name: 'Enquiry', icon: FileText, href: '/enquiry' },
    { name: 'Leads', icon: Users, href: '/leads' },
    { name: 'Accounts', icon: User, href: '/accounts' },
    { name: 'Masters', icon: Settings, href: '/masters' },
    { name: 'Automation', icon: Zap, href: '/automation' },
    { name: 'Integrations', icon: Link, href: '/integrations' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
    { name: 'Tasks', icon: FileText, href: '/tasks' },
  ];

  const mobileMenuItems = [
    { name: 'Dashboard', icon: BarChart3, href: '/' },
    { name: 'Enquiry', icon: FileText, href: '/enquiry' },
    { name: 'Leads', icon: Users, href: '/leads' },
    { name: 'Accounts', icon: User, href: '/accounts' },
    { name: 'Masters', icon: Settings, href: '/masters' },
    { name: 'Automation', icon: Zap, href: '/automation' },
    { name: 'Integrations', icon: Wallet, href: '/integrations' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
    { name: 'Tasks', icon: FileText, href: '/tasks' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Wallet', icon: Wallet, href: '/wallet' },
    { name: 'System Status', icon: Activity, href: '/system-status' },
    { name: 'Setup Guide', icon: HelpCircle, href: '/setup-guide' },
    { name: 'Logout', icon: LogOut, href: '/logout' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sticky top-0 lg:flex bg-[#f5f5f5] border-b border-[#181778] px-6 py-2 items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
            {/* <Link><img src={logo} className='max-w-24' alt="" /></Link> */}

            <h1 className='text-lg font-bold'>LOGO</h1>
          
          <div className="flex items-center space-x-6">
            {navigationItems.map((item, index) =>
              item.href ? (
                <Link to={item.href} key={index}>
                  <button
                    className={`text-sm font-normal px-1 py-2 rounded ${
                      item.active 
                        ? 'text-indigo-600 ' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              ) : (
                <button
                  key={index}
                  className={`text-sm font-normal px-1 py-2 rounded ${
                    item.active 
                      ? 'text-indigo-600 ' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {item.name}
                </button>
              )
            )}
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell size={20} />
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-indigo-700">
            UPGRADE
          </button>
          <span className="text-sm text-gray-600">#1</span>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">Anshul Sharma</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet/Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className='flex gap-3 items-center'>
            <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600"
          >
            <Menu size={20} />
          </button>
          
           <Link><img src={logo} className='max-w-24' alt="" /></Link>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400">
              <Bell size={18} />
            </button>
            <button className="bg-indigo-600 text-white p-2 rounded">
              <Plus size={16} />
            </button>
            <button className="p-2 text-gray-600">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/15 bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Anshul Sharma</div>
                    <div className="text-sm text-gray-500">Free Plan</div>
                    <button className="text-xs text-indigo-600 font-medium">UPGRADE</button>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                {mobileMenuItems.map((item, index) =>
                  item.href ? (
                    <Link to={item.href} key={index}>
                      <button
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon size={18} className="text-gray-400" />
                        <span className="text-sm">{item.name}</span>
                      </button>
                    </Link>
                  ) : (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon size={18} className="text-gray-400" />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
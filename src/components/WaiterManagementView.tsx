import React, { useState } from 'react';
import { 
  WaiterStaff, 
  TableServiceCall, 
  TableSection, 
  WaiterRole, 
  WaiterStatus 
} from '../types';
import { 
  Users, 
  UserCheck, 
  BellRing, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Phone, 
  Layers, 
  Award, 
  X, 
  AlertCircle, 
  Sparkles, 
  MessageSquare, 
  Coffee, 
  DollarSign, 
  Droplet, 
  HelpCircle,
  TrendingUp,
  UserPlus
} from 'lucide-react';

// Sample Staff Roster
const INITIAL_WAITER_STAFF: WaiterStaff[] = [
  {
    id: 'w-1',
    name: 'Alex Rivera',
    role: 'Head Waiter',
    phone: '+1 (555) 432-1098',
    status: 'active',
    assigned_section: 'Main Gazebo Floor',
    assigned_tables: ['T-01', 'T-02', 'T-03', 'T-04'],
    active_tables_count: 3,
    completed_orders_today: 14,
    avatar_color: 'bg-amber-600'
  },
  {
    id: 'w-2',
    name: 'Emma Watson',
    role: 'Floor Server',
    phone: '+1 (555) 654-3210',
    status: 'active',
    assigned_section: 'Main Gazebo Floor',
    assigned_tables: ['T-02', 'T-05'],
    active_tables_count: 1,
    completed_orders_today: 9,
    avatar_color: 'bg-emerald-600'
  },
  {
    id: 'w-3',
    name: 'Liam Neeson',
    role: 'Floor Server',
    phone: '+1 (555) 789-0123',
    status: 'active',
    assigned_section: 'Patio Terrace',
    assigned_tables: ['P-01', 'P-02', 'P-03'],
    active_tables_count: 2,
    completed_orders_today: 11,
    avatar_color: 'bg-blue-600'
  },
  {
    id: 'w-4',
    name: 'Chloe Bennett',
    role: 'Barista',
    phone: '+1 (555) 321-9876',
    status: 'active',
    assigned_section: 'Bar Lounge',
    assigned_tables: ['B-01', 'B-02'],
    active_tables_count: 1,
    completed_orders_today: 22,
    avatar_color: 'bg-purple-600'
  },
  {
    id: 'w-5',
    name: 'Marcus Vance',
    role: 'Food Runner',
    phone: '+1 (555) 901-2345',
    status: 'on_break',
    assigned_section: 'Garden Gazebo',
    assigned_tables: ['G-01', 'G-02'],
    active_tables_count: 0,
    completed_orders_today: 8,
    avatar_color: 'bg-red-600'
  }
];

// Sample Live Table Assistance / Call Requests
const INITIAL_SERVICE_CALLS: TableServiceCall[] = [
  {
    id: 'sc-1',
    table_number: 'T-03',
    customer_name: 'Arthur Pendelton',
    request_type: 'Water Refill',
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    status: 'pending',
    assigned_waiter_id: 'w-1'
  },
  {
    id: 'sc-2',
    table_number: 'P-03',
    customer_name: 'Sarah Jenkins',
    request_type: 'Bill Request',
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    status: 'in_progress',
    assigned_waiter_id: 'w-3'
  },
  {
    id: 'sc-3',
    table_number: 'B-02',
    customer_name: 'Walk-in Coffee',
    request_type: 'Order Assistance',
    created_at: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    status: 'pending'
  }
];

export const WaiterManagementView: React.FC = () => {
  const [staffList, setStaffList] = useState<WaiterStaff[]>(INITIAL_WAITER_STAFF);
  const [serviceCalls, setServiceCalls] = useState<TableServiceCall[]>(INITIAL_SERVICE_CALLS);

  // Add Waiter Modal State
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<WaiterRole>('Floor Server');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffSection, setNewStaffSection] = useState<TableSection>('Main Gazebo Floor');

  // New Live Service Request Trigger Simulation
  const [showSimulateCallModal, setShowSimulateCallModal] = useState(false);
  const [simTableNum, setSimTableNum] = useState('T-04');
  const [simReqType, setSimReqType] = useState<'Water Refill' | 'Bill Request' | 'Order Assistance' | 'Clearing Table' | 'Special Request'>('Water Refill');

  // Update Service Call Status
  const handleUpdateCallStatus = (callId: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    setServiceCalls((prev) =>
      prev.map((c) => (c.id === callId ? { ...c, status: newStatus } : c))
    );
  };

  // Add Staff Member
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;

    const colorClasses = ['bg-amber-600', 'bg-emerald-600', 'bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-indigo-600'];
    const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    const newStaff: WaiterStaff = {
      id: `w-${Date.now()}`,
      name: newStaffName.trim(),
      role: newStaffRole,
      phone: newStaffPhone.trim() || '+1 (555) 000-1111',
      status: 'active',
      assigned_section: newStaffSection,
      assigned_tables: [],
      active_tables_count: 0,
      completed_orders_today: 0,
      avatar_color: randomColor
    };

    setStaffList([...staffList, newStaff]);
    setNewStaffName('');
    setNewStaffPhone('');
    setShowAddStaffModal(false);
  };

  // Toggle Staff Shift Status
  const toggleStaffStatus = (staffId: string) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id !== staffId) return s;
        const nextStatus: WaiterStatus =
          s.status === 'active'
            ? 'on_break'
            : s.status === 'on_break'
            ? 'off_shift'
            : 'active';
        return { ...s, status: nextStatus };
      })
    );
  };

  // Simulate Floor Request Call
  const handleSimulateCall = (e: React.FormEvent) => {
    e.preventDefault();

    const newCall: TableServiceCall = {
      id: `sc-${Date.now()}`,
      table_number: simTableNum,
      request_type: simReqType,
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    setServiceCalls([newCall, ...serviceCalls]);
    setShowSimulateCallModal(false);
  };

  // Metrics
  const activeStaffCount = staffList.filter((s) => s.status === 'active').length;
  const pendingCallsCount = serviceCalls.filter((c) => c.status !== 'completed').length;
  const totalCompletedOrders = staffList.reduce((sum, s) => sum + s.completed_orders_today, 0);

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#B22222] flex items-center justify-center text-white shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-title text-base font-bold text-white">
                Waiter & Server Management System
              </h3>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Shift Roster & Floor Calls
              </span>
            </div>
            <p className="text-xs text-[#888888]">
              Manage waiter shifts, section table coverage, and live table service assistance calls
            </p>
          </div>
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSimulateCallModal(true)}
            className="px-3 py-2 bg-[#222222] hover:bg-[#333333] border border-[#3A3A3A] rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <BellRing className="w-4 h-4 text-[#F4C430]" />
            <span>Simulate Floor Request</span>
          </button>

          <button
            onClick={() => setShowAddStaffModal(true)}
            className="px-3 py-2 bg-gradient-btn rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer hover:shadow-lg transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Server</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#888888] block">Active Servers On Floor</span>
            <span className="text-xl font-bold text-white">{activeStaffCount} / {staffList.length}</span>
          </div>
        </div>

        <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#888888] block">Pending Service Calls</span>
            <span className="text-xl font-bold text-[#F4C430]">{pendingCallsCount} Active</span>
          </div>
        </div>

        <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#888888] block">Completed Orders Today</span>
            <span className="text-xl font-bold text-white">{totalCompletedOrders} Orders</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Floor Assistance Requests + Server Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 1/3 COLUMN: LIVE FLOOR ASSISTANCE REQUESTS */}
        <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-[#F4C430] animate-bounce" />
              <h4 className="font-serif-title text-sm font-bold text-white">
                Live Table Service Calls
              </h4>
            </div>
            <span className="px-2 py-0.5 bg-[#D2691E]/20 text-[#F4C430] rounded-full text-[10px] font-bold">
              {pendingCallsCount} Queue
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {serviceCalls.length === 0 ? (
              <div className="p-6 text-center text-[#888] text-xs">
                No active service requests from tables.
              </div>
            ) : (
              serviceCalls.map((call) => (
                <div
                  key={call.id}
                  className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                    call.status === 'pending'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : call.status === 'in_progress'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-[#1A1A1A] border-[#2A2A2A] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#F4C430]">
                      Table {call.table_number}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        call.status === 'pending'
                          ? 'bg-amber-500 text-black'
                          : call.status === 'in_progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-[#333333] text-[#888888]'
                      }`}
                    >
                      {call.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    {call.request_type === 'Water Refill' && <Droplet className="w-3.5 h-3.5 text-blue-400" />}
                    {call.request_type === 'Bill Request' && <DollarSign className="w-3.5 h-3.5 text-emerald-400" />}
                    {call.request_type === 'Order Assistance' && <HelpCircle className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{call.request_type}</span>
                  </div>

                  {call.customer_name && (
                    <div className="text-[11px] text-[#888888]">Guest: {call.customer_name}</div>
                  )}

                  {/* Action status toggles */}
                  <div className="pt-2 border-t border-[#2A2A2A] flex justify-end gap-1">
                    {call.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateCallStatus(call.id, 'in_progress')}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-[10px] font-bold text-white cursor-pointer"
                      >
                        Acknowledge
                      </button>
                    )}
                    {call.status !== 'completed' && (
                      <button
                        onClick={() => handleUpdateCallStatus(call.id, 'completed')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-[10px] font-bold text-white cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT 2/3 COLUMN: WAITER STAFF ROSTER & ASSIGNMENT MATRIX */}
        <div className="lg:col-span-2 bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
            <h4 className="font-serif-title text-sm font-bold text-white">
              Waitstaff Roster & Section Coverage
            </h4>
            <span className="text-xs text-[#888]">Click status badge to toggle shift state</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className="bg-[#181818] rounded-xl border border-[#2A2A2A] p-4 space-y-3 relative hover:border-[#D2691E] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${staff.avatar_color} text-white font-bold flex items-center justify-center shrink-0 text-sm shadow-md`}>
                      {staff.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white">{staff.name}</h5>
                      <span className="text-[11px] text-[#D2691E] font-medium block">{staff.role}</span>
                    </div>
                  </div>

                  {/* Shift Status Badge */}
                  <button
                    onClick={() => toggleStaffStatus(staff.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border focus:outline-none cursor-pointer transition-all ${
                      staff.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : staff.status === 'on_break'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {staff.status === 'active' ? '🟢 Active' : staff.status === 'on_break' ? '☕ On Break' : '🔴 Off Shift'}
                  </button>
                </div>

                {/* Section & Tables Details */}
                <div className="bg-[#121212] p-2.5 rounded-lg border border-[#222222] text-xs space-y-1">
                  <div className="flex justify-between text-[#888888]">
                    <span>Section:</span>
                    <strong className="text-white">{staff.assigned_section}</strong>
                  </div>
                  <div className="flex justify-between text-[#888888]">
                    <span>Assigned Tables:</span>
                    <span className="text-[#F4C430] font-mono font-bold">
                      {staff.assigned_tables.length > 0 ? staff.assigned_tables.join(', ') : 'None'}
                    </span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="flex items-center justify-between text-[11px] text-[#888888] pt-1">
                  <span>Phone: <span className="text-white">{staff.phone}</span></span>
                  <span className="text-emerald-400 font-semibold">{staff.completed_orders_today} Orders Served</span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ADD SERVER MODAL */}
      {/* ------------------------------------------------------------------ */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleAddStaff}
            className="bg-[#1A1A1A] border border-[#3A3A3A] w-full max-w-md rounded-2xl p-6 text-left space-y-4 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setShowAddStaffModal(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
              <UserPlus className="w-5 h-5 text-[#F4C430]" />
              <h4 className="font-serif-title text-base font-bold text-white">
                Add Server to Roster
              </h4>
            </div>

            <div>
              <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Green"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Role</label>
                <select
                  value={newStaffRole}
                  onChange={(e: any) => setNewStaffRole(e.target.value)}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
                >
                  <option value="Floor Server">Floor Server</option>
                  <option value="Head Waiter">Head Waiter</option>
                  <option value="Barista">Barista</option>
                  <option value="Food Runner">Food Runner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Section</label>
                <select
                  value={newStaffSection}
                  onChange={(e: any) => setNewStaffSection(e.target.value)}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
                >
                  <option value="Main Gazebo Floor">Main Gazebo Floor</option>
                  <option value="Patio Terrace">Patio Terrace</option>
                  <option value="Garden Gazebo">Garden Gazebo</option>
                  <option value="Bar Lounge">Bar Lounge</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={newStaffPhone}
                onChange={(e) => setNewStaffPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddStaffModal(false)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] rounded-xl text-xs text-white font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-btn rounded-xl text-xs font-bold text-white cursor-pointer shadow-md"
              >
                Add Staff Member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SIMULATE REQUEST CALL MODAL */}
      {showSimulateCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleSimulateCall}
            className="bg-[#1A1A1A] border border-[#3A3A3A] w-full max-w-md rounded-2xl p-6 text-left space-y-4 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setShowSimulateCallModal(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
              <BellRing className="w-5 h-5 text-[#F4C430]" />
              <h4 className="font-serif-title text-base font-bold text-white">
                Simulate Table Assistance Call
              </h4>
            </div>

            <div>
              <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Select Table Number</label>
              <select
                value={simTableNum}
                onChange={(e) => setSimTableNum(e.target.value)}
                className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
              >
                <option value="T-01">T-01 (Main Floor)</option>
                <option value="T-02">T-02 (Main Floor)</option>
                <option value="T-03">T-03 (Main Floor)</option>
                <option value="T-04">T-04 (Main Floor)</option>
                <option value="P-01">P-01 (Patio)</option>
                <option value="G-01">G-01 (Garden)</option>
                <option value="B-01">B-01 (Bar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Request Type</label>
              <select
                value={simReqType}
                onChange={(e: any) => setSimReqType(e.target.value)}
                className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
              >
                <option value="Water Refill">Droplet Water Refill</option>
                <option value="Bill Request">Dollar Bill Request</option>
                <option value="Order Assistance">Order Assistance</option>
                <option value="Clearing Table">Clearing Table</option>
                <option value="Special Request">Special Request</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSimulateCallModal(false)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] rounded-xl text-xs text-white font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-btn rounded-xl text-xs font-bold text-white cursor-pointer shadow-md"
              >
                Send Assistance Call
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

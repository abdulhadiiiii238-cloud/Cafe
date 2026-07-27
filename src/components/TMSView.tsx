import React, { useState } from 'react';
import { 
  RestaurantTable, 
  TableSection, 
  TableStatus, 
  BookingRecord, 
  WaiterStaff 
} from '../types';
import { 
  Grid, 
  Users, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Utensils, 
  Coffee, 
  Plus, 
  RefreshCw, 
  UserCheck, 
  X, 
  ShieldAlert, 
  ChevronRight, 
  Layers,
  Info
} from 'lucide-react';

// Sample Initial Tables across 4 sections
const INITIAL_TABLES: RestaurantTable[] = [
  // Main Gazebo Floor
  { id: 'tbl-1', table_number: 'T-01', section: 'Main Gazebo Floor', capacity: 2, status: 'available' },
  { id: 'tbl-2', table_number: 'T-02', section: 'Main Gazebo Floor', capacity: 2, status: 'occupied', current_customer_name: 'Sophia Martinez', current_booking_ref: 'GZB-739102', assigned_waiter_name: 'Emma Watson', seated_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), guests_count: 2 },
  { id: 'tbl-3', table_number: 'T-03', section: 'Main Gazebo Floor', capacity: 4, status: 'reserved', current_customer_name: 'Arthur Pendelton', current_booking_ref: 'GZB-849201', assigned_waiter_name: 'Alex Rivera', guests_count: 4 },
  { id: 'tbl-4', table_number: 'T-04', section: 'Main Gazebo Floor', capacity: 6, status: 'occupied', current_customer_name: 'David Chen', current_booking_ref: 'GZB-628491', assigned_waiter_name: 'Alex Rivera', seated_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(), guests_count: 6 },
  
  // Patio Terrace
  { id: 'tbl-5', table_number: 'P-01', section: 'Patio Terrace', capacity: 4, status: 'available' },
  { id: 'tbl-6', table_number: 'P-02', section: 'Patio Terrace', capacity: 2, status: 'cleaning', assigned_waiter_name: 'Liam Neeson' },
  { id: 'tbl-7', table_number: 'P-03', section: 'Patio Terrace', capacity: 4, status: 'occupied', current_customer_name: 'Sarah Jenkins', assigned_waiter_name: 'Liam Neeson', seated_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(), guests_count: 3 },
  
  // Garden Gazebo
  { id: 'tbl-8', table_number: 'G-01', section: 'Garden Gazebo', capacity: 8, status: 'reserved', current_customer_name: 'VIP Private Party', assigned_waiter_name: 'Alex Rivera', guests_count: 8 },
  { id: 'tbl-9', table_number: 'G-02', section: 'Garden Gazebo', capacity: 4, status: 'available' },
  
  // Bar Lounge
  { id: 'tbl-10', table_number: 'B-01', section: 'Bar Lounge', capacity: 2, status: 'available' },
  { id: 'tbl-11', table_number: 'B-02', section: 'Bar Lounge', capacity: 2, status: 'occupied', current_customer_name: 'Walk-in Coffee', assigned_waiter_name: 'Barista Chloe', seated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), guests_count: 1 }
];

interface TMSViewProps {
  bookings?: BookingRecord[];
  waiters?: WaiterStaff[];
}

export const TMSView: React.FC<TMSViewProps> = ({ bookings = [], waiters = [] }) => {
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [activeSection, setActiveSection] = useState<TableSection | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<TableStatus | 'ALL'>('ALL');
  
  // Modal State for Seating / Assigning
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [guestsCountInput, setGuestsCountInput] = useState<number>(2);
  const [waiterSelectInput, setWaiterSelectInput] = useState('');

  const sections: Array<TableSection | 'ALL'> = [
    'ALL',
    'Main Gazebo Floor',
    'Patio Terrace',
    'Garden Gazebo',
    'Bar Lounge'
  ];

  // Table Status Counters
  const totalTables = tables.length;
  const availableCount = tables.filter((t) => t.status === 'available').length;
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;
  const reservedCount = tables.filter((t) => t.status === 'reserved').length;
  const cleaningCount = tables.filter((t) => t.status === 'cleaning').length;

  // Filtered Tables
  const filteredTables = tables.filter((t) => {
    const matchesSection = activeSection === 'ALL' || t.section === activeSection;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSection && matchesStatus;
  });

  // Handle Quick Status Change
  const updateTableStatus = (tableId: string, newStatus: TableStatus) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;

        if (newStatus === 'available' || newStatus === 'cleaning') {
          return {
            ...t,
            status: newStatus,
            current_customer_name: undefined,
            current_booking_ref: undefined,
            seated_at: undefined,
            guests_count: undefined
          };
        }

        if (newStatus === 'occupied' && !t.seated_at) {
          return {
            ...t,
            status: newStatus,
            seated_at: new Date().toISOString()
          };
        }

        return { ...t, status: newStatus };
      })
    );
  };

  // Open Seat Guest Modal
  const openSeatModal = (table: RestaurantTable) => {
    setSelectedTable(table);
    setGuestNameInput(table.current_customer_name || '');
    setGuestsCountInput(table.guests_count || table.capacity);
    setWaiterSelectInput(table.assigned_waiter_name || 'Alex Rivera');
  };

  // Save Seating / Table Assignment
  const handleSaveSeating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) return;

    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== selectedTable.id) return t;
        return {
          ...t,
          status: 'occupied',
          current_customer_name: guestNameInput || 'Walk-in Guest',
          guests_count: guestsCountInput,
          assigned_waiter_name: waiterSelectInput,
          seated_at: t.seated_at || new Date().toISOString()
        };
      })
    );

    setSelectedTable(null);
  };

  // Calculate seated elapsed mins
  const getSeatedDurationMins = (seatedAtISO?: string) => {
    if (!seatedAtISO) return null;
    const diffMs = Date.now() - new Date(seatedAtISO).getTime();
    return Math.floor(diffMs / (1000 * 60));
  };

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* TMS Header */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#F4C430] flex items-center justify-center text-white shrink-0">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-title text-base font-bold text-white">
                Table Management System (TMS)
              </h3>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Live Floor Layout
              </span>
            </div>
            <p className="text-xs text-[#888888]">
              Visual table seating map, floor assignments, and dining duration timers
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-[#1A1A1A] px-3 py-2 rounded-xl border border-[#2A2A2A]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-[#AAA]">Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="text-[#AAA]">Occupied ({occupiedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-[#AAA]">Reserved ({reservedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            <span className="text-[#AAA]">Needs Cleaning ({cleaningCount})</span>
          </div>
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#888] font-semibold mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Floor Section:
          </span>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSection === sec
                  ? 'bg-[#D2691E] text-white shadow-md'
                  : 'bg-[#1E1E1E] text-[#AAAAAA] hover:text-white border border-[#3A3A3A]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-[#121212] px-3 py-1.5 rounded-xl border border-[#2A2A2A] text-xs">
          <span className="text-[#888]">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-[#222]">All Statuses</option>
            <option value="available" className="bg-[#222]">Available Only</option>
            <option value="occupied" className="bg-[#222]">Occupied Only</option>
            <option value="reserved" className="bg-[#222]">Reserved Only</option>
            <option value="cleaning" className="bg-[#222]">Needs Cleaning</option>
          </select>
        </div>
      </div>

      {/* Floor Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTables.map((table) => {
          const seatedMins = getSeatedDurationMins(table.seated_at);

          return (
            <div
              key={table.id}
              className={`bg-[#141414] rounded-2xl border p-4 flex flex-col justify-between space-y-3 transition-all relative overflow-hidden shadow-lg ${
                table.status === 'available'
                  ? 'border-emerald-500/30 hover:border-emerald-500/60'
                  : table.status === 'occupied'
                  ? 'border-red-500/40 bg-[#1A1414]'
                  : table.status === 'reserved'
                  ? 'border-amber-500/40 bg-[#1A1814]'
                  : 'border-blue-500/40'
              }`}
            >
              {/* Status Indicator Bar */}
              <div className="flex items-center justify-between border-b border-[#222222] pb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      table.status === 'available'
                        ? 'bg-emerald-400'
                        : table.status === 'occupied'
                        ? 'bg-red-400 animate-pulse'
                        : table.status === 'reserved'
                        ? 'bg-amber-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  <h4 className="font-mono font-bold text-base text-white">
                    {table.table_number}
                  </h4>
                  <span className="text-[10px] text-[#888888]">
                    ({table.capacity} seats)
                  </span>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    table.status === 'available'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : table.status === 'occupied'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : table.status === 'reserved'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {table.status}
                </span>
              </div>

              {/* Section Details */}
              <div className="text-[11px] text-[#888888] space-y-1">
                <div className="flex items-center justify-between">
                  <span>Section:</span>
                  <span className="text-white font-medium">{table.section}</span>
                </div>

                {table.assigned_waiter_name && (
                  <div className="flex items-center justify-between">
                    <span>Server:</span>
                    <span className="text-[#D2691E] font-semibold">{table.assigned_waiter_name}</span>
                  </div>
                )}

                {/* Seated / Reserved Customer Details */}
                {table.current_customer_name ? (
                  <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E] space-y-1 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xs">{table.current_customer_name}</span>
                      {table.guests_count && (
                        <span className="text-[10px] text-[#F4C430] font-semibold">
                          {table.guests_count} Guests
                        </span>
                      )}
                    </div>
                    {table.current_booking_ref && (
                      <div className="text-[10px] font-mono text-[#888888]">
                        Ref: {table.current_booking_ref}
                      </div>
                    )}
                    {seatedMins !== null && (
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-mono font-semibold pt-1">
                        <Clock className="w-3 h-3" />
                        <span>Seated for {seatedMins} mins</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-2 text-[11px] text-[#666666] italic">
                    Table ready for seating
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#222222] flex items-center justify-between gap-1 text-xs">
                {table.status === 'available' && (
                  <button
                    onClick={() => openSeatModal(table)}
                    className="w-full py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Seat Party</span>
                  </button>
                )}

                {table.status === 'occupied' && (
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => updateTableStatus(table.id, 'cleaning')}
                      className="flex-1 py-1.5 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 rounded-xl font-bold transition-all cursor-pointer text-[11px]"
                    >
                      Clear Table
                    </button>
                    <button
                      onClick={() => openSeatModal(table)}
                      className="px-2 py-1.5 bg-[#222] hover:bg-[#333] border border-[#333] text-[#AAA] hover:text-white rounded-xl text-[11px] cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                )}

                {table.status === 'reserved' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'occupied')}
                    className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-white border border-amber-500/30 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Seated</span>
                  </button>
                )}

                {table.status === 'cleaning' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'available')}
                    className="w-full py-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Clean & Ready</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SEATING MODAL */}
      {/* ------------------------------------------------------------------ */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleSaveSeating}
            className="bg-[#1A1A1A] border border-[#3A3A3A] w-full max-w-md rounded-2xl p-6 text-left space-y-4 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setSelectedTable(null)}
              className="absolute top-4 right-4 text-[#888888] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
              <Utensils className="w-5 h-5 text-[#F4C430]" />
              <h4 className="font-serif-title text-base font-bold text-white">
                Seat Guests at Table {selectedTable.table_number} ({selectedTable.section})
              </h4>
            </div>

            <div>
              <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Guest / Reservation Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Arthur Pendelton"
                value={guestNameInput}
                onChange={(e) => setGuestNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Number of Guests</label>
                <input
                  type="number"
                  min={1}
                  max={selectedTable.capacity + 2}
                  value={guestsCountInput}
                  onChange={(e) => setGuestsCountInput(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#AAAAAA] mb-1 font-medium">Assign Server</label>
                <select
                  value={waiterSelectInput}
                  onChange={(e) => setWaiterSelectInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#3A3A3A] rounded-xl text-xs text-white focus:outline-none focus:border-[#D2691E]"
                >
                  <option value="Alex Rivera">Alex Rivera (Main Floor)</option>
                  <option value="Emma Watson">Emma Watson (Main Floor)</option>
                  <option value="Liam Neeson">Liam Neeson (Patio)</option>
                  <option value="Barista Chloe">Barista Chloe (Bar Lounge)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedTable(null)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] rounded-xl text-xs text-white font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-btn rounded-xl text-xs font-bold text-white cursor-pointer shadow-md"
              >
                Confirm Seating
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

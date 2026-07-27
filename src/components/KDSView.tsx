import React, { useState, useEffect } from 'react';
import { 
  KitchenTicket, 
  KitchenStation, 
  KitchenTicketStatus, 
  TicketItemStatus 
} from '../types';
import { 
  UtensilsCrossed, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Coffee, 
  Cake, 
  Filter, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  CheckSquare, 
  Square,
  Sparkles,
  Zap,
  Timer
} from 'lucide-react';

// Initial sample kitchen tickets
const INITIAL_KITCHEN_TICKETS: KitchenTicket[] = [
  {
    id: 'kt-1',
    ticket_number: 'TK-101',
    booking_ref: 'GZB-849201',
    table_number: 'T-04',
    order_type: 'Dine-in',
    customer_name: 'Arthur Pendelton',
    waiter_name: 'Alex Rivera',
    priority: 'high',
    status: 'preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    items: [
      { id: 'i1', name: 'Signature Gazebo Cold Brew', quantity: 2, station: 'Coffee & Beverage Bar', status: 'ready', notes: 'Extra ice in one' },
      { id: 'i2', name: 'Garden Gazebo Salad', quantity: 1, station: 'Cold Pantry', status: 'preparing', notes: 'Dressing on the side' },
      { id: 'i3', name: 'Truffle Mushroom Risotto', quantity: 2, station: 'Hot Kitchen', status: 'preparing', notes: 'Parmesan on top' }
    ]
  },
  {
    id: 'kt-2',
    ticket_number: 'TK-102',
    booking_ref: 'GZB-739102',
    table_number: 'T-02',
    order_type: 'Dine-in',
    customer_name: 'Sophia Martinez',
    waiter_name: 'Emma Watson',
    priority: 'normal',
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(), // 4 mins ago
    items: [
      { id: 'i4', name: 'Avocado Toast Royale', quantity: 2, station: 'Hot Kitchen', status: 'pending', notes: 'Poached eggs medium' },
      { id: 'i5', name: 'Caramel Macchiato', quantity: 2, station: 'Coffee & Beverage Bar', status: 'preparing', notes: 'Oat milk' }
    ]
  },
  {
    id: 'kt-3',
    ticket_number: 'TK-103',
    table_number: 'T-09 (Patio)',
    order_type: 'Dine-in',
    customer_name: 'David Chen',
    waiter_name: 'Liam Neeson',
    priority: 'vip',
    status: 'preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    items: [
      { id: 'i6', name: 'Artisanal Croissant Platter', quantity: 1, station: 'Bakery & Pastry', status: 'ready' },
      { id: 'i7', name: 'Espresso Double Shot', quantity: 3, station: 'Coffee & Beverage Bar', status: 'ready' },
      { id: 'i8', name: 'Red Velvet Lava Cake', quantity: 2, station: 'Bakery & Pastry', status: 'preparing' }
    ]
  },
  {
    id: 'kt-4',
    ticket_number: 'TK-104',
    table_number: 'Takeaway #12',
    order_type: 'Takeaway',
    customer_name: 'Sarah Jenkins',
    priority: 'normal',
    status: 'ready',
    created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    items: [
      { id: 'i9', name: 'Iced Vanilla Latte', quantity: 1, station: 'Coffee & Beverage Bar', status: 'ready' },
      { id: 'i10', name: 'Blueberry Muffin', quantity: 2, station: 'Bakery & Pastry', status: 'ready' }
    ]
  }
];

export const KDSView: React.FC = () => {
  const [tickets, setTickets] = useState<KitchenTicket[]>(INITIAL_KITCHEN_TICKETS);
  const [selectedStation, setSelectedStation] = useState<KitchenStation | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'COMPLETED' | 'ALL'>('ACTIVE');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Update timer ticks every 5 seconds for elapsed preparation times
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute elapsed minutes
  const getElapsedMins = (createdAtISO: string) => {
    const created = new Date(createdAtISO).getTime();
    const diffMs = now - created;
    return Math.floor(diffMs / (1000 * 60));
  };

  // Toggle Item Readiness status within a ticket
  const toggleItemStatus = (ticketId: string, itemId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;

        const updatedItems = t.items.map((item) => {
          if (item.id !== itemId) return item;
          const nextStatus: TicketItemStatus =
            item.status === 'pending'
              ? 'preparing'
              : item.status === 'preparing'
              ? 'ready'
              : 'pending';
          return { ...item, status: nextStatus };
        });

        // Determine if all items are ready
        const allReady = updatedItems.every((i) => i.status === 'ready');
        const anyPreparing = updatedItems.some((i) => i.status === 'preparing' || i.status === 'ready');

        const overallStatus: KitchenTicketStatus = allReady
          ? 'ready'
          : anyPreparing
          ? 'preparing'
          : 'new';

        return { ...t, items: updatedItems, status: overallStatus };
      })
    );
  };

  // Bump overall ticket status
  const advanceTicketStatus = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;

        let nextStatus: KitchenTicketStatus = 'new';
        if (t.status === 'new') nextStatus = 'preparing';
        else if (t.status === 'preparing') nextStatus = 'ready';
        else if (t.status === 'ready') nextStatus = 'served';

        // Update items to match
        const updatedItems = t.items.map((item) => ({
          ...item,
          status: nextStatus === 'ready' || nextStatus === 'served' ? ('ready' as TicketItemStatus) : ('preparing' as TicketItemStatus)
        }));

        return { ...t, status: nextStatus, items: updatedItems };
      })
    );
  };

  // Add sample new incoming kitchen ticket
  const handleSimulateNewOrder = () => {
    const randomTable = `T-0${Math.floor(Math.random() * 8) + 1}`;
    const newTkNum = `TK-${105 + tickets.length}`;

    const newTicket: KitchenTicket = {
      id: `kt-${Date.now()}`,
      ticket_number: newTkNum,
      table_number: randomTable,
      order_type: 'Dine-in',
      customer_name: 'Walk-in Guest',
      waiter_name: 'Alex Rivera',
      priority: Math.random() > 0.7 ? 'high' : 'normal',
      status: 'new',
      created_at: new Date().toISOString(),
      items: [
        { id: `ni-${Date.now()}-1`, name: 'Signature Gazebo Cold Brew', quantity: 1, station: 'Coffee & Beverage Bar', status: 'pending' },
        { id: `ni-${Date.now()}-2`, name: 'Avocado Toast Royale', quantity: 1, station: 'Hot Kitchen', status: 'pending', notes: 'Extra crispy' }
      ]
    };

    setTickets([newTicket, ...tickets]);
  };

  // Station Filter Options
  const stations: Array<KitchenStation | 'ALL'> = [
    'ALL',
    'Coffee & Beverage Bar',
    'Hot Kitchen',
    'Bakery & Pastry',
    'Cold Pantry'
  ];

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesStation =
      selectedStation === 'ALL' ||
      t.items.some((i) => i.station === selectedStation);

    if (statusFilter === 'ACTIVE') {
      return matchesStation && (t.status === 'new' || t.status === 'preparing' || t.status === 'ready');
    }
    if (statusFilter === 'COMPLETED') {
      return matchesStation && t.status === 'served';
    }
    return matchesStation;
  });

  // Ticket counts
  const activeCount = tickets.filter((t) => t.status !== 'served').length;
  const preparingCount = tickets.filter((t) => t.status === 'preparing').length;
  const readyCount = tickets.filter((t) => t.status === 'ready').length;

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* KDS Header Banner */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-[#2A2A2A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#B22222] flex items-center justify-center text-white shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-title text-base font-bold text-white">
                Kitchen Display System (KDS)
              </h3>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Line Feed
              </span>
            </div>
            <p className="text-xs text-[#888888]">
              Real-time ticket bump station for chefs, baristas, and kitchen staff
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-[#222222] border border-[#3A3A3A] text-xs text-[#AAAAAA] hover:text-white flex items-center gap-1.5 cursor-pointer"
            title={soundEnabled ? 'Disable Chime' : 'Enable Chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F4C430]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSimulateNewOrder}
            className="px-3 py-2 bg-gradient-btn rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Simulate New Order</span>
          </button>
        </div>
      </div>

      {/* Metric Counters & Station Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#121212] p-3.5 rounded-xl border border-[#2A2A2A] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#888] block">Active Tickets</span>
            <span className="text-xl font-bold text-white">{activeCount}</span>
          </div>
          <Zap className="w-5 h-5 text-[#F4C430]" />
        </div>

        <div className="bg-[#121212] p-3.5 rounded-xl border border-[#2A2A2A] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#888] block">In Preparation</span>
            <span className="text-xl font-bold text-amber-400">{preparingCount}</span>
          </div>
          <Flame className="w-5 h-5 text-amber-400" />
        </div>

        <div className="bg-[#121212] p-3.5 rounded-xl border border-[#2A2A2A] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#888] block">Ready to Serve</span>
            <span className="text-xl font-bold text-emerald-400">{readyCount}</span>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="bg-[#121212] p-3.5 rounded-xl border border-[#2A2A2A] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#888] block">Station View</span>
            <span className="text-xs font-semibold text-[#D2691E] truncate max-w-[120px]">
              {selectedStation}
            </span>
          </div>
          <Coffee className="w-5 h-5 text-[#D2691E]" />
        </div>
      </div>

      {/* Station Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#2A2A2A] pb-3">
        <span className="text-xs text-[#888888] font-semibold mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Station:
        </span>
        {stations.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStation(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedStation === s
                ? 'bg-[#D2691E] text-white shadow-md'
                : 'bg-[#1E1E1E] text-[#AAAAAA] hover:text-white border border-[#3A3A3A]'
            }`}
          >
            {s}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1 bg-[#121212] p-1 rounded-xl border border-[#2A2A2A]">
          <button
            onClick={() => setStatusFilter('ACTIVE')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
              statusFilter === 'ACTIVE' ? 'bg-[#333333] text-[#F4C430]' : 'text-[#888888]'
            }`}
          >
            Active Tickets
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
              statusFilter === 'COMPLETED' ? 'bg-[#333333] text-emerald-400' : 'text-[#888888]'
            }`}
          >
            Served / Bumped
          </button>
        </div>
      </div>

      {/* Live Ticket Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTickets.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-[#121212] rounded-2xl border border-[#2A2A2A] p-6 text-[#888888]">
            <UtensilsCrossed className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#F4C430]" />
            <p className="text-sm font-semibold">No tickets found for station: {selectedStation}</p>
            <p className="text-xs text-[#666666] mt-1">All kitchen orders served or waiting for new tickets.</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const elapsedMins = getElapsedMins(ticket.created_at);
            const isLate = elapsedMins >= 15;
            const isUrgent = elapsedMins >= 10 && elapsedMins < 15;

            return (
              <div
                key={ticket.id}
                className={`bg-[#141414] rounded-2xl border flex flex-col justify-between overflow-hidden shadow-xl transition-all ${
                  ticket.priority === 'vip'
                    ? 'border-[#F4C430] ring-1 ring-[#F4C430]/30'
                    : isLate
                    ? 'border-red-500 ring-1 ring-red-500/30'
                    : ticket.status === 'ready'
                    ? 'border-emerald-500/50'
                    : 'border-[#2A2A2A]'
                }`}
              >
                {/* Ticket Top Bar */}
                <div
                  className={`p-3.5 border-b flex items-center justify-between text-xs ${
                    ticket.status === 'ready'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : isLate
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-[#1A1A1A] border-[#2A2A2A]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#F4C430]">
                      {ticket.ticket_number}
                    </span>
                    <span className="px-2 py-0.5 bg-[#2A2A2A] text-white rounded font-bold text-[10px]">
                      {ticket.table_number}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {ticket.priority === 'vip' && (
                      <span className="px-1.5 py-0.5 bg-[#F4C430]/20 text-[#F4C430] border border-[#F4C430]/40 rounded text-[9px] font-bold uppercase">
                        VIP
                      </span>
                    )}

                    {/* Timer Badge */}
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        isLate
                          ? 'bg-red-500 text-white animate-pulse'
                          : isUrgent
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-[#222222] text-[#888888]'
                      }`}
                    >
                      <Timer className="w-3 h-3" />
                      <span>{elapsedMins}m ago</span>
                    </div>
                  </div>
                </div>

                {/* Customer & Waiter Metadata */}
                <div className="p-3 bg-[#111111] border-b border-[#222222] text-[11px] text-[#888888] flex justify-between items-center">
                  <span>Guest: <strong className="text-white">{ticket.customer_name}</strong></span>
                  {ticket.waiter_name && <span>Server: <strong className="text-[#D2691E]">{ticket.waiter_name}</strong></span>}
                </div>

                {/* Items List */}
                <div className="p-3.5 space-y-2.5 flex-1 max-h-60 overflow-y-auto">
                  {ticket.items
                    .filter((item) => selectedStation === 'ALL' || item.station === selectedStation)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleItemStatus(ticket.id, item.id)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                          item.status === 'ready'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 line-through opacity-80'
                            : item.status === 'preparing'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                            : 'bg-[#1E1E1E] border-[#2A2A2A] text-white hover:border-[#D2691E]'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {item.status === 'ready' ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-[#666666]" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between font-bold">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="text-[9px] uppercase font-mono tracking-wider text-[#888]">
                              {item.station.split(' ')[0]}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-[10px] text-[#F4C430] italic mt-0.5">
                              Note: {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Ticket Action Bump Footer */}
                <div className="p-3 bg-[#1A1A1A] border-t border-[#2A2A2A] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#888888] font-bold uppercase">
                    Status: <strong className={ticket.status === 'ready' ? 'text-emerald-400' : 'text-amber-400'}>{ticket.status}</strong>
                  </span>

                  <button
                    onClick={() => advanceTicketStatus(ticket.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1 shadow-sm ${
                      ticket.status === 'new'
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : ticket.status === 'preparing'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : ticket.status === 'ready'
                        ? 'bg-[#333333] hover:bg-[#444444] text-[#888888]'
                        : 'bg-[#222222] text-[#555555] cursor-default'
                    }`}
                  >
                    <span>
                      {ticket.status === 'new'
                        ? 'Start Cooking'
                        : ticket.status === 'preparing'
                        ? 'Mark Ready'
                        : ticket.status === 'ready'
                        ? 'Bump Order'
                        : 'Completed'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

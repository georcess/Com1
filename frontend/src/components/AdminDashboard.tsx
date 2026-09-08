import React, { useEffect, useState } from 'react';
import { Shield, RefreshCw, Trash2, Check, TrendingUp, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Order, User } from '../types';

interface AdminDashboardProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onOpenAuth,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [salesSummary, setSalesSummary] = useState<{ today: number; month: number; year: number } | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/fetch_orders.php');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);

        // Compute client summary
        const todayTotal = data
          .reduce((sum, o) => sum + Number(o.total_price || 0), 0);
        setSalesSummary({
          today: todayTotal,
          month: todayTotal,
          year: todayTotal,
        });
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      fetchOrders();
    }
  }, [currentUser]);

  const handleToggleStatus = async (order: Order) => {
    const nextStatus = order.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch('/api/update_order_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setOrders((prev) =>
          prev.map((o) => (o.id === order.id ? { ...o, status: nextStatus } : o))
        );
      } else {
        alert(data.message || 'Failed to update order status.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  const handleDeleteOrder = async (id: number) => {
    try {
      const res = await fetch('/api/delete_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setOrders(orders.filter(o => o.id !== id));
      } else {
        alert(data.message || 'Failed to delete order.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear ALL order records?')) return;

    try {
      const res = await fetch('/api/clear_orders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.status === 'success') {
        setOrders([]);
        alert('All order records cleared.');
      }
    } catch (err) {
      alert('Error clearing orders.');
    }
  };

  // If not logged in as Admin, show restricted gate
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center">
        <Card className="rounded-3xl border border-brand-brown/10 shadow-xl bg-white p-8 space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-brand-brown">
            <Lock className="h-10 w-10 text-brand-coffee" />
          </div>
          <div className="space-y-2">
            <CardTitle className="font-display text-2xl font-bold text-brand-brown">
              Admin Access Restricted
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You must be logged in with an <strong>Administrator</strong> account to view live store orders, mark items completed, and view revenue analytics.
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200">
            💡 Default Admin: <strong>admin</strong> / <strong>admin123</strong>
          </div>
          <Button
            variant="brand"
            size="lg"
            onClick={() => onOpenAuth('login')}
            className="w-full gap-2 font-bold"
          >
            <Shield className="h-4 w-4" />
            Login as Admin
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand-brown">
              Admin Dashboard
            </h2>
            <Badge variant="brand" className="uppercase">Live</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time customer orders &amp; shop management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchOrders}
            disabled={isLoading}
            className="gap-1.5"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          {orders.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearAll}
              className="gap-1.5"
            >
              <Trash2 className="h-4 w-4" />
              Clear All Records
            </Button>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      {salesSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="rounded-2xl border-brand-brown/10 bg-white p-4 shadow-sm">
            <div className="text-xs text-muted-foreground font-semibold uppercase">Total Orders</div>
            <div className="font-display text-2xl font-bold text-brand-brown mt-1">
              {orders.length} orders
            </div>
          </Card>

          <Card className="rounded-2xl border-brand-brown/10 bg-white p-4 shadow-sm">
            <div className="text-xs text-muted-foreground font-semibold uppercase">Total Revenue</div>
            <div className="font-display text-2xl font-bold text-brand-orange mt-1">
              ₱{salesSummary.today.toFixed(2)}
            </div>
          </Card>

          <Card className="rounded-2xl border-brand-brown/10 bg-white p-4 shadow-sm">
            <div className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              Store Status
            </div>
            <div className="text-sm font-bold text-green-600 mt-1 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              Online &amp; Accepting Orders
            </div>
          </Card>
        </div>
      )}

      {/* Orders Table */}
      <Card className="rounded-2xl border-brand-brown/10 bg-white shadow-md overflow-hidden">
        <CardHeader className="bg-brand-coffee text-white p-4">
          <CardTitle className="text-base font-bold flex items-center justify-between">
            <span>Incoming Customer Orders ({orders.length})</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground space-y-2">
              <p className="text-sm font-medium">No customer orders yet.</p>
              <p className="text-xs">Placed orders will appear here automatically.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[160px]">Date / Time</TableHead>
                  <TableHead className="w-[200px]">Customer Account</TableHead>
                  <TableHead>Order Details</TableHead>
                  <TableHead className="w-[110px]">Total Price</TableHead>
                  <TableHead className="w-[100px] text-center">Status</TableHead>
                  <TableHead className="w-[130px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const isCompleted = order.status === 'completed';
                  return (
                    <TableRow key={order.id} className="hover:bg-slate-50/80">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {order.order_date}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-brand-brown text-sm">
                            {order.customer_name}
                          </div>
                          {order.customer_username && (
                            <div className="inline-flex items-center gap-1 rounded bg-brand-cream px-1.5 py-0.2 text-[10px] font-bold text-brand-coffee">
                              @{order.customer_username}
                            </div>
                          )}
                          {order.customer_email && (
                            <div className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                              {order.customer_email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        {order.order_details}
                      </TableCell>
                      <TableCell className="font-bold text-brand-orange">
                        ₱{Number(order.total_price).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={isCompleted ? 'default' : 'outline'}
                          className={`text-[10px] uppercase font-bold cursor-pointer ${
                            isCompleted
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'text-amber-600 border-amber-300 bg-amber-50 hover:bg-amber-100'
                          }`}
                          onClick={() => handleToggleStatus(order)}
                          title="Click to toggle status"
                        >
                          {order.status || 'pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant={isCompleted ? 'outline' : 'default'}
                            size="sm"
                            onClick={() => handleToggleStatus(order)}
                            className={`h-7 gap-1 text-xs px-2 ${
                              isCompleted
                                ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                                : 'bg-green-700 hover:bg-green-800 text-white'
                            }`}
                            title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                          >
                            <Check className="h-3 w-3" />
                            <span>{isCompleted ? 'Undo' : 'Done'}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteOrder(order.id)}
                            className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-700"
                            title="Delete order record"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

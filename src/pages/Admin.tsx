import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, LogOut, Users, CreditCard, UserCheck, UserCog, Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";

type Player = {
  id: string;
  created_at: string;
  full_name: string;
  name_with_initials: string;
  fide_id: string | null;
  date_of_birth: string;
  gender: string;
  contact_number: string;
  age_category: string;
  payment_status: 'unpaid' | 'paid_to_thuva' | 'paid_to_thushanth';
  reference_number: string;
};

type SortDirection = 'asc' | 'desc';
type SortableField = keyof Omit<Player, 'id'>;

const ITEMS_PER_PAGE = 12;

const Admin = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortableField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
  };

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredAndSortedPlayers.map(player => ({
      'Full Name': player.full_name,
      'Name with Initials': player.name_with_initials,
      'FIDE ID': player.fide_id || '',
      'Date of Birth': player.date_of_birth,
      'Gender': player.gender,
      'Contact Number': player.contact_number,
      'Age Category': player.age_category,
      'Payment Status': player.payment_status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      'Reference Number': player.reference_number,
      'Registration Date': new Date(player.created_at).toLocaleString()
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Player Registrations');

    // Generate Excel file
    const fileName = `chess_registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName, { compression: true });
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlayers();
    }
  }, [isAuthenticated]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setCurrentPage(1); // Reset to first page when refreshing data
      console.log('Fetching registrations from Supabase...');
      
      // Try to fetch data from registrations table with error handling
      let data: Player[] = [];
      let error = null;
      
      try {
        const { data: resultData, error: resultError } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });
        
        data = resultData || [];
        error = resultError;
      } catch (queryError) {
        console.error('Query error details:', queryError);
        error = queryError;
      }
      
      console.log('Supabase query result:', { data, error });

      if (error) {
        console.error('Supabase error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        if (error.code === '42P01') { // Table doesn't exist
          toast({
            title: "Database Error",
            description: "Registrations table not found. Please ensure the Supabase table is set up correctly.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
      
      console.log('Raw data from Supabase:', data);
      
      // Map the data to include default payment_status if not present
      const formattedData = (data || []).map(reg => {
        console.log('Processing registration:', reg);
        return {
          ...reg,
          payment_status: (reg.payment_status || 'unpaid') as 'unpaid' | 'paid_to_thuva' | 'paid_to_thushanth'
        };
      });
      
      console.log('Formatted data:', formattedData);
      setPlayers(formattedData);
    } catch (error: any) {
      console.error('Error in fetchPlayers:', {
        error,
        name: error?.name,
        message: error?.message,
        stack: error?.stack
      });
      
      toast({
        title: "Error",
        description: error?.message || "Failed to load registrations. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (playerId: string, status: Player['payment_status']) => {
    try {
      setUpdatingId(playerId);
      const { error } = await supabase
        .from('registrations')
        .update({ payment_status: status })
        .eq('id', playerId);

      if (error) throw error;

      setPlayers(players.map(player => 
        player.id === playerId ? { ...player, payment_status: status } : player
      ));

      toast({
        title: "Success",
        description: "Payment status updated successfully",
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-chess-yellow text-chess-black hover:bg-chess-yellow-bright">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalRegistered = players.length;
  const totalPaid = players.filter(p => p.payment_status !== 'unpaid').length;
  const paidToThuva = players.filter(p => p.payment_status === 'paid_to_thuva').length;
  const paidToThushanth = players.filter(p => p.payment_status === 'paid_to_thushanth').length;
  
  // Filter and sort players
  const filteredAndSortedPlayers = [...players]
    .filter(player => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const fieldValue = String(player[key as keyof Player] || '').toLowerCase();
        return fieldValue.includes(value.toLowerCase());
      });
    })
    .sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      // Handle null/undefined values
      if (valueA === null || valueA === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (valueB === null || valueB === undefined) return sortDirection === 'asc' ? 1 : -1;

      // Convert to string for comparison if not already
      if (typeof valueA !== 'string') valueA = String(valueA);
      if (typeof valueB !== 'string') valueB = String(valueB);

      // Compare values
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Get unique values for filter dropdowns
  const getUniqueValues = (field: keyof Player) => {
    const values = new Set<string>();
    players.forEach(player => {
      const value = player[field];
      if (value !== null && value !== undefined && value !== '') {
        values.add(String(value));
      }
    });
    return Array.from(values).sort();
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedPlayers.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredAndSortedPlayers.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (field: SortableField) => {
    if (sortField === field) {
      // Toggle sort direction if same field is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when changing sort
  };

  const SortIcon = ({ field }: { field: SortableField }) => {
    if (sortField !== field) return <span className="ml-1">↕️</span>;
    return sortDirection === 'asc' ? 
      <span className="ml-1">⬆️</span> : 
      <span className="ml-1">⬇️</span>;
  };
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Player Registrations</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-green-50 text-green-700 hover:bg-green-100"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Registered</p>
                <p className="text-2xl font-bold">{totalRegistered}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold">{totalPaid}</p>
                <p className="text-xs text-gray-500">
                  {totalRegistered > 0 ? Math.round((totalPaid / totalRegistered) * 100) : 0}% of total
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Paid to Thuva</p>
                <p className="text-2xl font-bold">{paidToThuva}</p>
                <p className="text-xs text-gray-500">
                  {totalPaid > 0 ? Math.round((paidToThuva / totalPaid) * 100) : 0}% of paid
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Paid to Thushanth</p>
                <p className="text-2xl font-bold">{paidToThushanth}</p>
                <p className="text-xs text-gray-500">
                  {totalPaid > 0 ? Math.round((paidToThushanth / totalPaid) * 100) : 0}% of paid
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <UserCog className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h3 className="font-medium mb-3">Filters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                  placeholder="Filter by name"
                  value={filters['full_name'] || ''}
                  onChange={(e) => handleFilterChange('full_name', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={filters['gender'] || ''}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                >
                  <option value="">All Genders</option>
                  {getUniqueValues('gender').map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Category</label>
                <select
                  value={filters['age_category'] || ''}
                  onChange={(e) => handleFilterChange('age_category', e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                >
                  <option value="">All Categories</option>
                  {getUniqueValues('age_category').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                <select
                  value={filters['payment_status'] || ''}
                  onChange={(e) => handleFilterChange('payment_status', e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="paid_to_thuva">Paid to Thuva</option>
                  <option value="paid_to_thushanth">Paid to Thushanth</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                <Input
                  placeholder="Filter by reference"
                  value={filters['reference_number'] || ''}
                  onChange={(e) => handleFilterChange('reference_number', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chess-yellow"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50" 
                      onClick={() => handleSort('full_name')}
                    >
                      <div className="flex items-center">
                        Full Name
                        <SortIcon field="full_name" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('name_with_initials')}
                    >
                      <div className="flex items-center">
                        Name with Initials
                        <SortIcon field="name_with_initials" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('fide_id')}
                    >
                      <div className="flex items-center">
                        FIDE ID
                        <SortIcon field="fide_id" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('date_of_birth')}
                    >
                      <div className="flex items-center">
                        Date of Birth
                        <SortIcon field="date_of_birth" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('gender')}
                    >
                      <div className="flex items-center">
                        Gender
                        <SortIcon field="gender" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('contact_number')}
                    >
                      <div className="flex items-center">
                        Contact
                        <SortIcon field="contact_number" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('age_category')}
                    >
                      <div className="flex items-center">
                        Age Category
                        <SortIcon field="age_category" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('payment_status')}
                    >
                      <div className="flex items-center">
                        Payment Status
                        <SortIcon field="payment_status" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('reference_number')}
                    >
                      <div className="flex items-center">
                        Reference
                        <SortIcon field="reference_number" />
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.full_name}</TableCell>
                      <TableCell>{player.name_with_initials}</TableCell>
                      <TableCell>{player.fide_id || '-'}</TableCell>
                      <TableCell>{player.date_of_birth}</TableCell>
                      <TableCell>{player.gender}</TableCell>
                      <TableCell>{player.contact_number}</TableCell>
                      <TableCell>{player.age_category}</TableCell>
                      <TableCell>
                        <select
                          value={player.payment_status}
                          onChange={(e) => updatePaymentStatus(player.id, e.target.value as Player['payment_status'])}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-chess-yellow focus:ring-chess-yellow sm:text-sm"
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid_to_thuva">Paid to Thuva</option>
                          <option value="paid_to_thushanth">Paid to Thushanth</option>
                        </select>
                      </TableCell>
                      <TableCell>{player.reference_number}</TableCell>
                      <TableCell>
                        {updatingId === player.id && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredAndSortedPlayers.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredAndSortedPlayers.length}</span> results
                      {Object.keys(filters).filter(k => filters[k]).length > 0 && (
                        <button 
                          onClick={() => setFilters({})}
                          className="ml-2 text-sm text-blue-600 hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === number
                              ? 'z-10 bg-chess-yellow border-chess-yellow text-chess-black'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AllOrdersDataRow from '../../../components/Dashboard/TableRows/AllOrdersDataRow';
import { useState } from 'react';

const AllOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState('');

  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axiosSecure('/all-orders');
      return result.data;
    }
  });

  const filteredOrders = statusFilter
    ? orders.filter(order => order.orderStatus?.toLowerCase() === statusFilter.toLowerCase())
    : orders;

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 bg-gray-100 h-[calc(100vh-40px)]'>
        <div className='py-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
            <h2 className='text-lg md:text-2xl lg:text-4xl font-semibold'>All Orders</h2>

            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className="select select-bordered w-full max-w-50 md:max-w-xs border-primary focus:outline-none mt-5 sm:mt-0"
            >
              <option value="">All Orders (No Filter)</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden bg-white'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>Order ID</th>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>User</th>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>Product</th>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>Quantity</th>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>Order Status</th>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>Payment Status</th>
                    <th className='px-5 py-3 border-b border-gray-200 bg-white text-left text-xs font-semibold text-gray-700 uppercase'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(order => (
                    <AllOrdersDataRow
                      order={order}
                      key={order?._id}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pb-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Prev
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === index + 1
                        ? "bg-gray-700 border-gray-700 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
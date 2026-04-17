import { useQuery } from '@tanstack/react-query';
import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const ManageProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['manage-products', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/manage-products/${user?.email}`);
      return result.data;
    }
  });

  // 2. Filter & Pagination Logic
  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(search.toLowerCase()) ||
    product?.category?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingSpinner />;

  scrollTo(0,0);

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8 h-[calc(100vh-40px)]'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>

            <div className='flex flex-col md:flex-row items-center justify-between mb-8'>
              <h2 className='text-lg md:text-2xl font-medium'>Manage Your Products</h2>

              <input
                className='border border-gray-500 px-4 py-2 max-w-50 xl:max-w-xs w-full outline-none rounded-md bg-white mt-5 md:mt-0'
                type="text"
                placeholder='Search by name or category'
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden bg-white'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-400 text-gray-800 text-left text-sm uppercase font-semibold'>Image</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-400 text-gray-800 text-left text-sm uppercase font-semibold'>Name</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-400 text-gray-800 text-left text-sm uppercase font-semibold'>Price</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-400 text-gray-800 text-left text-sm uppercase font-semibold'>Category</th>
                    <th className='px-5 py-3 bg-white border-b border-gray-400 text-gray-800 text-left text-sm uppercase font-semibold'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(product => (
                    <SellerOrderDataRow
                      key={product._id}
                      product={product}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Pagination UI */}
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
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                onClick={() => setCurrentPage((prev) => prev + 1)}
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

export default ManageProducts;
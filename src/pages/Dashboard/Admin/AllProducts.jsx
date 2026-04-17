import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'; // Added useState
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AllProductsDataRow from '../../../components/Dashboard/TableRows/AllproductsDataRow';

const AllProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products', user?.email],
    queryFn: async () => {
      const result = await axiosSecure('/products');
      return result.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  scrollTo(0,0);

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 bg-gray-100 h-[calc(100vh-40px)]'>
        <div className='py-8'>
          <h2 className='text-lg sm:text-2xl lg:text-4xl font-semibold mb-4'>All Products</h2>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Image</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Product Name</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Price</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Category</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Created By</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Show on Home</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(product => (
                    <AllProductsDataRow
                      product={product}
                      key={product?._id}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination UI - Matched to your ProjectsCard style */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-5 pb-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-30 cursor-pointer"
              >
                Prev
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full cursor-pointer border flex items-center justify-center ${currentPage === index + 1
                        ? "bg-gray-700 border-gray-700 text-white"
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
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-30 cursor-pointer"
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

export default AllProducts;
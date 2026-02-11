import { useQuery } from '@tanstack/react-query';
import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const ManageProducts = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/manage-products/${user?.email}`);
      return result.data;
    }
  })

  const filteredProducts = products.filter(product =>
  product?.name?.toLowerCase().includes(search.toLowerCase()) ||
  product?.category?.toLowerCase().includes(search.toLowerCase())
);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>

            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-medium'>Manage Your Products</h2>

              <input
                className='border border-gray-500 px-4 py-2 max-w-xs w-full outline-none rounded-md'
                type="text"
                placeholder='Search by name or category'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-400 text-gray-800  text-left text-sm uppercase font-semibold'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-400 text-gray-800  text-left text-sm uppercase font-semibold'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-400 text-gray-800  text-left text-sm uppercase font-semibold'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-400 text-gray-800  text-left text-sm uppercase font-semibold'
                    >
                      Payment Mode
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-400 text-gray-800  text-left text-sm uppercase font-semibold'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <SellerOrderDataRow
                      key={product._id}
                      product={product}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageProducts

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AllProductsDataRow from '../../../components/Dashboard/TableRows/AllproductsDataRow';
import AllOrdersDataRow from '../../../components/Dashboard/TableRows/AllOrdersDataRow';
import { useState } from 'react';

const AllOrders = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState('');

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axiosSecure('/all-orders');
      return result.data;
    }
  })
  // console.log(orders);

  const filteredOrders = statusFilter? orders.filter(order => order.paymentStatus?.toLowerCase() === statusFilter.toLowerCase()): orders;

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='flex justify-between'>
            <h2 className='text-4xl font-semibold mb-4'>All Orders</h2>

            <select 
            defaultValue="Pick a text editor" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-primary">
              <option value="" disabled={true}>Filter by </option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Order ID
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      User
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredOrders.map(order => <AllOrdersDataRow order={order} key={order?._id} refetch={refetch} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllOrders

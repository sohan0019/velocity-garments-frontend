import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import BuyerOrderDataRow from '../../../components/Dashboard/TableRows/BuyerOrderDataRow';

const MyOrders = () => {

  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['[orders]',],
    queryFn: async () => {
      const result = await axiosSecure('/orders');
      return result.data;
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8 h-[calc(100vh-40px)]'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium'
                    >
                      Order ID
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium'
                    >
                      Payment
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map(product => (
                      <BuyerOrderDataRow
                      key={product._id}
                      product={product}
                      />
                    ))
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

export default MyOrders

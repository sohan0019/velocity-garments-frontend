import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AllProductsDataRow from '../../../components/Dashboard/TableRows/AllproductsDataRow';

const AllProducts = () => {

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading, refetch } = useQuery({
      queryKey: ['products', user?.email],
      queryFn: async () => {
        const result = await axiosSecure('/products');
        return result.data;
      }
    })
    // console.log(products);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 bg-gray-100'>
        <div className='py-8'>
          <h2 className='text-4xl font-semibold mb-4'>All Products</h2>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Product Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Created By
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Show on Home 
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map(product => <AllProductsDataRow product={product} key={product?._id} refetch={refetch} />)
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

export default AllProducts

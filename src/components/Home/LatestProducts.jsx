import Card from './Card'
import Container from '../Shared/Container'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';

const LatestProducts = () => {

  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const result = await axiosSecure('/homepage-products');
      return result.data;
    }
  })

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <Container>
      <h2 className='text-5xl font-semibold text-center mt-8'>Feature Products</h2>
      {
        products && products.length > 0 ? (
          <div className='py-12 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
              products.map(product => (
                <Card key={product._id} product={product}></Card>
              ))
            }
          </div>
        ) : (
          <h2>No Data is Available</h2>
        )
      }
    </Container>
  )
}

export default LatestProducts;

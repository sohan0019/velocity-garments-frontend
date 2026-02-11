import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useRole from '../../hooks/useRole'

const ProductDetails = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {role, isRoleLoading} = useRole();

  const { data: product = [], isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const result = await axiosSecure(`/product/${id}`);
      return result.data;
    }
  })

  const { _id, name, images, quantity, moq, price, category, description, paymentMethod } = product || {};
  const image = images && images.length > 0 ? images[0] : null;

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (isRoleLoading) return <LoadingSpinner />;

  const isActionDisabled = role === 'Admin' || role === 'Manager';

  return (
    <Container>
      <div className='mx-auto my-16 flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl h-112'>
              <img
                className='object-cover w-fit h-full mx-auto'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <h1 className='text-4xl font-bold'>{name}</h1>
          <h3 className='mt-3 mb-6 text-lg text-gray-700 font-medium'>Category: {category}</h3>

          <div
            className='
          text-base font-light text-black'
          >
            {description}
          </div>

          <hr className='my-6 text-blue-800' />
          <div>
            <p
              className='
                text-lg
                gap-4 
                mb-2
                text-neutral-700
              '
            >
              Minimum Order: <strong>{moq}</strong> units
            </p>

            <p
              className='
                text-lg
                gap-4 
                mb-2
                text-neutral-700
              '
            >
              Available Quantity: <strong>{quantity}</strong>
            </p>

            <p
              className='
                text-lg
                gap-4 
                text-neutral-700
              '
            >
              Payment Options: <span className='font-medium'>{paymentMethod}</span>
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-purple-800'>Price: {price}</p>
            <Link
              to={isActionDisabled ? '#' : `/buying-form/${_id}`}
              state={{ managerEmail: product?.manager?.email }}
              className={isActionDisabled ? 'cursor-not-allowed' : ''}
            >
              <Button
                disabled={isActionDisabled}
                label={isActionDisabled ? 'Order Now' : 'Order Now'}
              />
            </Link>
          </div>

        </div>
      </div>
    </Container>
  )
}

export default ProductDetails

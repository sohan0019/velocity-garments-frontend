import { Link } from 'react-router'
import Button from '../Shared/Button/Button'

const Card = ({product}) => {

  const {_id, name, images, quantity, price, category} = product || {}
  const image = images && images.length > 0 ? images[0] : null;

  return (
    <Link
      to={`/product/${_id}`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl'
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={image}
            alt='Plant Image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-xl mt-3'>{name}</div>
        <div className='font-medium text-green-900 text-lg'>Category: {category}</div>
        <div className='font-medium text-green-900 text-lg'>Quantity: {quantity}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold text-green-900'> Price: {price}</div>
        </div>
        <Button label={'View Details'}></Button>
      </div>
    </Link>
  )
}

export default Card

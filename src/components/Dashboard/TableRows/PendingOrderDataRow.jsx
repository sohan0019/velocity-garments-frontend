import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdateProductModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { Link } from 'react-router'

const PendingOrderDataRow = ({ order, refetch }) => {

  const axiosSecure = useAxiosSecure();
  const [isViewOpen, setIsViewOpen] = useState(false)

  const { _id, buyerEmail, name, orderQuantity, orderStatus, createdAt, trackingId, productId } = order || {};


  const handleStatusUpdate = async (status) => {
    try {
      await axiosSecure.patch(`/orders/${_id}`, { status, trackingId })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{_id}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{buyerEmail}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{orderQuantity}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{orderStatus}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{createdAt}</p>
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => handleStatusUpdate('approved')}
              className='px-3 py-1 bg-amber-200 rounded-full'
            >
              Approve
            </button>

            <button
              onClick={() => handleStatusUpdate('rejected')}
              className='px-3 py-1 bg-red-200 rounded-full'
            >
              Reject
            </button>

            <Link
              to={productId ? `/product/${productId}` : '#'}
              className={`px-3 py-1 bg-green-300 rounded-full ${!productId && 'opacity-50 cursor-not-allowed'}`}
            >
              View
            </Link>
          </div>
        </td>
      </tr>
    </>
  )
}

export default PendingOrderDataRow

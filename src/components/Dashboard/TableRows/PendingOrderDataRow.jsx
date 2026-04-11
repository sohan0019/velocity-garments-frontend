import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdateProductModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { Link } from 'react-router'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'

const PendingOrderDataRow = ({ order, refetch }) => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { _id, buyerEmail, name, orderQuantity, orderStatus, createdAt, trackingId, productId } = order || {};

  const { data: dbUser = {} } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  const isSuspended = dbUser?.status === 'Suspend';

  const handleStatusUpdate = async (status) => {
    try {
      await axiosSecure.patch(`/orders/${_id}`, { status, trackingId })
      if (status === 'approved') {
        toast.success("Order Approved")
      } else if (status === 'rejected') {
        toast.success("Order Rejected")
      }
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
              disabled={isSuspended}
              onClick={() => handleStatusUpdate('approved')}
              className={`px-3 py-1 rounded-full transition ${isSuspended
                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-amber-200 cursor-pointer hover:bg-amber-300'
                }`}
            >
              Approve
            </button>

            <button
              disabled={isSuspended}
              onClick={() => handleStatusUpdate('rejected')}
              className={`px-3 py-1 rounded-full transition ${isSuspended
                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-red-200 cursor-pointer hover:bg-red-300'
                }`}
            >
              Reject
            </button>

            <Link
              to={`/dashboard/order-details/${_id}`}
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

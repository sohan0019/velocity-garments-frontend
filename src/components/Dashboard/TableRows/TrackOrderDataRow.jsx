import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdateProductModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AddTrackingModal from '../../Modal/AddTrackingModal'
import { Link } from 'react-router'

const TrackOrderDataRow = ({ order, refetch }) => {

  const axiosSecure = useAxiosSecure();
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const { _id, trackingId, name, orderQuantity, price, latestTracking } = order || {};

  // Mutation for adding tracking
  const { mutateAsync } = useMutation({
    mutationFn: async (trackingInfo) => {
      const { data } = await axiosSecure.post('/add-tracking', trackingInfo);
      return data;
    },
    onSuccess: () => {
      refetch(); // This refreshes the table data
      toast.success('Tracking Updated!');
      setIsTrackingOpen(false);
    }
  });

  const handleTrackingUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const trackingInfo = {
      trackingId,
      status: form.status.value,
      location: form.location.value,
    };

    try {
      await mutateAsync(trackingInfo);
    } catch (err) {
      toast.error(err.message);
    }
    ;
  }

  return (
    <>
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-xs'>
          <p className='text-gray-900 '>{trackingId}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{orderQuantity}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 '>{price}</p>
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

          <Link
            to={`/dashboard/view-tracking/${trackingId}`}
            onClick={() => setIsViewOpen(true)}
            className='bg-green-500 text-white px-3 py-1 rounded'
          >
            View Tracking
          </Link>
        </td>
      </tr>
    </>
  )
}

export default TrackOrderDataRow

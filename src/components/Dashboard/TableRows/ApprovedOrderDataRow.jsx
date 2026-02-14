import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdateProductModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AddTrackingModal from '../../Modal/AddTrackingModal'

const ApprovedOrderDataRow = ({ order, refetch }) => {

  const axiosSecure = useAxiosSecure();
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const { _id, buyerEmail, name, orderQuantity, orderStatus, createdAt, trackingId } = order || {};

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
      note: form.note.value,
    };
    
    try {
      await mutateAsync(trackingInfo);
    } catch (err) {
      toast.error(err.message);
    }
  ;}

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
          <p className='text-gray-900 '>{createdAt}</p>
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setIsTrackingOpen(true)}
              className='bg-blue-500 text-white px-3 py-1 rounded'
            >
              Add Tracking
            </button>

            <button
              onClick={() => setIsViewOpen(true)}
              className='bg-green-500 text-white px-3 py-1 rounded'
            >
              View Tracking
            </button>
          </div>
        </td>
      </tr>

      <AddTrackingModal 
        isOpen={isTrackingOpen} 
        closeModal={() => setIsTrackingOpen(false)} 
        trackingId={trackingId}
        handleUpdate={handleTrackingUpdate}
      />
    </>
  )
}

export default ApprovedOrderDataRow

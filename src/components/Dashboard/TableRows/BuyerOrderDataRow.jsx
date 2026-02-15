import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
const BuyerOrderDataRow = ({ product }) => {

  const { _id, productId, name, orderQuantity, orderStatus, paymentMethod } = product || {};

  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/orders/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['[orders]'] })
      toast.success('Order cancelled successfully!')
      closeModal()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleDelete = async () => {
    try {
      await mutateAsync(_id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{productId}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{orderQuantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{orderStatus}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{paymentMethod}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <div>
            <Link
              to={`/dashboard/order-details/${_id}`}
              className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-black leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-amber-100 border border-orange-500 rounded-full'
              ></span>
              <span className='relative'>View</span>
            </Link>

          </div>

          {
            orderStatus == 'pending' && (
              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                  <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-red-200 opacity-50 border border-orange-500 rounded-full'
                  ></span>
                  <span className='relative'>Cancel</span>
                </button>
                <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} />
              </div>
            )
          }
        </div>
      </td>
    </tr>
  )
}

export default BuyerOrderDataRow

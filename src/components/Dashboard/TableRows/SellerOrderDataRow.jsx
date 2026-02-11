import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import UpdateProductModal from '../../Modal/UpdateProductModal';

const SellerOrderDataRow = ({ product }) => {

  const { images, name, price, paymentMethod } = product || {};
  const image = images && images.length > 0 ? images[0] : null;

  let [isOpen, setIsOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const closeModal = () => setIsOpen(false)

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Define the mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { product } = await axiosSecure.delete(`/product/${id}`);
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', user?.email] });
      toast.success('Product removed successfully');
      closeModal();
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(product._id);
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete');
    }
  };

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/product/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', user?.email] });
      setIsUpdateModalOpen(false);
    },
    onError: () => {
      toast.error('Update failed');
    }
  });

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-400 bg-white text-sm'>
        <img className='w-12 h-12' src={image} alt="" />
      </td>
      <td className='px-5 py-5 border-b border-gray-400 bg-white text-sm'>
        <p className='text-gray-900 '>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-400 bg-white text-sm'>
        <p className='text-gray-900 '>{price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-400 bg-white text-sm'>
        <p className='text-gray-900 '>{paymentMethod}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-400 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <div>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-black leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-amber-100 border border-orange-500 rounded-full'
              ></span>
              <span className='relative'>Update</span>
            </button>
            <UpdateProductModal
              isOpen={isUpdateModalOpen}
              setIsEditModalOpen={setIsUpdateModalOpen}
              product={product}
              onUpdate={(id, updatedData) =>
                updateMutation.mutateAsync({ id, updatedData })
              }
            />
          </div>

          <div>
            <button
              onClick={() => setIsOpen(true)}
              className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-red-200 opacity-50 border border-orange-500 rounded-full'
              ></span>
              <span className='relative'>Delete</span>
            </button>
            <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default SellerOrderDataRow

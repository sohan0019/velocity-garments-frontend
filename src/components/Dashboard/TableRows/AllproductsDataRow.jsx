import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import DeleteModal from '../../Modal/DeleteModal';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const AllProductsDataRow = ({ product, refetch }) => {

  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { _id, images, name, price, category, manager, showOnHome } = product || {};
  const image = images && images.length > 0 ? images[0] : null;

  const handleToggle = async (e) => {
    const newValue = e.target.checked;

    try {
      await axiosSecure.patch(`/product/${_id}`, {
        showOnHome: newValue,
      });

      toast.success(`Status updated to ${newValue ? 'Visible' : 'Hidden'}`);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status")
      e.target.checked = !newValue;
    }
  };

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
      refetch();
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete');
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-400  text-sm'>
        <img className='w-12 h-12' src={image} alt="" />
      </td>
      <td className='px-5 py-5 border-b border-gray-400 text-sm'>
        <p className='text-gray-900 '>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-400 text-sm'>
        <p className=''>{price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-400 text-sm'>
        <p className=''>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-400 text-sm'>
        <p className=''>{manager.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-400 text-sm'>
        <input type="checkbox" checked={showOnHome} onChange={handleToggle} className="toggle toggle-primary" />
      </td>
      <td className='px-5 py-5 border-b border-gray-400 text-sm'>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 border border-orange-500 rounded-full'
            ></span>
            <span className='relative'>Delete</span>
          </button>
          <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} />
        </div>
      </td>
    </tr>
  )
}

export default AllProductsDataRow

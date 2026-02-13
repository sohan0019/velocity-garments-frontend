import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
const CustomerOrderDataRow = ({ product }) => {

  const { productId, name, orderQuantity, paymentStatus, paymentMethod } = product || {};

  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

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
        <p className='text-gray-900'>{paymentStatus}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{paymentMethod}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <div>
            <button
              className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-black leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-amber-100 border border-orange-500 rounded-full'
              ></span>
              <span className='relative'>Edit</span>
            </button>

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
            <DeleteModal isOpen={isOpen} closeModal={closeModal} />
          </div>
        </div>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default CustomerOrderDataRow

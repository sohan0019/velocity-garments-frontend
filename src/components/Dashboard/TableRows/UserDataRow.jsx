import { useState } from 'react'
import UpdateUserStatusModal from '../../Modal/UpdateUserStatusModal'

const UserDataRow = ({user, refetch}) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>{user?.role}</p>
      </td>
      <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${user.status === 'pending' ? 'text-red-600 ' : 'text-green-600'}`}>
        <p className=''>{user?.status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Status</span>
        </span>
        {/* Modal */}
        <UpdateUserStatusModal
          isOpen={isOpen}
          closeModal={closeModal}
          user={user}
          refetch={refetch}
        />
      </td>
    </tr>
  )
}

export default UserDataRow

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateUserStatusModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState(user?.status)
  // 1. Add state to capture the reason
  const [suspendReason, setSuspendReason] = useState('')

  const axiosSecure = useAxiosSecure();

  const handleStatusUpdate = async () => {
    try {
      await axiosSecure.patch('/update-status', {
        email: user?.email,
        status: updatedStatus,
        // 2. Include the reason in your API call
        reason: updatedStatus === 'Suspend' ? suspendReason : '',
      })
      toast.success('Status updated!')
      refetch();
    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    finally {
      closeModal();
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={closeModal}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl border border-gray-100'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black'
              >
                Update User Status
              </DialogTitle>
              <form>
                <div>
                  <select
                    value={updatedStatus}
                    onChange={e => setUpdatedStatus(e.target.value)}
                    className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='status'
                  >
                    <option value='Approve'>Approve</option>
                    <option value='Suspend'>Suspend</option>
                  </select>
                </div>

                {/* 3. Conditional Rendering Logic */}
                {updatedStatus === 'Suspend' && (
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Reason for Suspension
                    </label>
                    <textarea
                      required
                      value={suspendReason}
                      onChange={(e) => setSuspendReason(e.target.value)}
                      placeholder='Briefly explain why...'
                      className='w-full border border-gray-200 rounded-xl px-2 py-3 focus:outline-none focus:ring-2 focus:ring-red-500'
                      rows='3'
                    />
                  </div>
                )}

                <div className='flex mt-2 justify-around'>
                  <button
                    type='button'
                    onClick={handleStatusUpdate}
                    className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none'
                  >
                    Update
                  </button>
                  <button
                    type='button'
                    className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default UpdateUserStatusModal
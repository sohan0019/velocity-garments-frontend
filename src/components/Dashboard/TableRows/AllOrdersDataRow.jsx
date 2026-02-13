import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllOrdersDataRow = ({ order, refetch }) => {

  const axiosSecure = useAxiosSecure();

  const { _id, buyerEmail, name, orderQuantity, paymentStatus, price, } = order || {};



  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{_id}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{buyerEmail}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>{orderQuantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>{paymentStatus}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div>
          <button
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 border border-orange-500 rounded-full'
            ></span>
            <span className='relative'>View</span>
          </button>
        </div>
      </td>

    </tr>
  )
}

export default AllOrdersDataRow

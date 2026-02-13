import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllProductsDataRow = ({product, refetch}) => {

  const axiosSecure = useAxiosSecure();

  const { _id, images, name, price, category, manager, showOnHome } = product || {};
  const image = images && images.length > 0 ? images[0] : null;

  const handleToggle = async (e) => {
    const newValue = e.target.checked

    try {
      await axiosSecure.patch(`/products/${_id}`, {
        showOnHome: newValue,
      })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

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
    </tr>
  )
}

export default AllProductsDataRow

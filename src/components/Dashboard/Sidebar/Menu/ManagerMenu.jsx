import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdOutlineManageHistory, MdPendingActions } from 'react-icons/md'
import MenuItem from './MenuItem'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-product'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Products'
        address='manage-products'
      />
      <MenuItem icon={MdPendingActions} label='Pending Orders' address='pending-orders' />
      <MenuItem icon={IoCheckmarkDoneCircleSharp} label='Approved Orders' address='approved-orders' />
    </>
  )
}

export default ManagerMenu

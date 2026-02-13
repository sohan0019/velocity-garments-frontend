import { FaUserCog } from 'react-icons/fa'
import { LuBoxes } from "react-icons/lu";
import { BiSolidShoppingBag } from "react-icons/bi";
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={LuBoxes} label='All Products' address='all-products' />
      <MenuItem icon={BiSolidShoppingBag} label='All Orders' address='all-orders' />
    </>
  )
}

export default AdminMenu

import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { LuPackageSearch } from 'react-icons/lu'
const BuyerMenu = () => {
 

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />
      <MenuItem icon={LuPackageSearch} label='Track Order' address='track-order/:id' />

    </>
  )
}

export default BuyerMenu

import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import BuyerStatistics from '../../../components/Dashboard/Statistics/BuyerStatistics';
import ManagerStatistics from '../../../components/Dashboard/Statistics/ManagerStatistics';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole'
const Statistics = () => {

  const {role, isRoleLoading} = useRole();


  if(isRoleLoading) return <LoadingSpinner />
  return (
    <div>
      {role === "Admin" && <AdminStatistics />}
      {role === "Manager" && <ManagerStatistics />}
      {role === "Buyer" && <BuyerStatistics />}
      
    </div>
  )
}

export default Statistics

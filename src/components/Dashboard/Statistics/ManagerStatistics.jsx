import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsBoxSeamFill, BsFillCartPlusFill } from 'react-icons/bs'
import { FaUserGear } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ManagerStatistics = () => {

  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    approvedOrders: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    const fetchStats = async () => {
      try {
        const response = await axiosSecure.get(`/manager-stats?email=${user.email}`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure, user]);

  const { totalProducts, totalOrders, approvedOrders, pendingOrders } = stats;

  return (
    <div>
      <div className='pt-12 h-[calc(100vh-40px)]'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow'>
          {/* Sales Card */}

          <div className="flex items-center justify-between rounded-lg bg-[#e7ac02] p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Total Products</h3>
              <h4 className="font-bold">{totalProducts}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#e7ac02]">
              <BsBoxSeamFill size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#1e285a] p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Total Orders</h3>
              <h4 className="font-bold">{totalOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#1e285a]">
              <BsFillCartPlusFill size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-green-500 p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Approved Orders</h3>
              <h4 className="font-bold">{approvedOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-green-500">
              <FaUserAlt size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-blue-500 p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Pending Orders</h3>
              <h4 className="font-bold">{pendingOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-blue-500">
              <FaUserGear size={20} />
            </div>
          </div>
        </div>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/*Sales Bar Chart */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            {/* Chart goes here.. */}
          </div>
          {/* Calender */}
          <div className=' relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            {/* Calender */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerStatistics

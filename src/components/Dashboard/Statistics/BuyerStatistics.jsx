import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsBoxSeamFill, BsFillCartPlusFill } from 'react-icons/bs'
import { LuClipboardCheck, LuClipboardX, LuTruck  } from "react-icons/lu";
import { FaUserGear } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const BuyerStatistics = () => {

  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalApprovedOrders: 0,
    totalPendingOrders: 0,
    totalRejectedOrders: 0,
    paidOrders: 0,
    codOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    const fetchStats = async () => {
      try {
        const response = await axiosSecure.get(`/buyer-stats?email=${user.email}`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure, user]);

  const { totalApprovedOrders, totalPendingOrders, totalRejectedOrders, paidOrders, codOrders } = stats;

  return (
    <div>
      <div className='pt-12 h-[calc(100vh-40px)]'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow'>
          {/* Sales Card */}

          <div className="flex items-center justify-between rounded-lg bg-[#e7ac02] p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Total Approved Orders</h3>
              <h4 className="font-bold">{totalApprovedOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#e7ac02]">
              <LuClipboardCheck size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#1e285a] p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Total Pending Orders</h3>
              <h4 className="font-bold">{totalPendingOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#1e285a]">
              <LuClipboardX size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-green-500 p-4 text-white shadow">
            <div> 
              <h3 className="font-medium">Total Rejected Orders</h3>
              <h4 className="font-bold">{totalRejectedOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-green-500">
              <BsBoxSeamFill size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-blue-500 p-4 text-white shadow">
            <div>
              <h3 className="font-medium">Paid Orders</h3>
              <h4 className="font-bold">{paidOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-blue-500">
              <LuTruck size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-blue-500 p-4 text-white shadow">
            <div>
              <h3 className="font-medium">COD Orders</h3>
              <h4 className="font-bold">{codOrders}</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-blue-500">
              <LuTruck size={20} />
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

export default BuyerStatistics

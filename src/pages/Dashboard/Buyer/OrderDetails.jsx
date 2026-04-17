import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const OrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading: orderLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/orders/${id}`);
      return data;
    },
  });

  const { data: logs = [], isLoading: logsLoading } = useQuery({
    queryKey: ['logs', order?.trackingId],
    enabled: !!order?.trackingId,
    queryFn: async () => {
      const { data } = await axiosSecure(`/trackings/${order.trackingId}/logs`);
      return data;
    },
  });

  if (orderLoading || logsLoading) return <LoadingSpinner />;

  scrollTo(0,0);

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-md max-w-6xl mx-auto h-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-8 border-b pb-2">Order Details</h2>

      {/* Main Content Grid: Details Left, Image Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">

        {/* Left Side: Text Info */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-2">
            <span className="font-bold text-gray-600">Order ID:</span>
            <span className="text-gray-800 break-all">{order?.productId}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold text-gray-600">Product:</span>
            <span className="text-gray-800">{order?.name}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold text-gray-600">Quantity:</span>
            <span className="text-gray-800">{order?.orderQuantity}</span>
          </div>
          <div className="flex justify-between py-2 items-center">
            <span className="font-bold text-gray-600">Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order?.orderStatus === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
              {order?.orderStatus}
            </span>
          </div>
        </div>

        {/* Right Side: Product Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg border">
            <img
              src={order?.productImage}
              alt={order?.name}
              className="w-full h-66 object-cover object-top hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
            />
          </div>
        </div>
      </div>

      <hr className="mb-10" />

      {/* Timeline Section */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-8 text-center lg:text-left">Tracking Timeline</h3>

        <ul className="timeline timeline-vertical">
          {logs.map((log, index) => (
            <li key={log._id}>
              {index !== 0 && <hr className="bg-primary" />}
              <div className="timeline-start font-mono italic">
                {new Date(log.createdAt).toLocaleDateString()}
              </div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="timeline-end timeline-box shadow-sm border-gray-100">
                <div className="font-bold text-primary">{log.status.replace('-', ' ')}</div>
                <div className="text-sm opacity-70 italic">{log.location}</div>
              </div>
              {index !== logs.length - 1 && <hr className="bg-primary" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
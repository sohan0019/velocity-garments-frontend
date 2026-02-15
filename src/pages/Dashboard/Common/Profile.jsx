import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
// Optional: install date-fns for easy date formatting
// import { format } from 'date-fns'; 

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userdata, isLoading, isError } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-ring loading-lg text-primary"></span>
    </div>
  );

  if (isError || !user) return <div className="text-center mt-10 text-red-500">User not found or error fetching data.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-blue-500 to-purple-600"></div>

        <div className="relative flex flex-col items-center mt-8">
          {/* Profile Image with Border */}
          <div className="p-1 bg-white rounded-full shadow-lg">
            <img
              src={userdata.image}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 mt-4">{userdata.name}</h2>
          <p className="text-blue-600 font-medium">{userdata.email}</p>
          
          {/* Badge for Role */}
          <span className="mt-3 px-4 py-1 rounded-full bg-blue-10 text-blue-700 text-sm font-bold border border-blue-200 uppercase tracking-wider">
            {userdata.role}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-500 font-medium">Status</span>
            <span className={`font-bold ${userdata.status === 'Approve' ? 'text-green-600' : 'text-amber-600'}`}>
              {userdata.status}
            </span>
          </div>

          <div className="flex justify-between items-center p-3">
            <span className="text-gray-500 font-medium">Member Since</span>
            <span className="text-gray-700 font-semibold">
              {new Date(userdata.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between items-center p-3">
            <span className="text-gray-500 font-medium">Last Activity</span>
            <span className="text-gray-700 font-semibold text-right">
                {new Date(userdata.last_logged_in).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
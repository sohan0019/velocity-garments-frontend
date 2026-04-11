import { useQuery } from '@tanstack/react-query';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const ManageUsers = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const result = await axiosSecure('/user');
      return result.data;
    }
  })
  // console.log(users);

  const displayedUsers = users.filter(userData => {
    // 1. Check Role Filter
    const matchesRole = roleFilter
      ? userData.role?.toLowerCase() === roleFilter.toLowerCase()
      : true;

    // 2. Check Search Input
    const searchLower = search.toLowerCase();
    const matchesSearch =
      userData?.name?.toLowerCase().includes(searchLower) ||
      userData?.email?.toLowerCase().includes(searchLower);

    return matchesRole && matchesSearch;
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8 h-[calc(100vh-40px)]'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <h2 className='lg:text-2xl xl:text-4xl font-semibold mb-4'>Manage Users</h2>

            <div className='flex flex-col md:flex-row gap-6'>
              <input
                className='border border-gray-500 bg-white px-2 h-10 max-w-xs w-full outline-none rounded-md text-xs md:text-sm xl:text-base'
                type="text"
                placeholder='Search by name or email'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                defaultValue="Pick a text editor"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="select select-primary min-w-56 text-xs md:text-sm xl:text-base">
                <option value="" >All Roles </option>
                <option value="manager">Manager</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
          </div>

          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    displayedUsers.map(user => <UserDataRow user={user} key={user?._id} refetch={refetch} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers

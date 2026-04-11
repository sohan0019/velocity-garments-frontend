import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { saveOrUpdateUser } from '../../Utils'
import useRole from '../../hooks/useRole'
import { useEffect } from 'react'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()


  const { role, isLoading: isRoleLoading } = useRole();
  const from = location.state?.pathname || '/';
  
  useEffect(() => {
    if (user && role && !isRoleLoading) {
      // Determine target based on role
      const getDashboardPath = (role) => {
        if (role === 'Admin') return '/dashboard/admin-home';
        if (role === 'Manager') return '/dashboard/all-orders';
        return '/dashboard/my-orders';
      };

      // If there is a "from" state, check if it's safe, otherwise use role default
      const target = (from !== '/') ? from : getDashboardPath(role);

      navigate(target, { replace: true });
    }
  }, [user, role, isRoleLoading, navigate, from]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { email, password } = data;
    setLoading(true);
    try {
      const { user } = await signIn(email, password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user.photoURL,
      })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
      setLoading(false)
      reset();
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user.photoURL,
        role: 'Buyer',
      })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.error(err); // Log the error
      toast.error(err?.message || "An unexpected error occurred"); // Display the toast
      setLoading(false);
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-50 text-gray-900 border border-red-700'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-md text-gray-500'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address.'
                  },
                })}
              />
              {
                errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
              }
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                autoComplete='current-password'
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                {...register('password', {
                  required: 'Password is required.',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: 'Must contain one upprecase, lowercase and length atleast 6.'
                  }
                })}
              />
              {
                errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
              }
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-orange-400 w-full rounded-md py-3 text-white text-lg font-semibold cursor-pointer'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className='hover:underline hover:text-orange-400 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login

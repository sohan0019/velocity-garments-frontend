import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyOrders from '../pages/Dashboard/Buyer/MyOrders'
import { createBrowserRouter } from 'react-router'
import Products from '../pages/Products/Products'
import BuyingForm from '../pages/BookingForm/BuyingForm'
import AddProduct from '../pages/Dashboard/Manager/AddProduct'
import ManageProducts from '../pages/Dashboard/Manager/ManageProducts'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import AllProducts from '../pages/Dashboard/Admin/AllProducts'
import AllOrders from '../pages/Dashboard/Admin/AllOrders'
import PendingOrders from '../pages/Dashboard/Manager/PendingOrders'
import ApprovedOrders from '../pages/Dashboard/Manager/ApprovedOrders'
import OrderDetails from '../pages/Dashboard/Buyer/OrderDetails'
import ViewTracking from '../pages/ViewTracking/ViewTracking'
import TrackOrder from '../pages/Dashboard/Buyer/TrackOrder'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/product/:id',
        element: <PrivateRoute>
          <ProductDetails />
        </PrivateRoute>,
      },
      {
        path: '/buying-form/:id',
        element: <BuyingForm />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'pending-orders',
        element: (
          <PrivateRoute>
            <PendingOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'approved-orders',
        element: (
          <PrivateRoute>
            <ApprovedOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'view-tracking/:trackingId',
        element: (
          <PrivateRoute>
            <ViewTracking />
          </PrivateRoute>
        ),
      },
      {
        path: 'track-order/:trackingId',
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-products',
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-orders',
        element: (
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'order-details/:id',
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-products',
        element: <ManageProducts />,
      },
    ],
  },
])

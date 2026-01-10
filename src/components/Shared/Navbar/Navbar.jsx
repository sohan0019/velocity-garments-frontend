import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/Logo.png'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const links = (
    <>
      <li><NavLink className="hover:text-blue-900" to="/">Home</NavLink></li>
      <li><NavLink className="hover:text-blue-900" to="/">All Products</NavLink></li>
      <li><NavLink className="hover:text-blue-900" to="/">About Us</NavLink></li>
      <li><NavLink className="hover:text-blue-900" to="/">Contact</NavLink></li>
    </>
  )

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="relative flex items-center justify-between">

            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="logo" width="100" />
            </Link>

            {/* Center links (ONLY large screens) */}
            <ul className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
              {links}
            </ul>

            {/* Right section */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <img
                  className="hidden md:block rounded-full"
                  src={user?.photoURL || avatarImg}
                  alt="profile"
                  width="30"
                />
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-md text-sm">
                  <ul className="flex flex-col">

                    <div className="md:hidden px-4 pt-3 pb-3 flex flex-col gap-6">
                      {links}
                    </div>

                    {user ? (
                      <>
                        <Link to="/dashboard" className="px-4 py-3 hover:bg-neutral-100">
                          Dashboard
                        </Link>
                        <button
                          onClick={logOut}
                          className="text-left px-4 py-3 hover:bg-neutral-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="px-4 py-3 hover:bg-neutral-100">
                          Login
                        </Link>
                        <Link to="/signup" className="px-4 py-3 hover:bg-neutral-100">
                          Sign Up
                        </Link>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar

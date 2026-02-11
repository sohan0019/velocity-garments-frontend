import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoLinkedin } from 'react-icons/io5';
import logo from '../../../assets/images/Logo.png'
import Container from '../Container';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <section>
      <Container>
        <div className='bg-gray-200 text-black p-10 border-t'>
          <footer className="footer sm:footer-horizontal">
            <aside>
              <img className='w-30' src={logo} alt="" />
              <h2 className='text-2xl font-semibold'>velocity Garments</h2>
              <h3 className='text-base font-semibold'>Sohanur Rahman</h3>
              <h3 className='text-base font-semibold'>sohanurrahman3092@gmail.com</h3>
              <h3 className='text-base font-semibold'>01711167325</h3>
            </aside>
            <nav>
              <h6 className="footer-title">Links</h6>
              <div className="grid grid-flow-row gap-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">All Products</NavLink>
                <NavLink to="/">About Us</NavLink>
                <NavLink to="/">Contact</NavLink>
              </div>
            </nav>
            <nav>
              <h6 className="footer-title">Social</h6>
              <div className="grid grid-flow-col gap-4">
                <a href="https://www.facebook.com" target="_blank"><FaFacebook className='size-6' /></a>
                <a href="https://www.instagram.com" target="_blank"><FaInstagram className='size-6' /></a>
                <a href="https://twitter.com" target="_blank"><FaSquareXTwitter className='size-6' /></a>
                <a href="https://linkedin.com" target="_blank"><IoLogoLinkedin className='size-6' /></a>
              </div>
            </nav>
          </footer>
          <p className='text-base font-semibold text-center text-blue-950 mt-6'>Velocity Garments - 2026 @ All Rights Reserved</p>
        </div>

      </Container>
    </section>
  )
}

export default Footer

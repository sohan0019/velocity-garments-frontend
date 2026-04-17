import React from 'react';
import Container from '../Shared/Container';
import { FaTruckMoving } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoManSharp } from 'react-icons/io5';
import { BsBoxSeamFill } from 'react-icons/bs';

const About = () => {
  return (
    <section>
      <Container>
        <div className='px-10 my-10'>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-10 gap-6'>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <BsBoxSeamFill className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>57  </span> ORDERS COMPLETED</h2>
          </div>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <FaPeopleGroup className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>47  </span> PERMANENT BUYERS</h2>
          </div>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <FaTruckMoving className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>10  </span> OWNED VEHICLES</h2>
          </div>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <IoManSharp className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>5  </span> SUPPORT MEMBERS</h2>
          </div>
        </div>
      </div>
      </Container>
      
    </section>
  );
};

export default About;
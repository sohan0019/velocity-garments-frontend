import React from 'react';
import Container from '../Shared/Container';

const Works = () => {
  return (
    <section>
      <Container>
        <div className='p-10 sm:p-25 bg-[#0d656e] rounded-3xl'>
          <h2 className='text-4xl font-extrabold mb-8 text-white text-center'>How it Works</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            <div className='p-8 bg-white rounded-3xl border-2 border-red-400'>
              <img src="https://img.icons8.com/?size=80&id=115625&format=png" alt="" />
              <h3 className='text-xl font-bold mt-6 mb-4'>Buy Our Products</h3>
              <p className='p_color text-base font-medium'>Elevate your wardrobe with our premium garment collection that combines high-quality fabrics and modern styles to ensure you look sophisticated and feel comfortable every single day.</p>
            </div>
            <div className='p-8 bg-white rounded-3xl border-2 border-red-400'>
              <img src="https://img.icons8.com/?size=80&id=axOdKhOwClil&format=png" alt=""/>
              <h3 className='text-xl font-bold mt-6 mb-4'>Cash On Delivery</h3>
              <p className='p_color text-base font-medium'>Shop with total peace of mind and pay only when your order arrives directly at your doorstep — convenient Cash on Delivery is now fully available for all your purchases!</p>
            </div>
            <div className='p-8 bg-white rounded-3xl border-2 border-red-400'>
              <img src="https://img.icons8.com/?size=48&id=lTqd503mNGIS&format=png" alt="" className='my-3 mb-10'/>
              <h3 className='text-xl font-bold mt-6 mb-4'>Pay Online</h3>
              <p className='p_color text-base font-medium'>Paying for your purchases online is incredibly convenient because you can securely use various options like Visa, American Express, or Master cards.</p>
            </div>
            <div className='p-8 bg-white rounded-3xl border-2 border-red-400'>
              <img src="https://img.icons8.com/?size=80&id=mflE0hM25j3i&format=png" alt="" />
              <h3 className='text-xl font-bold mt-6 mb-4'>Become Manager</h3>
              <p className='p_color text-base font-medium'>Join our thriving community of entrepreneurs and start growing your business today by reaching thousands of new customers through our seamless and highly rewarding seller platform.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Works;
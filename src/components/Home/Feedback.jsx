import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import Container from '../Shared/Container';
import { Autoplay } from 'swiper/modules';

const Feedback = () => {


  return (
    <div>
      <Container>
        <h2 className='text-4xl font-semibold mt-20 text-center'>Customer Feedback</h2>
        <div className='my-20 mb-30'>
          <Swiper 
            breakpoints={{
              // mobile (default)
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // tablet
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // desktop
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // large screens
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper">
            <SwiperSlide>
              <div className='bg-orange-200 py-8 px-4 rounded-3xl border '>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://images.ctfassets.net/xjcz23wx147q/iegram9XLv7h3GemB5vUR/0345811de2da23fafc79bd00b8e5f1c6/Max_Rehkopf_200x200.jpeg" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Ramjan Khondoker</h3>
                    <h4 className='text-gray-500'>Senior Web Developer</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Smooth delivery, nice and  polite staff.</p>
                <p className='text-base font-medium'>Ratings: 4.5</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-100 py-8 px-4 rounded-3xl border '>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Rohini Sarkar</h3>
                    <h4 className='text-gray-500'>Analysit</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Took a bit longer than expected, but okay overall.</p>
                <p className='text-base font-medium'>Ratings: 3.9</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-50 py-8 px-4 rounded-3xl border '>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Sheikh Kamal Uddin</h3>
                    <h4 className='text-gray-500'>Graphics Designer</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Excellent service! Fast secure and safe for all.</p>
                <p className='text-base font-medium'>Ratings: 5.0</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-100 py-8 px-4 rounded-3xl border '>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Ashiq Islam</h3>
                    <h4 className='text-gray-500'>Data Expert</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Very responsive and professional. Good payment gateway.</p>
                <p className='text-base font-medium'>Ratings: 4.6</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-orange-200 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnwwGnyaiID3n4cthRXUosUwlu5M9YEz_zTd5sT83pTQ&s" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Shilpa Ayra</h3>
                    <h4 className='text-gray-500'>UI UX Designer</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Late delivery and no updates. Disappointed.</p>
                <p className='text-base font-medium'>Ratings: 3.4</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-100 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbVWmQTs-1egrctChK-1G8aGCrnxK-4cq3DA&s" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Fakir Khan</h3>
                    <h4 className='text-gray-500'>Manager, AB Group</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Superb user friendly experience! Highly recommended.</p>
                <p className='text-base font-medium'>Ratings: 4.9</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-50 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Isha Haque</h3>
                    <h4 className='text-gray-500'>Digital Marketer</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Decent service but packaging could be better.</p>
                <p className='text-base font-medium'>Ratings: 4.3</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-100 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhgPAXe15FCWP1Zwd9XFvt4gTcwpu_BuXlg&s" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Emma Watson</h3>
                    <h4 className='text-gray-500'>Creative</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Fast, safe, and friendly delivery service.</p>
                <p className='text-base font-medium'>Ratings: 4.7</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-orange-200 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzm597Yhz7GQC1M4pQMsLQy5IhOFQ2Apy6wA&s" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Badrul Uddin</h3>
                    <h4 className='text-gray-500'>Freelancer</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Nice website design. And everything is perfect</p>
                <p className='text-base font-medium'>Ratings: 4.9</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-100 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://imilap.com/profileimages/profile_IMG_20170716_212342.jpg" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Jamal Rahman</h3>
                    <h4 className='text-gray-500'>Web Design</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Took a bit longer than expected, but all are functional.</p>
                <p className='text-base font-medium'>Ratings: 4.5</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='bg-amber-50 py-8 px-4 rounded-3xl border'>
                <span className='flex mx-auto bg-linear-to-b from-[#EFEEFC] to-white w-fit rounded-full'>
                  <img className='p-2 w-16 h-16' src="https://img.icons8.com/?size=80&id=GImnXL4RRlTA&format=png" alt="" />
                </span>
                <div className='mt-3 flex flex-row gap-8'>
                  <img className='w-14 h-14' src="https://miro.medium.com/1*Ss70nvjqEXusREvoyutFuA.jpeg" alt="" />
                  <div className="h-15 w-px bg-gray-500"></div>
                  <div>
                    <h3 className='font-semibold'>Parsa Eva</h3>
                    <h4 className='text-gray-500'>Actress</h4>
                  </div>
                </div>
                <p className='text-lg font-medium p_color my-4'>Smooth delivery. Nice packaging and overall all fine.</p>
                <p className='text-base font-medium'>Ratings: 4.3</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Feedback;
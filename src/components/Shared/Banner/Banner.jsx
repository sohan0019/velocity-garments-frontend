import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../../assets/images/img4.avif"
import image2 from "../../../assets/images/img6.webp"
import image3 from "../../../assets/images/img2.jpg"
import image4 from "../../../assets/images/img3.jpg"
import image5 from "../../../assets/images/img1.webp"
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import Container from '../Container';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <section className='pb-6'>
      <Container>
        <Carousel autoPlay={true} infiniteLoop={true}>
          {[image1, image2, image3, image4, image5].map((img, index) => (
            <div key={index} className="relative h-125 md:h-150">

              {/* Image */}
              <img
                src={img}
                className="h-full w-full object-cover"
                alt="banner"
              />

              {/* Buttons */}
              <div className="absolute bottom-20 left-10">
                <div className="relative text-left max-w-2xl">
                  <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent rounded-xl" />

                  <div className="relative p-6 text-white">
                    <h1 className="text-3xl md:text-7xl font-bold [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000] mb-6">Textiles beyond <br /> the surface</h1>

                    <p className="text-green-200 text-xs md:text-base">Woven with precision and patience, Looma creates fabrics that embody quiet luxury
                      <br /> — where craftsmanship meets timeless design.</p>
                  </div>

                </div>

                <div className='flex flex-col sm:flex-row w-fit mt-6'>
                  <button className="btn bg-amber-200 border-2 border-black text-xl font-bold text-black px-6 py-4 rounded-2xl hover:bg-white">
                    <Link to="/products">View All Products</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Banner;
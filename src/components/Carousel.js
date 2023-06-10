import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Carousel = () => {
  const slides = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image1.jpg',
  ];

  return (
    <Wrapper>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={index} virtualIndex={index} className='slide'>
            <img src={slideContent} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .slide {
    width: 100vw;
    height: 400px;
    display: block;
  }
`;

export default Carousel;

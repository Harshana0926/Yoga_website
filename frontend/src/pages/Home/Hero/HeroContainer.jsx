import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative, Autoplay } from 'swiper'; // Import Autoplay
import Hero from './Hero';
import Hero2 from './Hero2';

const HeroContainer = () => {
  return (
    <section>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-120%', 0, -500],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500], // Use different translate for next
          },
        }}
        modules={[EffectCreative, Autoplay]} // Include Autoplay module
        className='mySwiper5'
        loop={true}
        autoplay={{
          delay: 25000, // Increase delay to 2500ms (2.5 seconds)
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>

        <SwiperSlide>
          <Hero2 />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroContainer;

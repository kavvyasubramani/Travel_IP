"use client";
import { FEATURE } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";

const Feature = () => {

  const NextArrow = (props: any) => {
    const{onClick} = props;
    return (
      <div onClick={onClick} className="bg-white text-2xl p-3 inline-black rounded-lg shadow-md absolute top-1/2 right-0 lg:-top-24 lg:right-4 z-10 ring-1 ring-slate-900/5 hover:bg-primary">
        <RiArrowRightSLine />
      </div>
    )
  };
  const PrevArrow = (props: any) => {
    const{onClick} = props;
    return (
      <div onClick={onClick} className="bg-white text-2xl p-3 inline-black rounded-lg shadow-md absolute top-1/2 lg:-top-24 lg:right-20 z-10 ring-1 ring-slate-900/5 hover:bg-primary">
        <RiArrowLeftSLine />
      </div>
    )
  };

  var settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ]
  }

  return (
    <section className="max_padd_container py-20 xl:py-32 bg-white" id="feature">
        <div className="w-[90%] m-auto">
            <div className="mx-4">
                <h4 className="bold-18 text-secondary">What We Offer</h4>
                <h3 className="h3 max-w-lg">Discover the Best Destinations</h3>
                <p className="max-w-lg">Explore breathtaking locations with personalized travel experiences. Whether you're looking for serene beaches, vibrant cities, or adventurous escapes, we curate the best destinations to make your journey unforgettable!</p>
            </div>
            {/* container */}
            <div className="pt-12">
              <Slider {...settings}>
                {FEATURE.map((feature) => (
                  <FeatureItem
                  key={feature.URL}
                  URL={feature.URL}
                  title={feature.title}
                  des={feature.des}
                  />
                ))}
              </Slider>
            </div>
        </div>
    </section>
  )
}

type FeatureItem = {
  URL: string;
  title: string;
  des: string;
}

const FeatureItem = ({ title, URL, des }: FeatureItem) => {
  return (
    <div className="mx-4 overflow-hidden group">
      <Link href="/" className="overflow-hidden relative">
        <div>
          <Image 
            src={URL} 
            alt="Img" 
            height={600} 
            width={510} 
            className="hover:scale-105 transition-all duration-700 overflow-hidden"
          />
        </div>
        <h4 className="capitalize regular-22 absolute top-6 left-4 text-white">{title}</h4>
        <p className="regular-18 absolute bottom-6 right-0 bg-tertiary text-white px-4 py-2 rounded-l-full group-hover:bg-secondary group-hover:!pr-8 transition-all duration-100">{des}</p>
      </Link>
    </div>
  )
}

export default Feature
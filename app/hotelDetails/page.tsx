import Header from "@/components/hotelDetails/Header";
import BookingForm from "@/components/hotelDetails/BookingForm";
import HotelGallery from "@/components/hotelDetails/HotelGallery";
import HotelDescription from "@/components/hotelDetails/HotelDescription";
import ViewMore from "@/components/hotelDetails/ViewMore";
import Nearby from "@/components/hotelDetails/Nearby";
import { Suspense } from "react";

const HotelDetails = () => {
  return (
    <div>
      <Header />
      <BookingForm />
      <Suspense fallback={<div>Loading hotel gallery...</div>}>
      <HotelGallery />
    </Suspense>
      <HotelDescription />
      <ViewMore />
      <Suspense fallback={<div>Loading nearby information...</div>}>
      <Nearby />
    </Suspense>
    </div>
  );
};

export default HotelDetails;

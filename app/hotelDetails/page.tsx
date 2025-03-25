import Header from "@/components/hotelDetails/Header";
import BookingForm from "@/components/hotelDetails/BookingForm";
import HotelGallery from "@/components/hotelDetails/HotelGallery";
import HotelDescription from "@/components/hotelDetails/HotelDescription";
import ViewMore from "@/components/hotelDetails/ViewMore";
import Nearby from "@/components/hotelDetails/Nearby";

const HotelDetails = () => {
  return (
    <div>
      <Header />
      <BookingForm />
      <HotelGallery />
      <HotelDescription />
      <ViewMore />
      <Nearby />
    </div>
  );
};

export default HotelDetails;

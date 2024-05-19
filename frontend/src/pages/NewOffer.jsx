import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import OrderDetails from "./../components/OrderDetails/OrderDetails.jsx";
import FlightForm from "./../components/FlightForm/FlightForm.jsx";

export default function NewOffer() {
  return (
    <div className="">
      <NavBar></NavBar>
      <main className=" p-5 mb-10  min-h-screen max-md:pr-32 ">
        <FlightForm></FlightForm>
      </main>
      <Footer></Footer>
    </div>
  );
}

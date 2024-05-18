import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import OrderDetails from "./../components/OrderDetails/OrderDetails.jsx";
export default function NewOffer() {
  
  return (
    <div className="    ">
      <NavBar></NavBar>
      <main className=" p-5 mb-10  min-h-screen max-md:pr-32 ">
        <OrderDetails></OrderDetails>
      </main>
      <Footer></Footer>
    </div>
  );
}

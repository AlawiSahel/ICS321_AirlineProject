import NavBar from "../components/nav/NavBar";
import Footer from "./../components/footer/Footer.jsx";
import CommentsSection from "../components/CommentSection/CommentSection.jsx";
import SellerHeader from "./../components/sellerHeader/SellerHeader.jsx";
import HorizontalBookSlider from "../components/HorizontalBookSlider/HorizontalBookSlider.jsx";
import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

function Seller() {
  const [searchParams] = useSearchParams();
  const sellerUsername = searchParams.get("username");

  const [sellerInfo, setSellerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users/getUserInfo?username=${sellerUsername}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const sellerData = await response.json();
        setSellerInfo(sellerData.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSellerInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerInfo();
  }, [sellerUsername]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(sellerInfo);

  return (
    <>
      <NavBar />

      <main className="flex  flex-col min-h-screen  m-10 space-y-10 mb-40 ">
        <SellerHeader seller={sellerInfo} />
        <div>
          <h1 className="text-3xl font-bold mb-4 text-primary">All Offers</h1>
          <HorizontalBookSlider user={sellerUsername}></HorizontalBookSlider>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-primary">All Comments</h1>
          <CommentsSection seller={sellerInfo}></CommentsSection>
        </div>
      </main>

      <Footer> </Footer>
    </>
  );
}

export default Seller;

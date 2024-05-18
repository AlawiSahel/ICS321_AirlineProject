import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="flex flex-col  ">
        <footer
          style={{
            borderTop: "1px solid rgba(83, 55, 55,0.2)",
            color: "#533737",
          }}
          className="bg-offWhite  mt-auto p-4"
        >
          <div className="flex  justify-center items-center gap-4 max-sm:flex-col">
            <div>© 2024 Rofouf. All rights reserved</div>

            <div className="flex gap-2 rounded-xl p-2 bg-lightBrown50">
              <div>
                <FaInstagram className="w-8 h-8 text-pink-500" />
              </div>
              <div>
                <FaFacebook className="w-8 h-8  text-blue-400" />
              </div>
              <div>
                <FaXTwitter className="h-8 w-8" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;

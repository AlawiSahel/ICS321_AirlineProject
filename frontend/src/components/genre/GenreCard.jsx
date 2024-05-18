import { useNavigate } from "react-router-dom";

function GenreCard({ name, value, children }) {
  const navigate = useNavigate(); // Instantiate the navigate function

  return (
    <>
      <div
        onClick={() => navigate(`/genre?genre=${value}`)} // Update the onClick handler
        className="rounded-md bg-secondaryColor text-center gap-2 w-32 h-32 flex flex-col items-center justify-center text-primary shadow-2xl hover:bg-primary hover:text-white"
      >
        {children}
        <div className="font-bold">{name}</div>
      </div>
    </>
  );
}

export default GenreCard;

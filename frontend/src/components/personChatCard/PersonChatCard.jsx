function PersonChatCard() {
  return (
    <>
      <div className="bg-gray-300 text-white  h-18 py-2 px-2 rounded-xl ">
        <div className="flex gap-2 max-sm:flex-col max-sm:items-center">
          <img
            className="w-10 h-10 rounded-full"
            src="\src\assets\person.png"
            alt=""
          />
          <div className="flex flex-col gap-5">
            <div className="flex-1 text-center text-black text-xl font-bold max-sm:text-sm max-w-20 min-w-20 max-sm:line-clamp-1">name</div>
            <div className="text-black text-opacity-40 line-clamp-1 max-sm:hidden">
              the content of the last message
            </div>
          </div>

          <div className="flex  text-black text-opacity-40 max-sm:hidden">now</div>
          
        </div>
      </div>
    </>
  );
}

export default PersonChatCard;

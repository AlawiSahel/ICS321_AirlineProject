function ChatMessage({ messageSide, message}) {
  return (
    <>
      {messageSide == "me" ? (
        <div className="flex flex-row justify-end my-8">
          <div>
            <div className="w-40  bg-white text-black rounded-md p-4 break-words shadow-2xl">
              {message}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-start">
          <div>
            <div className="w-40  bg-primary text-white rounded-md p-4 break-words shadow-2xl">
              {message}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;

function Massage() {
  return (
    <>
      <div className="bg-backGround p-4 rounded-md flex gap-10 text-primary items-center">
        <div className="flex flex-col justify-center items-center">
          <div>
            <img
              className="w-9 h-8 rounded-full"
              src="src\assets\profile.png"
              alt=""
            />
          </div>
          <div>Name</div>
        </div>
        <div className="flex-grow min-h-0 overflow-y-auto overflow-x-hidden">
          This book is exciting I finished 20 pages so far and it is fun!
        </div>
      </div>
    </>
  );
}

export default Massage;

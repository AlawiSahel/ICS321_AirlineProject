import "./dropDownStyle.css";

function DropdownMenu({names = "other"}) {
  return (
    <div className=" dropdown-menu transition-all duration-200 ease-linear border-2 absolute top-12 rounded-md">
      <div className="dropdownItem-boder bg-black p-4 w-20 hover:bg-orange-200">
        <a href="/">{names[0]}</a>
      </div>
      <div className="dropdownItem-boder bg-black p-4 w-20 hover:bg-orange-200">
      <a href="/profile">{names[1]}</a>
      </div>
    </div>
  );
}

export default DropdownMenu;

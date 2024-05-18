import "./style.css";

function DropDownMenu({names = "other"}) {
  return (
    <div id="box" className="bg-white border-0 dropdown-menu transition-all duration-200 ease-linear border-2 absolute top-12 rounded-md shadow-2xl">
      <div className="dropdownItem-boder rounded-md border-0 p-4 w-20 hover:bg-orange-200">
        <a href="/SignIn">{names[0]}</a>
      </div>
      <div className="dropdownItem-boder border-0 p-4 w-20 hover:bg-orange-200">
      <a href="/profile">{names[1]}</a>
      </div>
    </div>
  );
}

export default DropDownMenu;

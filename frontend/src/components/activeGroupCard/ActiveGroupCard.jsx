import "./style.css";

function ActiveGroupCard() {
  return (
    <>
      <div className="card p-4 m-4">
        <div>
          <a href="">
            <img className="object-cover w-full  rounded-3xl h-80" src="\src\assets\group.jpg" alt="" />
          </a>
        </div>

        <p className="GroupTitle">Novels Group</p>
        <div className="line"></div>
        <p className="content">
          This is the group we know you ve all waiting for. We present the top 1
        </p>
      </div>
    </>
  );
}

export default ActiveGroupCard;

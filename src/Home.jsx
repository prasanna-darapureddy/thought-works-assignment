import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [blogsList, setBlogsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [status, setStatus] = useState("");

  const getBlogsData = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const options = { method: "GET" };
    try {
      setStatus("pending");
      const response = await fetch(url, options);
      const data = await response.json();
      setBlogsList(data);
      setFilteredList(data);
      setStatus("success");
    } catch (error) {
      setStatus(error ?? "Somthing Went Wrong");
      setStatus("failed");
    }
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  const handleSearch = (event) => {
    const updatedList =
      blogsList.length > 0 &&
      blogsList?.filter((each) =>
        each.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    setFilteredList(updatedList);
  };
  console.log(filteredList);

  const renderLoadingView = () => (
    <div className="loading-container">
      <p className="loading-text">Loading...</p>
    </div>
  );

  const renderFailedView = () => (
    <div className="loading-container">
      <p className="failed-text">!Oops Somthing Went Wrong</p>
    </div>
  );

  const renderSuccessView = () => (
    <ul className="blogs-container">
      {blogsList?.length > 0 ? (
        <>
          {filteredList.map((eachBlog, index) => (
            <li className="each-blog" key={index + "blog"}>
              <h4 className="title">{eachBlog.title}</h4>
              <p>{eachBlog.body}</p>
            </li>
          ))}
        </>
      ) : (
        <div className="loading-container">
          <p className="failed-text">No Blogs Yet</p>
        </div>
      )}
    </ul>
  );

  const renderBlogsUI = () => {
    switch (status) {
      case "pending":
        return renderLoadingView();
      case "failed":
        return renderFailedView();
      case "success":
        return renderSuccessView();
      default:
        return renderSuccessView();
    }
  };

  return (
    <div className="bg-container">
      <h1>Blogs Content</h1>
      <input
        type="search"
        onChange={handleSearch}
        placeholder="Search here..."
        className="user-input"
      />
      <div>{renderBlogsUI()}</div>
    </div>
  );
};
export default Home;

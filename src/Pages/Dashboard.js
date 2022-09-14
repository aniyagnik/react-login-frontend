import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../component/Table";

const Dashboard = () => {
 // data state to store the TV Maze API data. Its initial value is an empty array
 const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
   (async () => {
          const NEWS_URL =
          "https://newsapi.org/v2/everything?" +
          "q=Apple&" +
          "from=2022-09-14&" +
          "sortBy=popularity&" +
          "apiKey=dae44bae76c94726b2514cf582225e7f";
     const result = await axios(NEWS_URL);
     console.log("result")
     const requiredData = result.data.articles.map((obj)=>{
      const new0bj={
        title:obj.title,
        image:<img className="news-image" src={obj.urlToImage} alt={obj.title}/>,
        source:obj.source.name,
        link: <button className="btn-news" onClick={window.open(obj.url,'_blank')}>view</button>
      }
      return new0bj;
     })
     console.log(requiredData)
     setData(requiredData)
   })();
  }, []);

    const columns = [
      {
        Header: "TOP HEADLINES",
        columns: [
          {
            Header: "Image",
            accessor: "image"
          },
          {
            Header: "Source",
            accessor: "source"
          }
          ,
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Link",
            accessor: "link"
          }
        ]
      }
    ]
  
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Dashboard;
  // // data state to store the TV Maze API data. Its initial value is an empty array
  // const [data, setData] = useState([]);

  // // Using useEffect to call the API once mounted and set the data
  // useEffect(() => {
  //   // instantanous func.
  //   (async () => {
  //     try {
  //       const NEWS_URL =
  //         "https://newsapi.org/v2/everything?" +
  //         "q=Apple&" +
  //         "from=2022-09-14&" +
  //         "sortBy=popularity&" +
  //         "apiKey=dae44bae76c94726b2514cf582225e7f";
  //       const result = await axios(NEWS_URL);
  //       setData(result.data);
  //       console.log(JSON.stringify(result));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // },[]);

  // const columns = [
  //   {
  //     Header: "Name",
  //     accessor: "name",
  //   },
  //   {
  //     Header: "Age",
  //     accessor: "age",
  //   },
  // ];

  
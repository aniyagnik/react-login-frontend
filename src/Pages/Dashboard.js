import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../component/Table";
import LoadingScreen from "../component/LoadingScreen";
import { BASE_URL } from "../constant/constants"

const Dashboard = () => {
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      const NEWS_URL =BASE_URL+"/users/apiNews"
      try {
        const result = await axios.get(NEWS_URL);
        // console.log(result.data);
        const requiredData = result.data.map((obj) => {
          const new0bj = {
            title: obj.title,
            image: (
              <img
                className="news-image"
                src={obj.urlToImage}
                alt={obj.title}
              />
            ),
            source: obj.source.name,
            link: (
              <form target="_blank" action={obj.url}>
                <button className="btn-news">view</button>
              </form>
            ),
          };
          return new0bj;
        });
        setData(requiredData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const columns = [
    {
      Header: "TOP HEADLINES",
      columns: [
        {
          Header: "Image",
          accessor: "image",
        },
        {
          Header: "Source",
          accessor: "source",
        },
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Link",
          accessor: "link",
        },
      ],
    },
  ];

  return (
    <div>
      {isLoading ? <LoadingScreen /> : <Table columns={columns} data={data} />}
    </div>
  );
};

export default Dashboard;

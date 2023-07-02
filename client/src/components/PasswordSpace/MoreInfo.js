import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MoreInfo = (props) => {
  const [moreInfo, setMoreInfo] = useState('');

  const {id} = useParams();
//   const { passId } = useParams(); // Use `id` instead of `passId`
  console.log("MY PROPS ID:", id);

  const ShowMoreInfo = async () => {
    try {
      const res = await fetch(`http://localhost:5000/password/additionalInfo/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });

      const data = await res.json();

      if (res.status === 404 || res.status === 500) {
        console.log(res.status);
        console.log(data);
      } else if (res.status === 200) {
        setMoreInfo(data.additionalinfo);
        console.log("Info displayed");
        console.log(res.status);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ShowMoreInfo();
  });

  return (
    <>
      {moreInfo}
    </>
  );
};

export default MoreInfo;

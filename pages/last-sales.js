import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage() {
  const [sales, setSales] = useState();
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-udemy-d4ce5-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  /*   useEffect(() => {
    setIsLoading(true);
    // .json -- firebase requirement
    fetch("https://nextjs-udemy-d4ce5-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
      });

    setSales(transformedSales);
    setIsLoading(false);
  }, []); */

  /*  if (isLoading) {
    return <p>Loading...</p>;
  } */

  /*   if (!sales) {
      return <p>No data yet</p>;
    } */

  if (error) {
    return <p>Failed to load data</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((item) => (
        <li key={item.id}>
          {item.username} - ${item.volume}
        </li>
      ))}
    </ul>
  );
}

import React, { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// to tell nextjs that the page should be pre-generated 3 times
// nextjs will then call getStaticProps() to get all ids
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    /*   paths: [
      { params: { pid: "p1" } },

      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ], */
    fallback: true,
    /* when there are a lot of pages (like amazon)
    w/ fallback: true we will pre-generate most visited pages
    and generate all other pages on client request only, */
    // fallback: 'blocking',
    // w/ fallback blocking no need to add Loading... (lines 45-47)
  };
}

export default function ProductDetailsPage(props) {
  const { loadedProduct } = props;

  // like useEffect() in React, we add Loading the time the page is charged
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

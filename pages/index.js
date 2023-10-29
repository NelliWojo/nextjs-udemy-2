import fs from "fs/promises";
import Link from "next/link";
import path from "path";

export async function getStaticProps() {
  console.log("");
  // cwd : current working directory / here: we want to starmt in our dir 'next-udemy-2'
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // only matters in production
    revalidate: 10,
  };
}

export default function Home(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

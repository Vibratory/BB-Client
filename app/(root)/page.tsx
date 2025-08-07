import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/actions/actions";
import Image from "next/image";

type GroupedColls = Record<string, { title: string; products: ProductType[] }>;

const getRandomProducts = (products: ProductType[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
export const dynamic = "force-dynamic"; // SSR, no cache


export default async function Home() {

  const products = await getProducts();

  const visibleProducts = products?.filter((product: ProductType) => !product.hidden) || [];



  const productsByColl: GroupedColls = {};

  products?.forEach((product: ProductType) => {
    const colls = product.colls ?? [];

    colls.forEach((coll) => {
      if (!coll?._id) return;

      if (!productsByColl[coll._id]) {
        productsByColl[coll._id] = {
          title: coll.title,
          products: [],
        };
      }

      productsByColl[coll._id].products.push(product);
    });
  });



  const sale = visibleProducts?.filter((product: ProductType) => product.solde) || [];

  const randomProducts = getRandomProducts(visibleProducts, 8);




  return (
    <>
      <Image src="/last.png" alt="banner" width={2000} height={1000} className="block max-md:hidden  object-contain md:object-cover md:mb-10  " />
      {/**for small screens */}
      <Image src="/last1.png" alt="banner" width={2000} height={1000} className="block md:hidden object-contain mb-10 " />

      <div>
        <Collections />
        {/** Best Seller */}
        <ProductList
          title={"Meilleures ventes"}
          products={randomProducts} />
        {/** Sale */}
        <ProductList
          title={"% Solde %"}
          products={sale} />

          
        {/** custom array from database for collections or
         *  any selection admin wants on front page under sale like summer colection
         *  or a brands collection or newborns birthday ..etc */}

        {Object.values(productsByColl).map((group) => (
          <ProductList
            key={group.title} // or use an id if available
            title={group.title}
            products={group.products}
          />
        ))}










      </div>

    </>
  );
}



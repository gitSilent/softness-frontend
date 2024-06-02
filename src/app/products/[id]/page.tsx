import { getProducts } from "@/api/requests";
import ProductPageComponent from "@/components/page_components/ProductPageComponent";


export default async function ProductPage({ params }: { params: { id: string } }) {
  // let productsData = await getProducts()
  console.log(params.id);
  
  return (
    <ProductPageComponent pk={params.id}/>
  );
}

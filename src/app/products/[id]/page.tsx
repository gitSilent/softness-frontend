import { getProducts } from "@/api/requests";
import ProductPageComponent from "@/components/page_components/ProductPageComponent";


export default async function ProductPage() {
  // let productsData = await getProducts()
  return (
    <ProductPageComponent/>
  );
}

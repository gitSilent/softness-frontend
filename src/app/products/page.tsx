import { getProducts, getProductsNonAuth } from "@/api/requests";
import ProductsPageComponent from "@/components/page_components/ProductsPageComponent";

export default async function ProductsPage() {
  // window.document
  // let productsData = await getProductsNonAuth()

  return (
    <ProductsPageComponent/>
  );
}

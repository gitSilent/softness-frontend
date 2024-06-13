import { getProducts, getProductsNonAuth } from "@/api/requests";
import ProductsPageComponent from "@/components/page_components/ProductsPageComponent";

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {

  return (
    <ProductsPageComponent/>
  );
}

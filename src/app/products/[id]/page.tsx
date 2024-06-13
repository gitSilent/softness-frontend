import { getProducts } from "@/api/requests";
import ProductPageComponent from "@/components/page_components/ProductPageComponent";


export const dynamic = 'force-dynamic'


export default async function ProductPage({ params }: { params: { id: string } }) {
  
  return (
    <ProductPageComponent pk={params.id}/>
  );
}

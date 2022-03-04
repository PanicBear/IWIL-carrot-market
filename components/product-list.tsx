import { Layout, Item } from '@components/index';
import { ProductWithCount } from '@customTypes/index';
import useSWR from 'swr';

interface ProductListProds {
  kind: 'favs' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProds) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data.sales?.map((record) => (
        <Item
          key={record.id}
          id={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
          comments={0}
        />
      ))}
    </>
  ) : null;
}

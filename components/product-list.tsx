import { Product } from '.prisma/client';
import { Item } from '@components/index';
import { ProductWithCount } from '@customTypes/index';
import useSWR from 'swr';

interface ProductListProps {
  kind: 'favs' | 'sales' | 'purchases';
}

interface Record extends Product {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
          imageUrl={record.product.imageUrl}
          comments={0}
        />
      ))}
    </>
  ) : null;
}

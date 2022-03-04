import { Item, Layout } from '@components/index';
import { ProductWithCount } from '@customTypes/index';
import type { NextPage } from 'next';
import useSWR from 'swr';

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<ProductListResponse>('/api/users/me/sales');
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        {data?.sales?.map((record) => (
          <Item
            key={record.id}
            id={record.id}
            title={record.product.name}
            price={record.product.price}
            hearts={record.product._count.favs}
            comments={0}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;

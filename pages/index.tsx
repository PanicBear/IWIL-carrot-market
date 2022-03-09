import { FloatingButton, Item, Layout } from '@components/index';
import { ProductWithCount } from '@customTypes/index';
import { useUser } from '@libs/client/index';
import type { NextPage } from 'next';
import useSWR from 'swr';

interface ProductResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductResponse>('/api/products');

  console.log(data);

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-1 py-2 divide-y">
        {data?.products?.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count.favs}
            imageUrl={product.imageUrl}
            comments={1}
          />
        ))}
        <FloatingButton href={'/products/upload'}>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;

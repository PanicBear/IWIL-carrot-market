import type { NextPage } from 'next';
import { Layout, Item } from '@components/index';

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item key={i} id={i} title={'iPhone 14'} price={99} hearts={1} comments={1} />
        ))}
      </div>
    </Layout>
  );
};

export default Bought;

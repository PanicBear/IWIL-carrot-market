import type { NextPage } from 'next';
import { Button, Input, Layout, TextArea } from '@components/index';

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className="space-y-4 py-10 px-4">
        <Input name="name" label="Name" required />
        <Input name="price" label="Price" placeholder="10000" kind="price" required />
        <TextArea name="description" label="Description" />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;

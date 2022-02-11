import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className="space-y-4 py-10 px-4">
        <Input name="name" label="Name" required />
        <Input
          name="price"
          label="Price"
          placeholder="10000"
          kind="price"
          required
        />
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
            rows={4}
          />
        </div>
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;

import type { NextPage } from "next";
import Button from "../../components/button";

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <textarea
        className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
        rows={4}
        placeholder="Ask a question!"
      />
      <Button>Submit</Button>
    </form>
  );
};

export default Write;

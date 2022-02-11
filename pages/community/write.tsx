import type { NextPage } from "next";
import Button from "../../components/button";
import TextArea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <TextArea placeholder="Ask a question!" required />
      <Button text="Submit" />
    </form>
  );
};

export default Write;

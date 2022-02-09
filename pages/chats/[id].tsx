import type { NextPage } from 'next';

const ChatDetail: NextPage = () => {
  return (
    <div className="py-10 px-4">
      <div>
        <div />
        <div>Hi how much are you selling them for?</div>
      </div>
      <div>
        <div />
        <div>I want ₩20,000</div>
      </div>
      <div>
        <div />
        <div>너무 비싸요</div>
      </div>
      <div>
        <div>
          <input type="text" />
          <div>
            <span>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;

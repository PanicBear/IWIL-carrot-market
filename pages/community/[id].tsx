import { NextPage } from 'next';

const CommunityPostDetail: NextPage = () => {
  return (
    <div>
      <div>
        <div />
        <div>
          <p>Steve Jebs</p>
          <p>2 시간 전</p>
          <p>The best mandu restaurant is the one next to my house.</p>
        </div>
      </div>
      <div>
        <textarea rows={4}></textarea>
        <button>Reply</button>
      </div>
    </div>
  );
};

export default CommunityPostDetail;

import React, { useState, useCallback, useEffect } from 'react';
function Comment({
  comment,
  showReplyInput,
  setShowReplyInput,
  deleteComment,
  handleToggleReplyInput,
  userInfo,
}) {
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [replyId, setReplyId] = useState(0);
  const admin = localStorage.getItem('admin');
  let signedUserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  let signedIn = localStorage.getItem('user') ?? false;
  useEffect(() => {
    const repliesFromLocalStorage = JSON.parse(
      localStorage.getItem(`replies-${comment.id}-${window.location.pathname}`)
    );
    if (repliesFromLocalStorage) {
      setReplies(repliesFromLocalStorage);
    }
    console.log(window.location.pathname);
  }, []);
  let games = localStorage.getItem('items')
  console.log(comment);
  useEffect(() => {
    localStorage.setItem(
      `replies-${comment.id}-${window.location.pathname}`,
      JSON.stringify(replies)
    );
    console.log('signedUserInfo.email:', signedUserInfo.email);
    console.log('admin:', admin);
    console.log(admin === signedUserInfo.email);
  }, [replies, comment.id]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      let id = replyId;
      if (reply.length === 0) return;
      setReplies([...replies, { replyId: id, reply: reply }]);
      setReply('');
      setReplyId((prev) => prev + 1);
    },
    [replies, reply]
  );

  return (
    <div className="py-4 mt-5 bg-gray-300 rounded-lg shadow-md ">
      <span className="font-serif font-size-6 px-2">
        Posted by {userInfo.email}
      </span>
      <p className="flex justify-center text-white font-medium bg-blue-500 px-13 py-5 rounded-lg mb-4 mt-7">
        {/* {games.comments.map(comment => (
          <div className='font-40'>{comment}</div>
        ))} */}
        {comment.text}
      </p>
      {signedUserInfo.email === admin && signedIn ? (
        <div className="flex flex-col justify-center items-center">
          <button
            className="bg-gray-400 rounded p-2 ml-2"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      ) : null}
      {replies.map((reply, index) => (
        <div
          key={reply.replyId}
          className="flex flex-col p-4 bg-gray-200 rounded-lg shadow-sm mt-4 w-full"
        >
          <p className=" text-gray-700 font-medium mb-2 w-80">
            Reply from
            <span className="font-serif font-size-6 px-2">
              {userInfo.email}
            </span>
          </p>

          <p
            key={index}
            className="text-gray-500 pl-4 font-medium font-size-1.2rem px-13"
          >
            {reply.reply}
          </p>
        </div>
      ))}

      {showReplyInput && (
        <form onSubmit={handleSubmit} className="mb-4 py-5">
          <div>
            <input
              required
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            />
            <div className='flex items-end justify-end px-5'>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 bg-gray-400 rounded p-2 ml-2"
              >
              Post
            </button>
              </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Comment;

import React, { useState, useCallback, useEffect } from 'react';
function Comment({
  comment,
  showReplyInput,
  setShowReplyInput,
  deleteComment,
  handleToggleReplyInput,
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
      setReplies([...replies, { replyId: id, reply: reply }]);
      setReply('');
      setReplyId((prev) => prev + 1);
    },
    [replies, reply]
  );

  return (
    <div className="py-4 mt-5 bg-gray-300 rounded-lg shadow-md  ">
      <p className="flex justify-center text-white font-medium bg-blue-500 p-4 rounded-lg mb-4 mt-7">
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
          <p className="text-gray-700 font-medium mb-2 w-80">Reply:</p>
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
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 bg-gray-400 rounded p-2 ml-2"
            >
              Submit Your Reply
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Comment;

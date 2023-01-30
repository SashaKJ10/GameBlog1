import React, { useState, useCallback, useEffect } from 'react';
function Comment({ comment, showReplyInput, setShowReplyInput }) {
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    const repliesFromLocalStorage = JSON.parse(
      localStorage.getItem(`replies-${comment.id}-${window.location.pathname}`)
    );
    if (repliesFromLocalStorage) {
      setReplies(repliesFromLocalStorage);
    }
    console.log(window.location.pathname);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `replies-${comment.id}-${window.location.pathname}`,
      JSON.stringify(replies)
    );
  }, [replies, comment.id]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setReplies([...replies, reply]);
      setReply('');
      setShowReplyInput(false);
    },
    [replies, reply]
  );

  return (
    <div classNme="p-4 bg-gray-300 rounded-lg shadow-md">
      <p className="text-gray-700 font-medium mb-2">Comment:</p>
      <p className="text-gray-700 text-xl mb-4">{comment.text}</p>
      {replies.map((reply, index) => (
        <div
          key={Date.now()}
          className="p-4 bg-gray-200 rounded-lg shadow-sm mt-4"
        >
          <p className="text-gray-700 font-medium mb-2">Reply:</p>
          <p key={index} className="text-gray-500 pl-4">
            {reply}
          </p>
        </div>
      ))}

      {showReplyInput && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            className="border border-gray-400 rounded p-2 mb-2"
          />
          <button type="submit" className="bg-gray-400 rounded p-2 ml-2">
            Submit Reply
          </button>
        </form>
      )}
    </div>
  );
}

export default Comment;
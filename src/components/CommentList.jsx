import Comment from './Comment';
import React, { useState, useEffect, useCallback } from 'react';

function CommentList() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [showReplyInputs, setShowReplyInputs] = useState({});

  useEffect(() => {
    const commentsFromLocalStorage = JSON.parse(
      localStorage.getItem(`comments-${window.location.pathname}`)
    );
    if (commentsFromLocalStorage) {
      setComments(commentsFromLocalStorage);
      setCommentId(commentsFromLocalStorage.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `comments-${window.location.pathname}`,
      JSON.stringify(comments)
    );
  }, [comments]);

  const handleCommentSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setComments([...comments, { id: commentId, text: commentText }]);
      setCommentText('');
      setCommentId(commentId + 1);
    },
    [comments, commentText, commentId]
  );

  const handleToggleReplyInput = useCallback(
    (commentId) => {
      setShowReplyInputs((prevShowReplyInputs) => ({
        ...prevShowReplyInputs,
        [commentId]: !prevShowReplyInputs[commentId],
      }));
    },
    [setShowReplyInputs]
  );

  // function deleteComment(id) {
  //   const newComments = comments.filter((comment) => comment.id !== id);
  //   setComments(newComments);

  // }
  return (
    <div className="p-4">
      <form onSubmit={handleCommentSubmit}>
        <div className="flex gap-2">
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={commentText}
            placeholder="Add a comment..."
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button
            className="flex flex-row bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            key={comment.id}
            comment={comment}
            showReplyInput={showReplyInputs[comment.id] || false}
            deleteComment={deleteComment}
          />
          <button
            onClick={() => handleToggleReplyInput(comment.id)}
            className="bg-gray-400 rounded p-2 ml-2"
          >
            Reply
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;

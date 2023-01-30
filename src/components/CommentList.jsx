import Comment from './Comment';
import React, { useState, useEffect, useCallback } from 'react';

function CommentList() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [showReplyInput, setShowReplyInput] = useState(false);

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

  return (
    <div className="p-4">
      <form onSubmit={handleCommentSubmit}>
        <input
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button type="submit">Submit Comment</button>
      </form>
      {comments.map((comment) => (
        <div>
          <Comment
            key={comment.id}
            comment={comment}
            showReplyInput={showReplyInput}
            setShowReplyInput={setShowReplyInput}
          />
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="text-blue-500 hover:text-blue-800 mr-2"
          >
            Reply
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;

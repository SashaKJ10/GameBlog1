import Comment from './Comment';
import React, { useState, useEffect, useCallback } from 'react';

function CommentList({ userInfo, setGames }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [showReplyInputs, setShowReplyInputs] = useState({});
  const admin = localStorage.getItem('admin');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonCommentDisabled, setIsButtonCommentDisabled] = useState(false);
  let details = JSON.parse(localStorage.getItem("detailsValue"))
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
  let games = localStorage.getItem('items')
  const handleCommentSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (commentText.length === 0) return;
      const newComment = { id: commentId, text: commentText };
    const newComments = [...comments, newComment];


      setComments([...comments, { id: commentId, text: commentText }]);
      setCommentText('');
      setCommentId(commentId + 1);
      setGames((prevGames) => {
        const updatedGames = [...prevGames];
        const index = updatedGames.findIndex((game) => game.id === details.id);
        if (index !== -1) {
          const updatedGame = { ...updatedGames[index] };
          updatedGame.comments = [...newComments];
          updatedGames[index] = updatedGame;
        }
        return updatedGames;
      });
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
    [setShowReplyInputs, userInfo, isButtonDisabled]
  );

  const handleDeleteComment = useCallback(
    (id) => {
      if (admin) {
        const newComments = comments.filter((comment) => {
          if (comment.parentId === id) return false;
          console.log(comment.parentId);
          return comment.id !== id;
        });
        setComments(newComments);
        localStorage.setItem(
          `comments-${window.location.pathname}`,
          JSON.stringify(newComments)
        );
      }
    },
    [comments]
  );
  return (
    <div className="p-4">
      <form onSubmit={handleCommentSubmit}>
        <div className="flex gap-2">
          <input
            className="w-50 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={commentText}
            placeholder="Add a comment..."
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button
            className="flex flex-row bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={
              !userInfo.email || !userInfo.password || isButtonCommentDisabled
            }
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
            deleteComment={handleDeleteComment}
            userInfo={userInfo}
            handleToggleReplyInput
          />
          <button
            onClick={() => handleToggleReplyInput(comment.id)}
            className="bg-gray-400 rounded p-2 ml-2 mt-2"
            disabled={!userInfo.email || !userInfo.password || isButtonDisabled}
          >
            Reply
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;

import { useState, useMemo } from 'react';
import { GrTrash } from 'react-icons/gr';
import { MdThumbDown } from 'react-icons/md';
import { MdThumbUp } from 'react-icons/md';

function CommentSection({ id }) {
  const [reply, setReply] = useState('');
  const [comments, setComments] = useState([]);
  const [userInput, setUserInput] = useState({ id: 0, comment: '', newId: 0 });
  const [likes, setLikes] = useState({ id: 0, likesUp: 0, likesDown: 0 });
  const [points, setPoints] = useState([]);

  useMemo(() => {
    let comment = JSON.parse(localStorage.getItem('comment') ?? '[]');
    setComments(comment);
  }, []);

  const postComment = () => {
    userInput.id = id;
    userInput.newId = Math.floor(Math.random() * 1000);
    const post = [...comments, userInput];
    setComments(post);
    let posts = JSON.stringify(post);
    localStorage.setItem('comment', posts);
  };

  function onThumbsUp() {
    likes.id = id;
    setLikes({ likes, likesUp: likes.likesUp++ });
    const like = [...points, likes];
    setPoints(like);
    let likesValue = JSON.stringify(like);
    localStorage.setItem('likes', likesValue);
  }

  function onThumbsDown() {
    likes.id = id;
    setLikes({ likes, likesDown: likes.likesDown++ });
    const like = [...points, likes];
    setPoints(like);
    let likes = JSON.stringify(like);
    localStorage.setItem('likes', likes);
  }

  const onDelete = (id) => {
    const newComments = comments.filter((item) => item.newId !== id);
    setComments(newComments);
    localStorage.setItem(JSON.stringify(newComments));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send reply to API or store in local state
    setReply('');
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-bold text-lg">Comments</h2>
      <div className="flex flex-row">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-50 h-50 mr-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          onChange={(e) =>
            setUserInput({ ...userInput, comment: e.target.value })
          }
        />
        <button
          className="text-gray-900 bg-white border mt-4 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={postComment}
        >
          Post
        </button>
      </div>
      <div className="flex flex-col">
        {comments.map((com, i) => (
          <div className="flex flex-row justify-center items-center  shadow my-4 ">
            {com.id === id ? (
              <div className=" ">
                <h1 className="relative">{com.comment}</h1>
                <GrTrash
                  className="cursor-pointer mx-3"
                  onClick={() => onDelete(com.newId)}
                />
                <MdThumbUp onClick={onThumbsUp} />
                <span className="flex flex-row">
                  {points.map((el) => (
                    <div>{el.likesUp}</div>
                  ))}
                </span>
                <MdThumbDown onClick={onThumbsDown} />
                <span className="flex flex-row">{likes.likesDown}</span>
                <button>Reply</button>
              </div>
            ) : null}
            {reply && (
              <form onSubmit={handleSubmit}>
                <textarea
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                />
                <button type="submit">Submit Reply</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;

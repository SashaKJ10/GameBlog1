import { useState, useMemo } from 'react';
import { GrTrash } from 'react-icons/gr';
function CommentSection({ id, game }) {
  const [comments, setComments] = useState([]);
  const [userInput, setUserInput] = useState({ id: 0, comment: '', newId: 0 });

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

  const onDelete = (id) => {
    const newComments = comments.filter((item) => item.newId !== id);
    setComments(newComments);
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
      <div>
        {comments?.map((com, i) => (
          <div className="flex justify-center items-center bg-gray-200 shadow my-4 w-25 h-10 ">
            {com.id === id ? (
              <div>
                <h1>{com.comment}</h1>
                <GrTrash
                  className="cursor-pointer mx-3"
                  onClick={() => onDelete(com.newId)}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;

import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-md mb-4 shadow-md text-white"
          >
            <h4 className="text-lg font-semibold">{comment.name}</h4>
            <p className="text-gray-400 mt-2">{comment.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;

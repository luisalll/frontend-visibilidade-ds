const apiUrl = `${process.env.API_URL}/schedule`;

export const getSchedule = async (userId) => {
  const response = await fetch(`${apiUrl}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const getPost = async (userId, postId) => {
  const response = await fetch(`${apiUrl}/${userId}/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const createPost = async (userId, post) => {
  const response = await fetch(`${apiUrl}/${userId}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();
  return data;
};

export const updatePost = async (userId, postId, post) => {
  const response = await fetch(`${apiUrl}/${userId}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();
  return data;
};

export const deletePost = async (userId, postId) => {
  const response = await fetch(`${apiUrl}/${userId}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

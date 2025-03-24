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
  const response = await fetch(`${apiUrl}/${userId}/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const createPost = async (userId, post) => {
  const formData = new FormData();

  if (post.imagePath) {
    try {
      const imageResponse = await fetch(decodeURIComponent(post.imagePath));
      const imageBlob = await imageResponse.blob();

      const filename = decodeURIComponent(post.imagePath.split("/").pop());

      const file = new File([imageBlob], filename, { type: imageBlob.type });

      formData.append("imagePath", file);

      const { imagePath, ...restOfPost } = post;
      post = restOfPost;
    } catch (error) {
      console.error("Erro ao buscar a imagem:", error);
    }
  }

  if (typeof post === "object") {
    Object.keys(post).forEach((key) => {
      formData.append(key, post[key]);
    });
  }

  const response = await fetch(`${apiUrl}/${userId}/posts`, {
    method: "POST",
    body: formData,
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

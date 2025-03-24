const apiUrl = `${process.env.API_URL}/usergov`;

export const authenticate = async (email, password) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return data;
};

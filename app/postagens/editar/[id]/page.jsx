"use client";

import { use, useEffect } from "react";
import { getPost } from "@/api/schedule";

export default function EditPost({ params }) {
  const unwrappedParams = use(params);

  const getPostById = async () => {
    const userId = localStorage.getItem('user_id');
    const response = await getPost(userId, unwrappedParams.id);
    console.log(response.data);
    return response.data;
  }

  useEffect(() => {
    getPostById();
  }, []);

  return <div>EditPost</div>;
}
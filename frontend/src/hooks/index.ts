import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers : {
        Authorization : ""
      }
    }).then((response) => {
      setBlogs(response.data);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    blogs,
  };
};

import { useState, useEffect, useCallback } from 'react';
import { fetchBlogsFromSheet } from '../services/blogService';

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveEmpty, setIsLiveEmpty] = useState(false);

  const loadBlogs = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBlogsFromSheet({ forceRefresh });
      if (data && data.length > 0) {
        setBlogs(data);
        setIsLiveEmpty(false);
      } else {
        setBlogs([]);
        setIsLiveEmpty(true);
      }
    } catch (err) {
      console.error('Error in useBlogs:', err);
      setError(err);
      setBlogs([]);
      setIsLiveEmpty(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  return {
    blogs,
    loading,
    error,
    isLiveEmpty,
    refetch: () => loadBlogs(true)
  };
}

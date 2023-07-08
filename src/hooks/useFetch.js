import React from 'react';
import { axiosInstance } from '../axios/instance';

const useFetch = (url, method, data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(error);

  useEffect(() => {
    try {
      setLoading(true);
      const response = axiosInstance[method](url, data);
      setData(response.data);
    } catch (e) {
      console.log('Error => ', e);
      const errorMessage = e.response ? e.response.data.message : e.message;

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

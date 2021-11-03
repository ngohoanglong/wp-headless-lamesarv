import { useCallback, useState } from 'react';
import { newsletter } from '../apis/newsletter';

export const useNewsletter = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async (email, name) => {
    setLoading(true)
    const result = await newsletter(email, name)
    setSuccess(true)
    setLoading(false)
    return result
  }, []);
  return {
    success,
    loading,
    onSubmit: handleSubmit,
  };
};

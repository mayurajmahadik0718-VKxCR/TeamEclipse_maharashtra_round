import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useCreator = (defaultCreatorId = 'creator_001') => {
  const [creatorId, setCreatorId] = useState(defaultCreatorId);
  const [creator, setCreator] = useState(null);
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      api.getCreatorById(creatorId).catch(() => null),
      api.getDigitalTwin(creatorId).catch(() => null),
    ])
      .then(([creatorRes, twinRes]) => {
        if (!isMounted) return;
        if (creatorRes?.data) setCreator(creatorRes.data);
        if (twinRes?.data) setDigitalTwin(twinRes.data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load creator profile');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [creatorId]);

  return {
    creatorId,
    setCreatorId,
    creator,
    digitalTwin,
    loading,
    error,
  };
};

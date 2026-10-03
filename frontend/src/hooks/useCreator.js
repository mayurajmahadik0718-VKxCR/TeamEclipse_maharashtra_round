import { useState, useEffect, useCallback } from 'react';
import { creatorService } from '../services/creatorService';

export const useCreator = (defaultCreatorId = 'creator_001') => {
  const [creatorId, setCreatorId] = useState(defaultCreatorId);
  const [creator, setCreator] = useState(null);
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreatorData = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const [creatorRes, twinRes] = await Promise.all([
        creatorService.getCreator(id),
        creatorService.getDigitalTwin(id),
      ]);

      if (creatorRes?.data) setCreator(creatorRes.data);
      if (twinRes?.data) setDigitalTwin(twinRes.data);
    } catch (err) {
      setError(err.message || 'Failed to load creator profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCreatorData(creatorId);
  }, [creatorId, fetchCreatorData]);

  const updateDigitalTwin = async (updatedData) => {
    try {
      const res = await creatorService.updateDigitalTwin(creatorId, updatedData);
      if (res?.data) {
        setDigitalTwin(res.data);
      }
      return res;
    } catch (err) {
      throw err;
    }
  };

  return {
    creatorId,
    setCreatorId,
    creator,
    digitalTwin,
    loading,
    error,
    refreshCreator: () => fetchCreatorData(creatorId),
    updateDigitalTwin,
  };
};

export default useCreator;

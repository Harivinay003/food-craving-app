'use client';

import { useState } from 'react';

export interface GeolocationState {
  loading: boolean;
  error: GeolocationPositionError | null;
  position: GeolocationPosition | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    position: null,
  });

  const locate = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    setState({ loading: true, error: null, position: null });

    const onSuccess = (position: GeolocationPosition) => {
      setState({ loading: false, error: null, position });
    };

    const onError = (error: GeolocationPositionError) => {
      setState({ loading: false, error, position: null });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    });
  };

  return { ...state, locate };
};

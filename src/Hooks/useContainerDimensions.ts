import React, { useEffect, useState } from 'react';

interface IDimensions {
  width: number;
  height: number;
}

export const useContainerDimensions = (myRef: React.RefObject<HTMLElement>) => {
  const getDimensions = () => ({
    width: myRef?.current?.offsetWidth || 0,
    height: myRef?.current?.offsetHeight || 0
  });

  const [dimensions, setDimensions] = useState<IDimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};

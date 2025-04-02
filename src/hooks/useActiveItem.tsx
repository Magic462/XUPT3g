import { useCallback, useState } from 'react';

// 该hook作用,点击具有相同类名的按钮的话,其中一个有效果其他的效果消失
export function useActiveItem<T extends string>() {
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const handleItemClick = useCallback((key: T) => {
    setActiveItem((prev) => (prev === key ? null : key));
  }, []);

  return { activeItem, handleItemClick };
}

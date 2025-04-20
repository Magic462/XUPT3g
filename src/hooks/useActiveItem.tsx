import { useCallback, useEffect, useState } from 'react';

// 该hook作用,点击具有相同类名的按钮的话,其中一个有效果其他的效果消失
// 默认激活第一个元素
export function useActiveItem<T extends string>(defaultKey?: T) {
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const handleItemClick = useCallback((key: T) => {
    setActiveItem((prev) => (prev === key ? null : key));
  }, []);

  useEffect(() => {
    if (defaultKey) {
      setActiveItem(defaultKey);
    }
  }, [defaultKey]);

  return { activeItem, handleItemClick };
}

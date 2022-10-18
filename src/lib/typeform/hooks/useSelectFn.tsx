import {
  useEffect, useState, useRef,
} from 'react';

const useSelectFn = (defaultValue?: string) => {
  const [selected, setSelected] = useState<string>(defaultValue);
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (ref && ref?.current) {
      ref.current.autofocus = true;
      ref.current.focus();
    }
  });

  const onKeyPress = (key: string) => {
    if (ref) {
      ref.current.value = '';
    }
    setSelected((key || '').toUpperCase());
  };

  const onSelect = (selectKey: string) => {
    setSelected(selectKey);
  };

  return { selected, onSelect, ref, onKeyPress };
};

export default useSelectFn;

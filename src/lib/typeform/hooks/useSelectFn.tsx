// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, {
  useEffect, useState, useRef,
} from 'react';
import { SelectForm } from '../types';
import useFormUI from './useFormUI';

const useSelectFn = (input: SelectForm) => {
  const [selected, setSelected] = useState<string | string[]>(input.value as string | string[]);
  const ref = useRef<HTMLInputElement>();

  const validOptions = input.options.map((opt) => opt.KeyPressId);

  const { onNext } = useFormUI();

  const isMultiple = input.multiple;

  // Handle multiple or single choice
  const handleChoice = (key: string) => {
    const keyPressed = (key || '').toUpperCase();

    // Skip if pressed key is not in options
    if (!validOptions.includes(keyPressed)) {
      return;
    }

    // 1. single case
    if (!isMultiple) {
      setSelected(keyPressed);

      input.onChange?.({ target: { value: keyPressed } } as React.ChangeEvent<HTMLInputElement>);

      // Move to next step on single select choice
      if (keyPressed) {
        setTimeout(onNext, 1000);
      }
      return;
    }

    // 2. multiple case
    const values = Array.from(selected || []);
    if (values.includes(keyPressed)) {
      const i = values.findIndex((v: string) => v === keyPressed);
      if (i !== -1) {
        values.splice(i, 1);
      }
    } else {
      values.push(keyPressed);
    }

    setSelected(values);

    // @ts-ignore
    input.onChange?.({ target: { value: values } });
  };

  useEffect(() => {
    // Handle any keyboard press
    const handleKeyUp = (e: React.KeyboardEvent) => {
      handleChoice(e.key);
    };
    // @ts-ignore
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      // @ts-ignore
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle selection
  const onSelect = (selectKey: string) => {
    handleChoice(selectKey);
  };

  const isSelected = (KeyPressId: string) => {
    if (isMultiple) {
      return Array.from(selected || []).includes(KeyPressId);
    }
    return KeyPressId === selected;
  };

  return { selected, onSelect, ref, isSelected };
};

export default useSelectFn;

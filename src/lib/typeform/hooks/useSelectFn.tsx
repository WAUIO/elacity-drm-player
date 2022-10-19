// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, {
  useEffect, useState, useRef,
} from 'react';
import { SelectForm } from '../types';
import useFormUI from './useFormUI';

const useSelectFn = (input: SelectForm) => {
  const [selected, setSelected] = useState<string | string[]>();
  const ref = useRef<HTMLInputElement>();

  const validOptions = input.options.map((opt) => opt.KeyPressId);

  const { onNext } = useFormUI();

  const isMultiple = input.multiple;

  // Hidden input will listen keyUp event
  const focusOnInput = () => {
    if (ref && ref?.current) {
      ref.current.autofocus = true;
      ref.current.focus();
    }
  };

  useEffect(() => {
    // Fire on change input event
    if (typeof input?.onChange === 'function') {
      input.onChange({ target: { value: selected } } as React.ChangeEvent<HTMLInputElement>);
    }
    // Move to next step on single select choice
    if (selected && !isMultiple) { onNext(); }
  }, [selected]);

  useEffect(() => {
    // Always make sure to focus input
    document.addEventListener('click', focusOnInput);

    focusOnInput();

    return () => {
      document.removeEventListener('click', focusOnInput);
    };
  }, []);

  // Handle multiple or single choice
  const handleChoice = (key: string) => {
    const keyPressed = (key || '').toUpperCase();

    // Skip if pressed key is not in options
    if (!validOptions.includes(keyPressed)) {
      return;
    }

    // single case
    if (!isMultiple) {
      setSelected(keyPressed);
      return;
    }
    // multiple case
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
  };

  // Handle any keyboard press
  const onKeyPress = (key: string) => {
    if (ref) {
      ref.current.value = '';
    }
    handleChoice(key);
  };

  // Handle selection
  const onSelect = (selectKey: string) => {
    onKeyPress(selectKey);
  };

  const isSelected = (KeyPressId: string) => {
    if (isMultiple) {
      return Array.from(selected || []).includes(KeyPressId);
    }
    return KeyPressId === selected;
  };

  return { selected, onSelect, ref, onKeyPress, isSelected };
};

export default useSelectFn;

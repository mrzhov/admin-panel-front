import { useState } from 'react';

const useFormInput = initValue => {
  const [value, setValue] = useState(initValue);

  const onChange = e => {
    setValue(e.target ? e.target.value : e);
  };

  return {
    value,
    onChange
  };
};

export default useFormInput;

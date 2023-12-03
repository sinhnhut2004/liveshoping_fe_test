import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData} from 'Redux/actions';

const ComponentA = () => {
  const dispatch = useDispatch();
  const [data, setDataState] = useState('');

  const handleChange = (event) => {
    const newData = event.target.value;
    setDataState(newData);
  };

  const handleClick = () => {
    dispatch(setData(data));
  };

  return (
    <div>
      <input type="text" value={data} onChange={handleChange} />
      <button onClick={handleClick}>Set Data</button>
    </div>
  );
};

export default ComponentA;

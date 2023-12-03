import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ComponentB = () => {
  const data = useSelector((state) => state.data);
  console.log("data in B", data, "kkk");

  return (
    <div>
      <p>Data from Component A: {data}</p>
    </div>
  );
};

export default ComponentB;

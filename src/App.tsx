import { useEffect, useState } from 'react';

import fetchData from 'lib/fetchData';

import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getSchoolBoys = async () => {
      const data = await fetchData('/2/Schoolboy');
      console.log('json = ', data);
    };

    getSchoolBoys();
  }, []);

  return (
    <div>
      dvcdfv
    </div>
  );
};

export default App;

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';

import TableOfVisits from 'pages/table-of-visits/page';
import fetchData from 'lib/fetchData';
import SchoolBoysContext from 'context/SchoolBoysContext';
import {
  schoolboyT,
  lessonColumnT,
  rateT,
  dataList,
  rateObjectT,
} from 'types/fetch';

import './App.css';

/*
  Обрав робити саме зі скролом з наступних причин:
  - це простіше і виглядає набагато краще
  - не велика кількість даних (нема потреби реалізовувати оптимізацію шляхом пагінації чи віртуалізації)
*/

const App = () => {
  const [schoolBoys, setSchoolBoys] = useState<schoolboyT[]>([]);
  const [column, setColumn] = useState<lessonColumnT[]>([]);
  const [rate, setRate] = useState<rateObjectT>({});

  useEffect(() => {
    const getData = () => {
      fetchData<dataList<schoolboyT>>('/2/Schoolboy').then((data) => data && setSchoolBoys(data.Items));
      fetchData<dataList<columnT>>('/2/Column').then((data) => data && setColumn(data.Items));
      fetchData<dataList<rateT>>('/2/Rate')
        .then((data) => data && setRate(data.Items.reduce((acc, item) => {
          acc[`${item.SchoolboyId}_${item.ColumnId}`] = item;
          return acc;
        }, {} as rateObjectT)));
    };

    getData();
  }, []);

  const toggleRate = useCallback(async (
    schoolboyId: string | number,
    columnId: string,
    isRate: boolean,
  ) => {
    try {
      if (isRate) {
        await fetchData('/2/Rate', {
          SchoolboyId: +schoolboyId,
          ColumnId: +columnId,
          Title: 'Н',
        }, 'POST');
      } else {
        await fetchData('/2/UnRate', {
          SchoolboyId: +schoolboyId,
          ColumnId: +columnId,
        }, 'POST');
      }

      const key = `${schoolboyId}_${columnId}`;
      setRate((prevRate) => ({
        ...prevRate,
        [key]: {
          ...prevRate[key],
          Title: isRate ? 'Н' : '',
        },
      }));
    } catch (error) {
      toast.error('Щось пішло не так, спробуйте ще раз');
    }
  }, []);

  const value = useMemo(() => ({
    schoolBoys,
    column,
    rate,
    toggleRate,
  }), [schoolBoys, column, rate, toggleRate]);

  return (
    <SchoolBoysContext.Provider value={value}>
      <TableOfVisits />
    </SchoolBoysContext.Provider>
  );
};

export default App;

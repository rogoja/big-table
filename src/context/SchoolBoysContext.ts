import { createContext } from 'react';

import { schoolboyT, lessonColumnT, rateObjectT } from 'types/fetch';

type schoolBoysContextT = {
  schoolBoys: schoolboyT[],
  column: lessonColumnT[],
  rate: rateObjectT,
  toggleRate: (SchoolboyId: string | number, ColumnId: string, isRate: boolean) => Promise<void>,
}

const SchoolBoysContext = createContext<schoolBoysContextT>({
  schoolBoys: [],
  column: [],
  rate: {},
  toggleRate: async () => {},
});

export default SchoolBoysContext;

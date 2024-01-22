export type dataList<T> = {
  Items: T[],
  Quantity: number,
}

export type schoolboyT = {
  Id: number,
  FirstName: string | null,
  SecondName: string | null,
  LastName: string | null,
}

export type lessonColumnT = {
  Id: number,
  Title: string,
}

export type rateT = {
  Id: number,
  Title: string,
  SchoolboyId: number,
  ColumnId: number,
}

export type rateObjectT = {
  [key: string]: rateT,
}

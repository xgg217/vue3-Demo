type dataType = {
  id: number;
  content: number;
  selected: boolean;
}

type tableType = {
  row: string;
  data: dataType[],

}

export type stateType = {
  dateRef: tableType[];
  selectedData: tableType;
  selectedAredData: tableType[]
}
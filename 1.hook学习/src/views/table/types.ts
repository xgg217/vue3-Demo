export type dataType = {
  id: number;
  content: number;
  selected: boolean;
}

export type tableType = {
  row: string;
  data: dataType[],
}

export type stateType = {
  dateRef: tableType[];
  selectedData: dataType | null;
  selectedAredData: dataType[]
}

export type selectedObjType = {
  startRow: number;
  startColumn: number;
  endRow: number;
  endColumn: number;
}
export type IRoute = {
  id: number;
  pid: number;
  path: string;
  name: string;
  link?: string;
  title: string;
  children?: IRoute[];
}

export type IRouteTree = IRoute & {
  children?: IRouteTree[];
}



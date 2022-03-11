interface MyModalShowParam {
  type: string;
  title?: string;
  parameter?: any;
}
interface MyModalType {
  showModal: (data: MyModalShowParam) => void;
  hideModal: () => void;
}

interface MyPaginationType {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface MyStatisticType {
  title: string;
  value: string | number;
}

interface PageModelType {
  page?: number;
  perPage?: number;
  total?: number;
}

interface TableModelType {
  orderBy?: string[];
}

interface ResDataType {
  code: number;
  data: any;
  meta?: any;
  additions?: any;
}

interface ParamsType {
  search?: Record<string, any>;
  table?: TableModelType;
  pagination?: PageModelType;
}

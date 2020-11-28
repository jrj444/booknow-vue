type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}

type RecordItem = {
  tags: Tag[];
  remark: string;
  type: string;
  amount: number;
  createdAt: string;
}

type Tag = {
  id: string;
  name: string;
}

type Result = {
  title: string;
  items: RecordItem[];
  total?: number;
}[]
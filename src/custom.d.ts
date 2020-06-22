type RecordItem = {
  tags: string[];
  remark: string;
  type: string;
  amount: number;
  createdAt?: Date;
}

type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string;
  save: () => void;
  update: (id: string, name: string) => string;
  remove: (id: string) => boolean;
}

interface Window {
  tagList: Tag[];
}
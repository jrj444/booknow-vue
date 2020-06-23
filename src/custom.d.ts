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
  store: {
    tagList: Tag[];
    findTag: (id: string) => Tag;
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => string;
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
  };
}
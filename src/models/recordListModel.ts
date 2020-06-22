import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  },
  createItem(record: RecordItem) {
    const recordClone: RecordItem = clone(record);
    recordClone.createdAt = new Date();
    this.data.push(recordClone);
  }
};

export {recordListModel};
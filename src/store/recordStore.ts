import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const recordClone: RecordItem = clone(record);
    recordClone.createdAt = new Date();
    this.recordList && this.recordList.push(recordClone);
    recordStore.saveRecords();
  }
};

recordStore.fetchRecords();

export default recordStore;
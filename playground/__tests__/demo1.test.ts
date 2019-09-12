interface RowData {
  id: string;
}
function makeGlobalDatabase() {
  let rows: RowData[] = [];
  return {
    clear: () => {
      rows = [];
    },
    insert: (row: RowData): void => {
      rows.push(row);
      return;
    },
    find: (id: string): boolean => {
      const target = rows.find((row: RowData) => row.id === id);
      if (!target) {
        return false;
      }
      return true;
    },
  };
}
const globalDatabase = makeGlobalDatabase();

describe('', () => {
  beforeEach(() => {
    console.log('beforeEach');
    globalDatabase.clear();
    console.log('beforeEach clear');
    globalDatabase.insert({ id: 'foo' });
    console.log('beforeEach insert');
  });

  it('can find things', () => {
    console.log('#1');
    globalDatabase.insert({ id: 'foo1' });
    const success = globalDatabase.find('foo');
    console.log('#1 - find');
    expect(success).toBeTruthy();
  });

  it('can insert a thing', async () => {
    console.log('#2');
    const success = globalDatabase.find('foo1');
    console.log('#2 - find');
    expect(success).toBeFalsy();
  });
});

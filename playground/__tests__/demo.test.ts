// interface RowData {
//   id: string;
// }
// function makeGlobalDatabase() {
//   let rows: RowData[] = [];
//   return {
//     rows,
//     clear: () =>
//       new Promise((resolve, reject) => {
//         rows = [];
//         resolve();
//       }),
//     insert: (row: RowData) =>
//       new Promise((resolve, reject) => {
//         rows.push(row);
//       }),
//     find: (id: string): Promise<[boolean, RowData | undefined]> =>
//       new Promise((resolve, reject) => {
//         const target = rows.find(row => row.id === id);
//         if (!target) {
//           return [false, undefined];
//         }
//         return [true, target];
//       }),
//   };
// }
// const globalDatabase = makeGlobalDatabase();

// describe('', () => {
//   beforeEach(async () => {
//     // Clears the database and adds some testing data.
//     // Jest will wait for this promise to resolve before running tests.
//     console.log('beforeEach');
//     await globalDatabase.clear();
//     await globalDatabase.insert({ id: 'foo' });
//   });

//   it('can find things', async () => {
//     console.log('#1', globalDatabase.rows);
//     await globalDatabase.insert({ id: 'foo1' });
//     const [success] = await globalDatabase.find('foo');
//     expect(success).toBeTruthy();
//   });

//   it('can insert a thing', async () => {
//     console.log('#2', globalDatabase.rows);
//     const [success] = await globalDatabase.find('foo1');
//     expect(success).toBeFalsy();
//   });
// });

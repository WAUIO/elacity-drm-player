// A mock function to mimic making an async request for data
export const fetchCount = (
  amount: number
): Promise<{
  data: number;
}> => new Promise<{ data: number }>((resolve) => {
  setTimeout(() => {
    resolve({ data: (amount || 1) as number });
  }, 500);
});

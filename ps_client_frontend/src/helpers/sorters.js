export const sortCompletedLast = (todolist) => {
  console.log({ todolist });
  const sorted = [...todolist].sort((a, b) => {
    if (a.completed === b.completed) {
      if (a.completed) {
        return b.createdAt.localeCompare(a.createdAt); // Sort completed:true items by createdAt in descending order
      } else {
        return b.createdAt.localeCompare(a.createdAt); // Sort completed:false items by createdAt in descending order
      }
    }
    if (a.completed) {
      return 1; // Move completed:true items to the bottom
    }
    return -1; // Move completed:false items to the top
  });
  return sorted;
};

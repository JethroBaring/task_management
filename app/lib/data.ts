export async function getWorkspaces() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const workspaces = [
        { id: 1, name: 'Workspace 1' },
        { id: 2, name: 'Workspace 2' },
      ];
      resolve(workspaces); // Resolve the promise with data
    }, 100); // Simulate a 2-second delay
  });
}
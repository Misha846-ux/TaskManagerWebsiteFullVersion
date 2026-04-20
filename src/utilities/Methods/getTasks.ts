export default async function getTasks(id: string) {
   const response = await fetch(import.meta.env.VITE_Tasks_SERVER_URL + `?parantId=${id}`);
   return response.json();
} 
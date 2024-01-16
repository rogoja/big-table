const baseUrl = 'http://94.131.246.109:5555/v1';

export default async (path: string) => {
  const response = await fetch(`${baseUrl}${path}`);
  const json = await response.json();
  return json;
};

const baseUrl = 'http://94.131.246.109:5555/v1';

type methodT = 'POST' | 'GET';

export default async <T>(
  path: string,
  body?: object,
  method: methodT = 'GET',
): Promise<T | null> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error('Something wrong');
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    const json = await response.json();
    return json;
  }

  return null;
};

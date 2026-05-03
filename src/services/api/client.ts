const API_BASE_URL = 'http://localhost:8000/api';

export async function apiClient(path: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Blad API: ${response.status}`);
  }

  return response.json();
}

import { apiClient } from '../../../services/api/client';

export async function fetchUsers() {
  return apiClient('/users');
}

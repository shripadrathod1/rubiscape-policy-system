import api from './api';

export const policyService = {
  /** GET /policies?type=&status=&page=&limit= */
  getAll:  (params = {}) => api.get('/policies', { params }),

  /** GET /policies/:id */
  getById: (id) => api.get(`/policies/${id}`),

  /** POST /policies */
  create:  (data) => api.post('/policies', data),

  /** PUT /policies/:id */
  update:  (id, data) => api.put(`/policies/${id}`, data),

  /** DELETE /policies/:id */
  remove:  (id) => api.delete(`/policies/${id}`),

  /** PATCH /policies/:id/toggle */
  toggle:  (id) => api.patch(`/policies/${id}/toggle`),
};

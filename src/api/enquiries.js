import api from "../config/axios";

const BASE = "/api/v1/enquiries";

export async function fetchEnquiriesApi(params = {}) {
  const res = await api.get(BASE, { params });
  return res.data;
}

export async function fetchEnquiryById(id) {
  const res = await api.get(`${BASE}/${id}`);
  return res.data;
}

export async function createEnquiryApi(payload) {
  const res = await api.post(BASE, payload);
  return res.data;
}

export async function updateEnquiryApi(id, payload) {
  const res = await api.patch(`${BASE}/${id}`, payload);
  return res.data;
}

export async function deleteEnquiryApi(id) {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data;
}

export default {
  fetchEnquiriesApi,
  fetchEnquiryById,
  createEnquiryApi,
  updateEnquiryApi,
  deleteEnquiryApi,
};

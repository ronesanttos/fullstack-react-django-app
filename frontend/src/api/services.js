import api from "./api";

export function createService(data) {
    return api.post("/services/",data).then(res => res.data);
}

export function deleteService(id) {
    return api.delete(`/services/${id}/`);
}
import api from "./api";

export function getProjects() {
    return api.get("/projects/").then(res => res.data);
}

export function createProject(data) {
    return api.post("/projects/", data).then(res => res.data);
}

export function deleteProject(id) {
    return api.delete(`/projects/${id}/`);
}
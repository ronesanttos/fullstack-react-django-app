import { useNavigate } from 'react-router-dom';

import style from './Newproject.module.css';
import ProjectForm from '../project/ProjectForm';

import api from '../../api/api';

function Newproject() {
    const navigate = useNavigate()

    function createPost(project) {
        const projectData = {
        ...project,
        services: project.services ?? [],
        total_cost: project.total_cost ?? 0,
    };
    
        api.post("projects/", projectData)
            .then(() => {
                navigate("/projects", {
                    state: { message: "Projeto criado com sucesso!" },
                });
            })
            .catch((err) => {
                console.error(err.response?.data || err.message);
                alert("Erro ao criar projeto");
            });
    }
    
    return (
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default Newproject;
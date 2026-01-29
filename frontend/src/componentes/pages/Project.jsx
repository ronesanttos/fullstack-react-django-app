import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './Project.module.css';

import Message from '../layout/Message.jsx';
import Container from '../layout/Container.jsx'
import LinkButton from '../layout/LinkButton.jsx'
import ProjectCards from '../project/ProjectCard.jsx';
import Loading from '../layout/Loading.jsx';

import api from '../../api/api.js';

function Project() {
    const [project, setProject] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = location.state?.message || ''


    useEffect(() => {
        api.get('projects/')
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
            .finally(() => setRemoveLoading(false));
    }, []);

    function removeProject(id) {
        api.delete(`projects/${id}/`)
            .then(resp => resp.json())
            .then(() => {
                setProject(project.filter((projects) => projects.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {project.length > 0 && project.map((projects) => (
                    <ProjectCards id={projects.id} name={projects.name} budget={projects.budget} category={projects?.category?.name} key={projects.id}
                        handleRemove={removeProject} />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && project.length === 0 && (
                    <p className={style.info}>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>)
}

export default Project;
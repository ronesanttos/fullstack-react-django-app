import style from './EditProject.module.css'
import { v4 as uuidv4 } from 'uuid'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from '../layout/Loading'
import Message from '../layout/Message'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

import api from '../../api/api';

function EditProject() {
    const { id } = useParams()
    const [project, setProject] = useState([null])
    const [services, setServices] = useState([])
    const [showPF, setShowPF] = useState(false)
    const [showServiceF, setShowServiceF] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        api.get(`projects/${id}/`)
            .then((response) => {
                setProject(response.data)
                setServices(response.data.services || [])
            })
            .catch((err) => console.log(err))
    }, [id]);

    function editPost(updatedProject) {
        setMessage('')

        if (updatedProject.budget < updatedProject.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return

        }
        api.patch(`projects/${updatedProject.id}/`, updatedProject)
            .then((response) => {
                setProject(response.data)
                setShowPF(false)
                setMessage('Projeto atualizado com sucesso!!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function createService(projectUpdated) {
        setMessage('')
        const lastService = projectUpdated.services.at(-1)
        lastService.id = uuidv4()

        const newCost = parseFloat(projectUpdated.cost) + parseFloat(lastService.cost)

        if (newCost > parseFloat(projectUpdated.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            projectUpdated.services.pop()
            return
        }

        projectUpdated.cost = newCost

        api.patch(`projects/${projectUpdated.id}/`, projectUpdated)
            .then((response) => {
                setProject(response.data)
                setServices(response.data.services)
                setShowServiceF(false)
                setMessage('Serviço adicionado com sucesso!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function removeService(serviceId, cost) {

        const servicesUpdated = services.filter(service => service.id !== serviceId)

        const projectUpdated = {
            ...project,
            services: servicesUpdated,
            cost: project.cost - cost
        }

        api.patch(`projects/${project.id}/`, projectUpdated)
            .then((response) => {
                setProject(response.data)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso')
                setType('success')
            })
            .catch (err => console.log(err))
    }

    function toggleServiceF() {
        setShowServiceF(!showServiceF)
    }

    function togglePF() {
        setShowPF(!showPF)
    }

    return (
        <> {project.name ? (
            <div className={style.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={style.service_form_container}>
                        <h1> Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={togglePF}>
                            {!showPF ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showPF ? (
                            <div className={style.project_info}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado </span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={style.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText='Salvar edição' projetctData={project} />
                            </div>
                        )}
                    </div>
                    <div className={style.service_form_container}>
                        <h2>Adicione um serviço: </h2>
                        <button className={style.btn} onClick={toggleServiceF}>
                            {!showServiceF ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={style.project_info}>
                            {showServiceF && (<ServiceForm
                                handleSubmit={createService} btnText='Adicionar Serviço'
                                projectData={project} />)}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container className='start'>
                        {service.length > 0 && service.map((serve) => (
                            <ServiceCard
                                id={serve.id}
                                key={serve.id}
                                name={serve.name}
                                description={serve.description}
                                cost={serve.cost}
                                handleRemove={removeService} />
                        ))}
                        {service.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ) : (<Loading />)} </>
    )
}

export default EditProject;
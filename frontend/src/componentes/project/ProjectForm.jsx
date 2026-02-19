import { useEffect, useState } from 'react';
import style from './ProjectForm.module.css';

import Input from '../form/Input';
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton';
import LinkButton from '../layout/LinkButton';
import api from '../../api/api'

function ProjectForm({ handleSubmit, btnText, projetctData }) {

    const [category, setCategories] = useState([]);

    const [project, setProject] = useState(
        projetctData || {
            name: '',
            budget: '',
            category: '',
            services: [],
            total_cost: 0,
        }
    );
    

    // obs aqui
    useEffect(() => {
        api.get('/categories/')
            .then(response => {
                setCategories(response.data);
            })
    },[]);


    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setProject({ ...project, [name]: name === "category" ? Number(value) : value })
    }

    return (
        <form onSubmit={submit} className={style.form}>

            <Input
                type='text'
                text='Nome do projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name || ''} />

            <Input
                type="number"
                text='Orçamento do projeto'
                name='budget'
                placeholder="Insira o valor total do orçamento "
                handleOnChange={handleChange}
                value={project.budget || ''} />

            <Select name="category" text='Selecione a categoria' options={category}  handleOnChange={handleChange} value={project.category || ''}/>

            <SubmitButton text={btnText} />
            <LinkButton to={"/"} text={"Fechar"} />

        </form>
    )

}

export default ProjectForm;
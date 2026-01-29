import { useState, useEffect } from 'react';
import style from './ProjectForm.module.css';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import api from '../../api/api';

function ProjectForm({ handleSubmit, btnText, projetctData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projetctData || {});

    useEffect(() => {
        api.get("categories/")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => console.log(err));
    }, [])

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
    }

    function handleChange(event) {
        setProject({ ...project, [event.target.name]: event.target.value })
    }

    function handleCategory(event) {
        setProject({
            ...project, category: event.target.value,
        });
    }

    return (
        <form onSubmit={submit} className={style.form}>

            <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do projeto'
                handleOnChange={handleChange} value={project.name || ''} />

            <Input type="number" text='Orçamento do projeto' name='budget' placeholder="Insira o orçamento total"
                handleOnChange={handleChange} value={project.budget || ''} />

            <Select name="category_id" text='Selecione a categoria' options={categories}
                handleOnChange={handleCategory} value={project.category || ''} />

            <SubmitButton text={btnText} />

        </form>
    )

}

export default ProjectForm;
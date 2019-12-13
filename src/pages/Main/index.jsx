import React from 'react';
import { Form, SubmitButton, Container, List } from './styles';
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/all";

import api from '../../services/api';


export default class Main extends React.Component {

    state = {
        newRepo: '',
        repositories: [],
        loading: false
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');
        if (repositories) {
            this.setState({repositories: JSON.parse(repositories)});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {repositories} = this.state;
        if (prevState.repositories !== this.state.repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = (e) => {
        this.setState({newRepo: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const {newRepo, repositories} = this.state;
        const response = await api.get(`repos/${this.state.newRepo}`);

        const data = {
            name: response.data.full_name
        };
        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false
        });

    };

    render() {
        const {newRepo, loading, repositories} = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt/>
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleInputChange}
                        placeholder="Adicionar repositório"/>
                    <SubmitButton loading={loading ? true : undefined}>
                        {loading ?
                            <FaSpinner color="#FFF" size={14}/> :
                            <FaPlus color="#FFF" size={14}/>}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <a href="#">Detalhes</a>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

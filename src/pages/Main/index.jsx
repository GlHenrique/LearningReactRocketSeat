import React from 'react';
import { Form, SubmitButton, List, SearchRepository, MessageError } from './styles';
import { Container } from '../../components/Container';
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/all";
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class Main extends React.Component {


    constructor(props) {
        super(props);
        document.title = 'Main | Learning React';
    }

    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
        duplicated: false
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
        const {repositories} = this.state;
        const response = await api.get(`repos/${this.state.newRepo}`)
            .catch(error => {
                if (error.response.status === 404) {
                }
                this.setState({loading: false, error: true, newRepo: ''});
            });

        if (response) {
            let isDuplicated = false;
            repositories.forEach((repositorie) => {
                if (repositorie.name === response.data.full_name) {
                    isDuplicated = true;
                }
            });
            if (isDuplicated) {
                this.setState({loading: false, duplicated: true});
                return
            }
            const data = {
                name: response.data.full_name
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                error: false,
                duplicated: false
            });
        }
    };


    render() {
        const {loading, repositories, error, duplicated} = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt/>
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <SearchRepository error={error} duplicated={duplicated}>
                        <input
                            type="text"
                            onChange={this.handleInputChange}
                            placeholder="Adicionar repositório"/>
                    </SearchRepository>
                    <SubmitButton loading={loading ? true : undefined}>
                        {loading ?
                            <FaSpinner color="#FFF" size={14}/> :
                            <FaPlus color="#FFF" size={14}/>}
                    </SubmitButton>
                </Form>
                <MessageError hidden={!error}>
                    {error === true ? 'Não encontramos nenhum repositório' : ''}
                </MessageError>
                <MessageError hidden={!duplicated}>
                    {duplicated === true ? 'Você já adicionou esse repositório' : ''}
                </MessageError>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <div>
                                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                            </div>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

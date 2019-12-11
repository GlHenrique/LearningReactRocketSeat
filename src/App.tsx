import React from 'react';
import Routes from './routes'
import './App.scss';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
    return (
        <>
            <Routes/>
            <GlobalStyle />
        </>

    );
};

export default App;

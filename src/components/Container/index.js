import styled from 'styled-components';

export const Container = styled.div
    `
max-width: 700px;
background: #fff;
border-radius: 4px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
padding: 30px;
margin: 80px auto;

h1 {
font-size: 20px;
display: flex;
align-items: center;
flex-direction: row;

svg {
margin-right: 10px;
}

#arrowBack {
font-size: 10vh;
color: #7159c1;
}
}
`;

export default Container;

import styled from 'styled-components';
import { keyframes, css } from "styled-components";

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
}
`;

export const List = styled.ul`
list-style: none;
margin-top: 30px;
li {
padding: 15px 0;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

& + li {
border-top: 1px solid #eee;
}
 a{
 color: #7159c1;
 text-decoration: none;
 }
}

div {
display: flex;
align-items: center;
svg {
color: red;
font-size: 4vh;
&:hover {
cursor: pointer;
}
}
}
`;

export const DeleteRepo = styled.div`
`;

export const Form = styled.form`
margin-top: 30px;
display: flex;
flex-direction: row;
`;

const rotate = keyframes`
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}

`;

export const SearchRepository = styled.div.attrs(props => ({
    error: props.error,
    duplicated: props.duplicated
}))`
width: 100%;
input {
flex: 1;
border: 1px solid #eee;
padding: 10px 15px;
border-radius: 4px;
font-size: 16px;
width: 100%;
}
${props => props.error && css`
input {
border-color: red;
}
`}
${props => props.duplicated && css`
MessageError {
color: red;
}
`}
`

export const MessageError = styled.div`
color: red;
font-size: 15px;
margin-top: 5px;
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
background: #7179c1;
border: 0;
padding: 0 15px;
margin-left: 10px;
border-radius: 4px;
display: flex;
justify-content: center;
align-items: center;

&:disabled {
cursor: not-allowed;
opacity: 0.6; 

}

${props => props.loading && css`
svg {
animation: ${rotate} 2s linear infinite;
}
`}


`;

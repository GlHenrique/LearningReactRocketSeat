import React from 'react';
import { Title } from './styles';


export default class Main extends React.Component {

    constructor(_props: any) {
        super(_props);
    }


    componentDidMount(): void {
        console.log(this.props);
    }

    render() {
        return (
            <Title>
                Hello World
            </Title>
        );
    }
}

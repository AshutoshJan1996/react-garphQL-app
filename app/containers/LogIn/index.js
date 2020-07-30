import React, { Component } from "react";
import { withRouter } from 'react-router';
import styled from 'styled-components';
import  Input  from '@components/Input/index';
import ErrMassage from '@components/Error/index';
import Button from '@components/Button/index';
import { withApollo } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';
import { compose } from 'redux';
import { Spin } from 'antd';

const logInMutation = gql`
  mutation userIn($username: ID!, $password: String!) {
    logIn(username: $username, password: $password) {
      customer{
        name
        username
        dateCreated
      }
      token
    }
  }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
  width: 42%;
`;
const CustP = styled.p`
   cursor: pointer;
   color: blue;
`;
class logIn extends Component {

    state = {
        input:{
            username: '',
            password: ''
        },
        loading: false,
        error: false
    }

    handelChanged = (event, type) => {
        if(this.state.error) {
           this.setState({error: false})
        }
        const upadted = this.state.input;
        upadted[type] = event.target.value;
        this.setState({input : upadted})
    }

    onLogInClicked = () => {
        this.setState({loading: true})
        this.props.client.mutate({
            mutation: logInMutation,
            variables: { username: this.state.input.username,
                         password: this.state.input.password }
         }).then(response => {
           if(response.data.logIn) {
            this.setState({loading: true}) 
            this.props.history.push('pets')
           }
         }).catch(resp => {
           this.setState({loading: false, error: true})
         });
    }

    onChangePage = () => {
        this.props.history.push('signup');
    }

    renderErrerMass = () => {
      const err = this.state.error;
      return ((!this.state.loading && err) && (
         <ErrMassage massage={"Encorrect User Name Or Password"} />
      ))
    }

    render () {
        let main = (
          <>
            <h1>Log In</h1>
            <Input label='User Name'
               value={this.state.input.username}
               changed={(event) => this.handelChanged(event, 'username')} />
            <Input label='Password'
               value={this.state.input.password}
               changed={(event) => this.handelChanged(event, 'password')} />
            <Button clicked ={this.onLogInClicked}>Log In</Button>
            <RightContent>
                <CustP onClick={this.onChangePage} >Go to Sing Up</CustP>
            </RightContent>
          </>
        );
        if(this.state.loading) {
            main = <Spin size="large" tip="loading..." />
        }
        return(
          <Container>
             {this.renderErrerMass()}
             {main}      
          </Container>
        )
    }
}
export default compose(
    withRouter,
    withApollo
)(logIn);
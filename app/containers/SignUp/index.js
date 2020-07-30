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

const signUpMutation = gql`
  mutation createAcc($input: CreateAccountInput!) {
    createAccount(input: $input) {
      name
      username
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
  width: 40%;
`;
const CustP = styled.p`
   cursor: pointer;
   color: blue;
`;

class SignUp extends Component {
    state = {
        input:{
            name: '',
            username: '',
            password: ''
        },
        loading: false,
        error: false
    }

    handelChanged = (event, type) => {
        const upadted = this.state.input;
        upadted[type] = event.target.value;
        this.setState({input : upadted})
    }

    onSignUpClicked = () => {
        this.setState({loading: true})
        this.props.client.mutate({
            mutation: signUpMutation,
            variables: { input: this.state.input }
         }).then(response => {
          if(response.data.createAccount) {
              this.setState({loading: true})
              this.onChangePage()
          }
        }).catch(resp => {
            this.setState({loading: false, error: true})
          });
    }

    onChangePage = () => {
        this.props.history.push('/');
    }

    renderErrerMass = () => {
        const err = this.state.error;
        return ((!this.state.loading && err) && (
           <ErrMassage massage={"Something Went Wrong Please Try Again"} />
        ))
    }

    render () {
        let main = (
           <>
            <h1>Sign Up</h1>
            <Input label='Name'
               value={this.state.input.name}
               changed={(event) => this.handelChanged(event, 'name')} />
            <Input label='User Name'
               value={this.state.input.username}
               changed={(event) => this.handelChanged(event, 'username')} />
            <Input label='Password'
               value={this.state.input.password}
               changed={(event) => this.handelChanged(event, 'password')} />
            <Button clicked ={this.onSignUpClicked}>Sign Up</Button>
            <RightContent>
                <CustP onClick={this.onChangePage} >Go to Log In</CustP>
            </RightContent>   
          </>
        )
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
)(SignUp);
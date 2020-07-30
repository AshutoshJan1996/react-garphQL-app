import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Skeleton } from 'antd';
import { withApollo } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';
import { compose } from 'redux';
import { withRouter } from 'react-router';

const petListQuery = gql`
  query allpet {
    allPets {
      name
      id
      category
      weight
    }
  }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
`;
const CustomCard = styled(Card)`
    margin: 30px 0;
    max-width: 400px;
    color: grey;  
`;
const CenterContent = styled.div`
  display: flex;
  align-self: center;
`;
const Heading = styled.h1`
    font-weight: bold;
    display: block;
`;
class pets extends Component {

    state = {
        list:[],
        loading: true
    }
  
    componentDidMount () {
        this.getPetList();
    }
    getPetList = () => {
        this.props.client.query({
            query: petListQuery
         }).then(response => {
            if(response.data.allPets) {
               const updatedList =  response.data.allPets;
                this.setState({list: updatedList, loading: false});
            }
         }).catch(resp => {
            this.setState({loading: false})
         });
    }

    renderPetList = () => {
        const items = this.state.list;
        return ((items.length !== 0) && (
             items.map((item, index) => (
              <CustomCard key={index}>
                <p>Pet Id: {item.id}</p>
                <p>Pet Name: {item.name}</p>
                <p>Category: {item.category}</p>
                <p>Weight: {item.weight} lb</p>
              </CustomCard>
            ))
        ));
    }

    render() {
        return (
            <Container>
                <CenterContent>
                    <Heading>List Of All Pets</Heading>
                </CenterContent>
                <Skeleton loading={this.state.loading} active>
                { this.renderPetList()}
                </Skeleton>
            </Container>
        )
    }
}

export default compose(
    withRouter,
    withApollo
)(pets);
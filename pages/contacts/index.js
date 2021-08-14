import React, {useEffect} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import List from "../../components/list";

const Index = (props) => {
  const {
    setListData,
  } = props;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await fetch('api/v1/contacts');
    const res = await response.json();
    const {data} = res;
    setListData(data);
  }

  return <IndexWrapper>
    <h1>List Area</h1>
    <List/>
  </IndexWrapper>;
}

const IndexWrapper = styled.div`
  h1 {
    text-align: center;
  }
`;

function mapStateToProps(state) {
  return {
    listData: state.listData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setListData: (payload) => dispatch({type: 'SET_LIST_DATA', payload}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
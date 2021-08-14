import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import Pagination from '@material-ui/lab/Pagination';
import {useRouter} from 'next/router';
import Image from "next/Image";

const List = (props) => {
  const {
    listData,
  } = props;

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [listDisplay, setListDisplay] = useState([]);
  const maxPerPage = 10;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fromRecord = (page - 1) * maxPerPage;
    const toRecord = (page * maxPerPage) - 1;
    const _list = listData.slice(fromRecord, toRecord);
    setListDisplay(_list);
  }, [listData, page]);

  const onCardClicked = (e, item) => {
    e.preventDefault();
    router.push('contacts/' + item['_id']);
  }

  return <ListWrapper>
    <div className={'card-wrapper'}>
      {(listDisplay && listDisplay.length > 0) && listDisplay.map((item, index) => (
        <Card
          key={index}
          title={item.firstname}
          onClick={(e) => onCardClicked(e, item)}
          style={{margin: 20}}
        >
          <div className={'card'}>
            <div className={'content'}>
              <p className={'firstname'}>
                <span className={'detail-title'}>first name:</span>
                <span>{item.firstname}</span>
              </p>
              <p className={'lastname'}>
                <span className={'detail-title'}>last name:</span>
                <span>{item.lastname}</span>
              </p>
              <p className={'email'}>
                <span className={'detail-title'}>email:</span>
                <span>{item.email}</span>
              </p>
            </div>
            <img src={item.image} alt=""/>
          </div>
        </Card>
      ))}
      <Pagination
        count={maxPerPage}
        page={page}
        onChange={handleChange}
      />
    </div>
  </ListWrapper>;
}

const ListWrapper = styled.div`
  margin-bottom: 40px;
  
  .card-wrapper {
    width: 60%;
    margin: 0 auto;

    .card {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size: 16px;
      cursor: pointer;

      .content {
        p {
          margin-bottom: 10px;

          .detail-title {
            display: block;
            font-weight: bold;
            margin-right: 20px;
          }
        }
      }
    }
  }

  // mobile
  @media (max-width: 768px) {
    .card-wrapper {
      width: 100%;

      .card {
        flex-direction: column;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    listData: state.listData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
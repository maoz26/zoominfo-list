import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import Link from "next/link";
import Card from "@material-ui/core/Card";

const ContactPage = (props) => {
  const {
    listData,
  } = props;

  const [selectedContact, setSelectedContact] = useState();

  useEffect(() => {
    const url = window.location.pathname;
    const _selectedContact = listData.find((item) => {
      const id = /[^/]*$/.exec(url)[0];
      return item['_id'] === id;
    })
    setSelectedContact(_selectedContact);
  });

  return <ContactPageWrapper>
    {selectedContact && <>
      <h1>{'Contact page - ' + selectedContact.firstname}</h1>
      <div className={'card-wrapper'}>
        <Card
          title={selectedContact.firstname}
          style={{margin: 20}}
        >
          <div className={'card'}>
            <div className={'content'}>
              <p className={'firstname'}>
                <span className={'detail-title'}>first name:</span>
                <span>{selectedContact.firstname}</span>
              </p>
              <p className={'lastname'}>
                <span className={'detail-title'}>last name:</span>
                <span>{selectedContact.lastname}</span>
              </p>
              <p className={'email'}>
                <span className={'detail-title'}>email:</span>
                <span>{selectedContact.email}</span>
              </p>
            </div>
            <img src={selectedContact.image} alt=""/>
          </div>
          <div className={'description'}>
            <span className={'detail-title'}>description:</span>
            <span>{selectedContact.description}</span>
          </div>
        </Card>
      </div>
    </>}
    <div className={'link-container'}>
      <Link href="/contacts">
        <a className={'link'}>back</a>
      </Link>
    </div>
  </ContactPageWrapper>;
}

const ContactPageWrapper = styled.div`
  margin-bottom: 40px;
  h1 {
    text-align: center;
  }

  .card-wrapper {
    width: 60%;
    margin: 0 auto;

    .card {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size: 16px;

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

    .description {
      padding: 20px;
    }
  }

  .link-container {
    text-align: center;

    .link {
      display: block;
      margin: 0 auto;
      color: blue;
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
  }
;

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
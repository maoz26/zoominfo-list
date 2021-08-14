import styled from "styled-components";
import {connect} from 'react-redux';
import React, {useState} from 'react';
import Router from 'next/router';
import ReCaptchaV2 from "react-google-recaptcha";

const Index = (props) => {
  const [view, setView] = useState("logIn");
  const [state, setState] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    captcha: null
  })

  const siteKey = "6LeTb28bAAAAABnKX98id7Eqd2RGeLBIv6cuRMtm";

  const changeView = (_view) => {
    setView(_view);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleToken = (input) => {
    setState({
      ...state,
      captcha: input
    })
  }

  const handleExpire = () => {
    setState({
      ...state,
      captcha: null
    })
  }

  const onLogin = async (event) => {
    event.preventDefault();
    if (state.captcha === null) {
      alert('You must validate the captcha');
      return;
    }

    const response = await fetch('api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password
      }),
    });
    const res = await response.json();
    const {data} = res;
    if (data && data.token) {
      await Router.push(`/contacts?token=${data.token}`)
    } else {
      alert('please enter valid data');
    }
  }

  const onRegister = async (event) => {
    event.preventDefault();

    const response = await fetch('api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": state.email,
        "first_name": state.firstname,
        "last_name": state.lastname,
        "password": state.password
      }),
    });
    const res = await response.json();
    const {data} = res;
    if (data && data.token) {
      await Router.push(`/contacts?token=${data.token}`)
    } else {
      alert('please enter valid data');
    }
  }

  const currentView = () => {
    switch (view) {
      case "signUp":
        return (
          <form onSubmit={onRegister}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    value={state.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name='email'
                    id="username"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    value={state.firstname}
                    onChange={(e) => handleChange(e)}
                    name='firstname'
                    type="firstname"
                    id="firstname"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    value={state.lastname}
                    onChange={(e) => handleChange(e)}
                    name='lastname'
                    type="lastname"
                    id="lastname"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    value={state.password}
                    onChange={(e) => handleChange(e)}
                    name='password'
                    type="password"
                    id="password"
                    required
                  />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => changeView("logIn")}>Have an Account?</button>
          </form>
        )
      case "logIn":
        return (
          <form onSubmit={onLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    value={state.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name='email'
                    id="username"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    value={state.password}
                    onChange={(e) => handleChange(e)}
                    name='password'
                    type="password"
                    id="password"
                    required
                  />
                </li>
                <li>
                  <i/>
                  <a onClick={() => changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView("signUp")}>Create an Account</button>
            <ReCaptchaV2
              sitekey={siteKey}
              onChange={handleToken}
              // onExpire={handleExpire}
            />
          </form>
        )
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required/>
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView("logIn")}>Go Back</button>
          </form>
        )
      default:
        break
    }
  };

  return <IndexWrapper>
    <section className="entry-page">
      {currentView()}
    </section>
  </IndexWrapper>;
}

const IndexWrapper = styled.div`
  .entry-page {
    display: grid;
    grid-template-columns: 1fr minmax(200px, 400px) 1fr;
    grid-template-rows: 1fr minmax(auto, 1fr) 1fr;
    grid-gap: 10px;
    width: 100%;
    height: 100vh;
    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    background-size: 400% 400%;
    animation: Gradient 15s ease infinite;
    box-sizing: border-box;

    form {
      grid-column: 2;
      grid-row: 2;
      display: grid;
      grid-gap: 10px;
      margin: auto 0;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);

      h2 {
        margin-bottom: 5px;
        text-align: center;
        text-shadow: 0 4px 16px #fff;
        font-size: 30px;
        font-weight: 100;
      }

      fieldset {
        margin: 0;
        background-color: #fff;
        border: none;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

        legend {
          padding: 5px;
          background-color: #fff;
          border-radius: 5px;
        }

        ul {
          margin: 0;
          padding: 0;

          li {
            display: grid;
            align-items: center;
            margin: 10px;

            a {
              color: #02c;
            }

            em {
              grid-column: span 2;
              text-align: center;
              padding: 5px;
            }

            label {
              text-align: left;
              padding-bottom: 2px;
            }

            input {
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 5px;

              &:hover {
                border: 1px solid #aaf;
              }
            }
          }
        }
      }

      button {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

        &:hover {
          background-color: #eef;
          border: 1px solid #aaf;
        }
      }
    }
  }

  @media only screen and (min-width: 420px) {
    form {
      h2 {
        font-size: 40px;
      }

      fieldset {
        ul {
          li {
            grid-template-columns: 100px 1fr;

            label {
              padding-right: 10px;
              padding-bottom: 0;
              text-align: right !important;
            }
          }
        }
      }
    }
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
`;


const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

import React, { Component } from 'react';
import firebase from 'firebase';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import lottie from 'lottie-web'
import './InterestForm.scss';
require("firebase/functions");

class InterestForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitFormActive: false,
      loading: false,
      loadingDone: false,
      inputs: {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      regex: {
        fullname: RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u),
        email:    RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: RegExp(/^.{6,32}$/i),
      },
      valid: {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      registered: false,
    }
    this.onInputChange  = this.onInputChange.bind(this);
    this.onEmailSubmit  = this.onEmailSubmit.bind(this);
    this.formIsValid    = this.formIsValid.bind(this);
    this.liveValidation = this.liveValidation.bind(this);
    this.formIsValid    = this.formIsValid.bind(this);
  }

  componentDidMount() {
    this.initFirebase()
    configureAnchors({offset: 0, scrollDuration: 1000})
    lottie.loadAnimation({
      container: document.getElementById('loading'),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/loading.json"
    });
    var done = 
    lottie.loadAnimation({
      container: document.getElementById('loadingDone'),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/done.json"
    });
    this.setState({
      done: done,
    })
  }

  initFirebase() {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: 'interest-form-brawl-gaming',
      databaseURL: "https://interest-form-brawl-gaming.firebaseio.com",
    });
    
  }

  onInputChange(e) {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value,
      }
    }) 
  }

  onEmailSubmit() {
    var addInterestedUser = firebase.functions().httpsCallable('addInterestedUser');
    addInterestedUser({
      fullname: this.state.inputs.fullname,
      email: this.state.inputs.email,
      password: this.state.inputs.password,
      confirmpassword: this.state.inputs.confirmpassword,
    }).then((res) => {
      console.log(res)
      this.setState({
        registered: true,
        loading: false,
        loadingDone: true,
      })
      this.state.done.play()
    }).catch((err) => {
      console.log(err)
    }) 
  }

  formIsValid(){
    const inputNames = ['fullname', 'email', 'password', 'confirmpassword']
    var inputStatus = [];
    inputNames.forEach(element => {
      inputStatus.push(this.state.valid[element])
    });
    this.setState({
      submitFormActive: !(inputStatus.includes('invalid') || inputStatus.includes('')),
    })
  }

  liveValidation(e) {
    const inputType = e.target.name
    const inputValue = e.target.value
    if (inputType !== "confirmpassword") {
      if (inputValue === "") {
        this.setState({
          valid: {
            ...this.state.valid,
            [inputType]: "",
          }
        }, () => {
          this.formIsValid()
        })
      } else if (this.state.regex[inputType].test(inputValue)) {
        this.setState({
          valid: {
            ...this.state.valid,
            [inputType]: "valid",
          }
        }, () => {
          this.formIsValid()
        })
      } else {
        this.setState({
          valid: {
            ...this.state.valid,
            [inputType]: "invalid",
          }
        }, () => {
          this.formIsValid()
        })
      }
    } else {
      if (inputValue === "") {
        this.setState({
          valid: {
            ...this.state.valid,
            [inputType]: "",
          }
        }, () => {
          this.formIsValid()
        })
      } else if (inputValue === this.state.inputs.password && this.state.valid.password === "valid") {
        this.setState({
          valid: {
            ...this.state.valid,
            [inputType]: "valid",
          }
        }, () => {
          this.formIsValid()
        })
      } else {
        this.setState({
          valid: {
            ...this.state.valid,
            [inputType]: "invalid",
          }
        }, () => {
          this.formIsValid()
        })
      }
    }
  }

  checkConfirmPass(e) {
    if (e.target.value === this.state.inputs.password && this.state.inputs.password !== "") {
      this.setState({
        valid: {
          ...this.state.valid,
          [e.target.name]: "valid",
        }
      }, () => {
        this.formIsValid()
      })
    } else if ((this.state.valid.confirmpassword === "valid" && e.target.value !== this.state.inputs.password) || this.state.inputs.password === "") {
      this.setState({
        valid: {
          ...this.state.valid,
          [e.target.name]: "",
        }
      }, () => {
        this.formIsValid()
      })
    }
  }

  render() {
    return(
      <ScrollableAnchor id={"interest-section"} >
        <section className="interest-form-container">
          <p className="interest-header">NOTICE OF INTEREST</p>
          <div id="loading" className={"loading " + (this.state.loading ? "active": "")} />
          <div id="loadingDone" className={"loadingDone " + (this.state.loadingDone ? "active": "")} />
          {!this.state.registered ?
            <div className={"form-container " + (this.state.loading ? "inactive": "")}>
              <div className="input-container">
                <input className={"form-input " + ((this.state.valid.fullname === "valid") ? "valid": "") + ((this.state.valid.fullname === "invalid") ? "invalid": "")} id="full-name-input" type="text" name="fullname" placeholder="Full Name" onChange={this.onInputChange} onBlur={this.liveValidation} autoComplete="off"/>
              </div>
              <div className="input-container">
                <input className={"form-input " + ((this.state.valid.email === "valid") ? "valid": "") + ((this.state.valid.email === "invalid") ? "invalid": "")} id="email-input" type='text' name="email" placeholder="E-mail" onChange={this.onInputChange} onBlur={this.liveValidation} autoComplete="off" />
              </div>
              <div className="input-container">
                <input className={"form-input " + ((this.state.valid.password === "valid") ? "valid": "") + ((this.state.valid.password === "invalid") ? "invalid": "")} id="password-input" type='password' name="password" placeholder="Password" onChange={this.onInputChange} onBlur={this.liveValidation} autoComplete="off"/>
              </div>
              <div className="input-container">
                <input className={"form-input " + ((this.state.valid.confirmpassword === "valid") ? "valid": "") + ((this.state.valid.confirmpassword === "invalid") ? "invalid": "")} id="confirm-password-input" type='password' name="confirmpassword" placeholder="Confirm Password" onChange={(e) => {this.onInputChange(e); this.checkConfirmPass(e);}} onBlur={this.liveValidation} automplete="off"/>
              </div>
              <div className="input-container">
                <button id="form-submit" className={(this.state.submitFormActive ? "active" : "")} onClick={this.state.submitFormActive ? (e) => {this.onEmailSubmit(e); this.setState({loading: true})} : () => {}}>Send</button>
              </div>
              <div className="interest-text">Not interested anymore? <div className="remove-interest">Unsubscribe here</div></div>
            </div>
            :  
            <React.Fragment>
              <div className="done-loading-container">
                <p className="interest-text">Thank you for showing interest! As soon as we launch something we will contact you.</p>
                <button className="register-new-button" onClick={() => {
                  this.state.done.stop()
                  this.setState({
                    registered: false,
                    valid: {
                      fullname: "",
                      email: "",
                      password: "",
                      confirmpassword: "",
                    },
                    loadingDone: false,
                    submitFormActive: false,
                  })
                  }
                }>Register another</button>
              </div>
            </React.Fragment>
          }
        </section>
      </ScrollableAnchor>
    )
  }
}

export default InterestForm;
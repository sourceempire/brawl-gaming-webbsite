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
      unsubscribeFormActive: false,
      loading: false,
      loadingDone: false,
      inputError: false,
      registered: false,
      registerFormShown: true,
      errortext: "",
      doneloadingtext: "",
      inputs: {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
        unsubemail: "",
        unsubpassword: "",
      },
      regex: {
        fullname: RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u),
        email:    RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        unsubemail: RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: RegExp(/^.{6,32}$/i),
        unsubpassword: RegExp(/^.{6,32}$/i),

      },
      valid: {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
        unsubemail: "",
        unsubpassword: "",
      },
    }
    this.onInputChange             = this.onInputChange.bind(this);
    this.onEmailSubmit             = this.onEmailSubmit.bind(this);
    this.liveValidation            = this.liveValidation.bind(this);
    this.formIsValid               = this.formIsValid.bind(this);
    this.changeForm                = this.changeForm.bind(this);
    this.liveValidationUnsubscribe = this.liveValidationUnsubscribe.bind(this)
    this.unsubFormIsValid          = this.unsubFormIsValid.bind(this)
  }

  componentDidMount() {
    this.initFirebase()
    configureAnchors({offset: 0, scrollDuration: 1000})
    lottie.loadAnimation({
      container: document.getElementById('loading'),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "loading.json"
    });
    var done = 
    lottie.loadAnimation({
      container: document.getElementById('loadingDone'),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "done.json"
    });
    this.setState({
      done: done,
    })
  }

  initFirebase() {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
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
        doneloadingtext: "Thank you for showing interest! As soon as we launch something we will contact you.",
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

  changeForm() {
    this.setState({
      registerFormShown: !this.state.registerFormShown,
      inputError: false,
      errortext: "",
      inputs: {
        ...this.state.inputs,
        password: "",
        confirmpassword: "",
        unsubemail: "",
        unsubpassword: ""
      },
      valid: {
        ...this.state.valid,
        password: "",
        confirmpassword: "",
        unsubemail: "",
        unsubpassword: ""
      }
    })
  }

  liveValidationUnsubscribe(e) {
    const inputType = e.target.name;
    const inputValue = e.target.value;
    if(inputValue === "") {
      this.setState({
        valid: {
          ...this.state.valid,
          [inputType]: "",
        }
      }, () => {
        this.unsubFormIsValid()
      })
    } else if (this.state.regex[inputType].test(inputValue)) {
      this.setState({
        valid: {
          ...this.state.valid,
          [inputType]: "valid",
        }
      }, () => {
        this.unsubFormIsValid()
      })
    } else {
      this.setState({
        valid: {
          ...this.state.valid,
          [inputType]: "invalid",
        }
      }, () => {
        this.unsubFormIsValid()
      })
    }
  }

  unsubFormIsValid() {
    const inputNames = ['unsubemail', 'unsubpassword']
    var inputStatus = [];
    inputNames.forEach(element => {
      inputStatus.push(this.state.valid[element])
    });
    this.setState({
      unsubscribeFormActive: !(inputStatus.includes('invalid') || inputStatus.includes('')),
    })
  }

  checkPasswordLength(e) {
    var value = e.target.value
    var n = value.length;
    if (n > 5) {
      this.setState({
        valid: {
          ...this.state.valid,
          [e.target.name]: 'valid',
        }
      }, this.unsubFormIsValid)
    } else {
      this.setState({
        valid: {
          ...this.state.valid,
          [e.target.name]: '',
        }
      }, this.unsubFormIsValid)
    }
  }

  onUnsubscribe() {
    var removeInterestedUser = firebase.functions().httpsCallable('removeInterestedUser');
    removeInterestedUser({
      email: this.state.inputs.unsubemail,
      password: this.state.inputs.unsubpassword,
    }).then((res) => {
      if (res.data.response === "error") {
        this.setState({
          loading: false,
          inputError: true,
          errortext: res.data.message,
          valid: {
            ...this.state.valid,
            unsubpassword: "",
            unsubemail: "",
          }
        })
      } else if (res.data.response === "success") {
        this.setState({
          loading: false,
          loadingDone: true,
          inputError: false,
          registered: true,
          errortext: "",
          doneloadingtext: "We are very sorry that you are leaving us. Welcome back at any time!",
          valid: {
            ...this.state.valid,
            unsubpassword: "",
            unsubemail: "",
          }
        })
        this.state.done.play()
      }
    }).catch((err) => {
      console.log(err)
    }) 
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
            { this.state.registerFormShown ?
              <React.Fragment>
                <div className="input-container">
                  <input className={"form-input " + ((this.state.valid.fullname === "valid") ? "valid": "") + ((this.state.valid.fullname === "invalid") ? "invalid": "")} id="full-name-input" type="text" name="fullname" placeholder="Full Name" onChange={this.onInputChange} onBlur={this.liveValidation} autoComplete="off" value={this.state.inputs.fullname}/>
                </div>
                <div className="input-container">
                  <input className={"form-input " + ((this.state.valid.email === "valid") ? "valid": "") + ((this.state.valid.email === "invalid") ? "invalid": "")} id="email-input" type='text' name="email" placeholder="E-mail" onChange={this.onInputChange} onBlur={this.liveValidation} autoComplete="off" value={this.state.inputs.email}/>
                </div>
                <div className="input-container">
                  <input className={"form-input " + ((this.state.valid.password === "valid") ? "valid": "") + ((this.state.valid.password === "invalid") ? "invalid": "")} id="password-input" type='password' name="password" placeholder="Password" onChange={this.onInputChange} onBlur={this.liveValidation} autoComplete="off" value={this.state.inputs.password}/>
                </div>
                <div className="input-container">
                  <input className={"form-input " + ((this.state.valid.confirmpassword === "valid") ? "valid": "") + ((this.state.valid.confirmpassword === "invalid") ? "invalid": "")} id="confirm-password-input" type='password' name="confirmpassword" placeholder="Confirm Password" onChange={(e) => {this.onInputChange(e); this.checkConfirmPass(e);}} onBlur={this.liveValidation} automplete="off" value={this.state.inputs.confirmpassword}/>
                </div>
                <div className="input-container">
                  <button id="form-submit" className={(this.state.submitFormActive ? "active" : "")} onClick={this.state.submitFormActive ? (e) => {this.onEmailSubmit(e); this.setState({loading: true})} : () => {}}>Send</button>
                </div>
                <div className="interest-text">Not interested anymore?
                  <div className="remove-interest" onClick={this.changeForm}>Unsubscribe here</div>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className="input-container">
                  <input className={"form-input " + ((this.state.valid.unsubemail === "valid") ? "valid": "") + ((this.state.valid.unsubemail === "invalid") ? "invalid": "")} id="email-input" type="text" name="unsubemail" placeholder="Email" onChange={this.onInputChange} onBlur={this.liveValidationUnsubscribe} autoComplete="off" value={this.state.inputs.unsubemail}/>
                </div>
                <div className="input-container">
                  <input className={"form-input " + ((this.state.valid.unsubpassword === "valid") ? "valid": "") + ((this.state.valid.unsubpassword === "invalid") ? "invalid": "")} id="password-input" type='password' name="unsubpassword" placeholder="Password" onChange={(e) => {this.onInputChange(e); this.checkPasswordLength(e)}} onBlur={this.liveValidationUnsubscribe} autoComplete="off" value={this.state.inputs.unsubpassword}/>
                </div>
                <div className="input-container">
                  <button id="form-submit" className={(this.state.unsubscribeFormActive ? "active" : "")} onClick={this.state.unsubscribeFormActive ? (e) => {this.onUnsubscribe(); this.setState({loading: true})} : () => {}}>Unsubscribe</button>
                </div>
                {this.state.inputError && <p id="errortext">{this.state.errortext}</p>}
                <div className="interest-text">
                  <div className="remove-interest" onClick={this.changeForm}>Back to register</div>
                </div>
              </React.Fragment>
            }
            </div>
            :  
            <React.Fragment>
              <div className="done-loading-container">
                <p className="interest-text">{this.state.doneloadingtext}</p>
                <button className="register-new-button" onClick={() => {
                  this.state.done.stop()
                  this.setState({
                    registered: false,
                    registerFormShown: true,
                    valid: {
                      fullname: "",
                      email: "",
                      password: "",
                      confirmpassword: "",
                    },
                    loadingDone: false,
                    submitFormActive: false,
                  })
                }}>Go to Register</button>
              </div>
            </React.Fragment>
          }
        </section>
      </ScrollableAnchor>
    )
  }
}

export default InterestForm;
import React from "react";
import validate from './assets/util/validate';

class Classwork extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: "",
        email: "",
        password: "",
        number: "",
      },
      err: {
        username: "",
        email: "",
        password: "",
        number: "",
      },
     
    }
  }
  handlechange = (getValue, keyName) => {
    //let value = !e ? this.state.fiels[keyName] : e.target.value;

    const copyState = { ...this.state };
    copyState.fields[keyName] = getValue;
    copyState.err[keyName] = "";
    console.log(copyState, '--err');
    this.setState(copyState);

    this.validateform(keyName);
  }

  validateform = (keyName) => {
    const copyState = { ...this.state };
    if (keyName === 'username') {
      if (!copyState.fields.username) { copyState.err[keyName] = "invalid" }
    }

    if (keyName === 'email') {
      const checkvalue = validate.EMAIL(copyState.fields[keyName]);
      if (checkvalue) { copyState.err[keyName] = "invalid" }
    }
    if (keyName === 'number') {
      const checkvalue = validate.NUM(copyState.fields[keyName]);
      if (!copyState.fields[keyName] || checkvalue) { copyState.err[keyName] = "invalid" }
    }
    if (keyName === 'password') {
      const checkvalue = validate.PASSWORD(copyState.fields[keyName]);
      if (checkvalue) { copyState.err[keyName] = "invalid" }
    }

    this.setState(copyState);
  }

  handleSumbit = (e) => {
    e.preventDefault();

    let checkErr = false;
    let checkValid = ['username', 'email', 'number', 'password'];

    checkValid.map((keyName, i) => {
     return this.validateform(keyName);
    });

    // this.validateform('username');
    // this.validateform('email');
    // this.validateform('number');
    // this.validateform('password');

    for (let keystate in this.state.err) {
      if (this.state.err[keystate]) {
        checkErr = true;
      }
    }

    if (checkErr) {
      console.log('--fail--')
    } else {
      console.log('--pass--')
    }

   
  }



  render() {
    return (
      <>
        
        <form>
          <input type="text" name="username" placeholder="username" autoComplete="off" onChange={(e) => { this.handlechange(e.target.value, 'username') }} />
          {this.state.err.username ? <div style={{ color: "red" }}>value not provided</div> : null}
          <br />
          <input type="email" name="email" placeholder="email" autoComplete="off" onChange={(e) => { this.handlechange(e.target.value, 'email') }} />
          {this.state.err.email ? <div style={{ color: "red" }}> invalid Email</div> : null}
          <br />
          <input type="text" name="number" placeholder="number" autoComplete="off" onChange={(e) => { this.handlechange(e.target.value, 'number') }} />
          {this.state.err.number ? <div style={{ color: "red" }} > invalid number</div> : null}
          <br />
          <input type="password" name="pasword" placeholder="password" autoComplete="off" onChange={(e) => { this.handlechange(e.target.value, 'password') }} />
          {this.state.err.password ? <div style={{ color: "red" }} >  password combination of lower, upper case letter with number and special Character</div> : null}
          <button onClick={(e) => { this.handleSumbit(e); }}>click</button>
        </form>


      </>

    )
  }
}

export default Classwork;
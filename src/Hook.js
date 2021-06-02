import React, { useState } from 'react'
import validate from './assets/util/validate';

function Hook() {
    const [state, setstate] = useState({
        fields: {
            username:'',
            email: "",
            password: "",
            number: "",
        },
        err: {
            username:'',
            email: "",
            password: "",
            number: "",
        }
    })
    const handlechange = (getValue, keyName) => {
        //let value = !e ? this.state.fiels[keyName] : e.target.value;

        const copyState = { ...state };
        copyState.fields[keyName] = getValue;
        copyState.err[keyName] = "";
        // console.log(copyState, '--err');
        setstate(() => {
            return copyState
        });
        console.log(setstate)
        validateform(keyName);
    }

    const validateform = (keyName) => {
        const copyState = { ...state };
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

        setstate(() => {
            return copyState
        });
    }
    const handleSumbit = (e) => {
        e.preventDefault();

        let checkErr = false;
        let checkValid = ['username', 'email', 'number', 'password'];

        checkValid.map((keyName, i) => {
            return validateform(keyName);
        });

        // this.validateform('username');
        // this.validateform('email');
        // this.validateform('number');
        // this.validateform('password');

        for (let keystate in state.err) {
            if (state.err[keystate]) {
                checkErr = true;
            }
        }

        if (checkErr) {
            console.log('--fail--')
        } else {
            console.log('--pass--')
        }


    }

    return (
        <>
            <form>
                <input type="text" name="username" placeholder="username" autoComplete="off" onChange={(e) => { handlechange(e.target.value, 'username') }} />
                {state.err.username ? <div style={{ color: "red" }}>value not provided</div> : null}
                <br />
                <input type="email" name="email" placeholder="email" autoComplete="off" onChange={(e) => { handlechange(e.target.value, 'email') }} />
                {state.err.email ? <div style={{ color: "red" }}> invalid Email</div> : null}
                <br />
                <input type="text" name="number" placeholder="number" autoComplete="off" onChange={(e) => { handlechange(e.target.value, 'number') }} />
                {state.err.number ? <div style={{ color: "red" }} > invalid number</div> : null}
                <br />
                <input type="password" name="pasword" placeholder="password" autoComplete="off" onChange={(e) => { handlechange(e.target.value, 'password') }} />
                {state.err.password ? <div style={{ color: "red" }} >  password combination of lower, upper case letter with number and special Character</div> : null}
                <button onClick={(e) => { handleSumbit(e); }}>click</button>
            </form>
        </>
    )
}

export default Hook

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Blocks } from "react-loader-spinner";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { passwordState, usernameState } from "../utils/account_state";

const Signup = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [gusername, setGusername] = useRecoilState(usernameState);
  const [gpassword, setGpassword] = useRecoilState(passwordState);

  const checkPassword = (password, passwordCheck) => {
    if (password === passwordCheck) {
      return true;
    } else {
      return false;
    }
  };

  const signupRequest = async () => {
    setLoading(true);
    if (checkPassword(password, passwordCheck)) {
      console.log("password is same");
      try {
        const response = await axios.post(
          "http://localhost:8080/wallet/account/new",
          { username: username, password: password }
        );
        console.log(response.data);
        setResult(response.data);
        setLoading(false);
      } catch (e) {}
    } else {
      console.log("password is different");
      setMessage("check password and password2");
      setLoading(false);
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    console.log(passwordCheck);
  };

  return (
    <Container>
      <div>
        <h1>Sign up</h1>
        <div className="loading">
          <Blocks visible={loading} height="80" width="80" />
        </div>
        <Stack spacing={1}>
          {!result ? (
            <>
              <label>Username</label>

              <TextField
                required
                id="outlined-required"
                label="Username"
                onChange={onChangeUsername}
              />

              <label>Password</label>

              <TextField
                required
                id="outlined-required"
                label="password"
                type="password"
                onChange={onChangePassword}
              />

              <label>Password(check)</label>

              <TextField
                required
                id="outlined-required"
                label="password2"
                type="password"
                onChange={onChangePasswordCheck}
              />

              {message ? <div className="message">{message}</div> : null}
              <Button variant="contained" onClick={signupRequest}>
                Submit
              </Button>
            </>
          ) : null}
          <hr />
          {result ? (
            <>
              <label>Result Message</label>
              <div className="message">{result.resultMessage}</div>
            </>
          ) : null}
          {result ? (
            <>
              <label>Wallet ID</label>
              <div className="message">{result.accountId}</div>
            </>
          ) : null}

          {result ? (
            <>
              <label>mnemonic</label>
              <div className="message">{result.mnemonic}</div>
            </>
          ) : null}

          <Button variant="contained">
            <Link to="/">Home</Link>
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default Signup;

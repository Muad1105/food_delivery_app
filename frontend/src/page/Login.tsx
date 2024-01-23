import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
axios.defaults.withCredentials = true;

import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

interface UserData {
  email: String;
  password: String;
}

const Login = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const [userNotFound, setUserNotFound] = useState(false);
  const [credentialsUnauthorised, setCredentialsUnauthorised] = useState(false);

  const handleUserData = async () => {
    setLoading(true);
    if (!userData.email || !userData.password) {
      setError(true);
      return;
    }
    const data = {
      email: userData.email,
      password: userData.password,
    };
    console.log("axios");

    axios
      .post("http://localhost:1112/user/login", data)
      .then((res) => {
        console.log(res.data);

        console.log("axios processed");
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log("err", err.response);
        setLoading(false);
        if (err.response.status == 404) {
          setUserNotFound(true);
        }
        if (err.response.status == 401) {
          setCredentialsUnauthorised(true);
        }
      });

    console.log("404");

    // console.log(resData);
  };

  const handlePassword = (password: String) => {
    setUserData((prev) => ({ ...prev, password }));
    setCredentialsUnauthorised(false);
  };

  const handleEmail = (email: String) => {
    setUserData((prev) => ({ ...prev, email }));
    setUserNotFound(false);
  };

  return (
    <div className="bg-slate-800 h-[100vh] flex justify-between items-center relative">
      <div className="absolute z-10 ml-[400px] top-[150px]">
        {loading && (
          <div>
            <Loading />
          </div>
        )}
      </div>
      <form className="border-2 border-yellow-900 bg-slate-600 text-[17px] flex flex-col items-center text-slate-100 w-[500px] h-[500px] gap-10 p-4 ml-[250px] rounded-md relative">
        <div className="text-3xl text-center mb-10">Signup To CarveDeli</div>
        {error && (
          <div className="text-slate-300 border-2 border-red-700 bg-red-700 px-6 absolute top-20 right-2 rounded-md">
            Please Enter Required Values
          </div>
        )}
        {userNotFound && (
          <div className="text-slate-300 border-2 border-red-700 bg-red-700 px-6 absolute top-20 right-2 rounded-md">
            User Not Found, Try Again.
          </div>
        )}
        {credentialsUnauthorised && (
          <div className="text-slate-300 border-2 border-red-700 bg-red-700 px-6 absolute top-20 right-2 rounded-md">
            Eamil/Password Doesn't Match.
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              className={
                !userData.email && error
                  ? "border-2 border-red-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[300px]"
                  : "border-2 border-blue-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[300px]"
              }
              placeholder="email"
              onChange={(e) => handleEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className={
                !userData.password && error
                  ? "border-2 border-red-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[300px]"
                  : "border-2 border-blue-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[300px]"
              }
              placeholder="password"
              onChange={(e) => handlePassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <Button variant="contained" onClick={handleUserData}>
            Submit
          </Button>{" "}
          <Button variant="contained">Cancel</Button>
        </div>
      </form>
      <div className=" top-0 right-0 bottom-0 w-[300px] border-2 border-yellow-800 h-[100vh] flex justify-center items-center bg-blue-700 text-slate-100">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-xl">Dont Have an Account</div>
          <div>Register</div>
          <Link to="/signup">
            <Button
              variant="outlined"
              style={{
                background: "yellow",
                textTransform: "capitalize",
                textDecoration: "underline",
              }}
            >
              Here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

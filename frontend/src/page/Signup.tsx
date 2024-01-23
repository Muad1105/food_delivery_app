import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "../components/Loading";

interface UserData {
  name: String;
  email: String;
  password: String;
  reEnterPassword: String;
}

const Signup = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const navigate = useNavigate();

  const [validUserData, setValidUserData] = useState({
    userValid: false,
    emailValid: false,
    passwordValid: false,
    passwordMatch: false,
  });

  const [passwordVisible, setpasswordVisible] = useState({
    password: false,
    reREnterPassword: false,
  });

  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState(false);

  const nameRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*_]).{4,}$/;
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9_]*@[a-zA-Z0-9._-]+$/;

  const handleUserData = async () => {
    setLoading(true);
    console.log("handle user Data");

    console.log(
      validUserData.userValid,
      validUserData.emailValid,
      validUserData.passwordValid,
      validUserData.passwordMatch
    );

    if (
      !validUserData.userValid ||
      !validUserData.emailValid ||
      !validUserData.passwordMatch ||
      !validUserData.passwordMatch
    ) {
      setError(true);
      return;
    }
    console.log("Primary Check Cleared");

    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    try {
      await axios
        .post("http://localhost:1112/user/signup", data)
        .then((res) => {
          console.log(res);
          setLoading(false);
          navigate("/login");
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleNameChange = (name: String) => {
    //Set User Data
    setUserData((prev) => ({ ...prev, name }));
    // Validate and set User Name valid
    const userValid = nameRegEx.test(name as string);
    setValidUserData((prev) => ({ ...prev, userValid }));
  };

  const handleEmailChange = (email: String) => {
    //Set Email Data
    setUserData((prev) => ({ ...prev, email }));
    // Validate and set Email Name valid
    const emailValid = emailRegex.test(email as string);
    setValidUserData((prev) => ({ ...prev, emailValid }));
  };

  const handlePasswordChange = (password: String) => {
    //Set Password Data
    setUserData((prev) => ({ ...prev, password }));
    // Validate and set Password Name valid
    const passwordValid = passwordRegEx.test(password as string);
    setValidUserData((prev) => ({ ...prev, passwordValid }));
  };

  const handleReEnterPasswordChange = (reEnterPassword: String) => {
    //Set Re Enter Password Data
    setUserData((prev) => ({ ...prev, reEnterPassword }));
    // Validate and set Re Enter Password Name valid
    userData.password === reEnterPassword &&
      setValidUserData((prev) => ({ ...prev, passwordMatch: true }));
  };

  return (
    <div className="bg-slate-800 h-[100vh] flex justify-between items-center relative">
      <div className="absolute">{loading && <Loading />}</div>
      <form className="border-2 border-yellow-900 bg-slate-600 text-[17px] flex flex-col items-center text-slate-100 w-[500px] h-[500px] gap-6 p-4 rounded-md  ml-[20vw] relative">
        <div className="text-3xl text-center mb-10">Signup To CarveDeli</div>
        {error && (
          <div className="text-slate-300 border-2 border-red-700 bg-red-700 px-6 absolute top-20 right-2 rounded-md">
            Please Enter Required Values
          </div>
        )}
        <div className="">
          <input
            type="text"
            className={
              //Error if userData is present && submit clicked && data Invalid
              (!userData.name && error) ||
              (userData.name && error && !validUserData.userValid)
                ? "border-2 border-red-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
                : "border-2 border-blue-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
            }
            placeholder="Username"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <input
            type="email"
            className={
              (!userData.email && error) ||
              (userData.email && error && !validUserData.emailValid)
                ? "border-2 border-red-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
                : "border-2 border-blue-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
            }
            placeholder="email"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type={
              passwordVisible.password
                ? userData.password && userData.password
                : "password"
            }
            className={
              (!userData.password && error) ||
              (userData.password && error && !validUserData.passwordValid)
                ? "border-2 border-red-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
                : "border-2 border-blue-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
            }
            placeholder="password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <div className="absolute right-2 top-1 text-slate-700 cursor-pointer">
            {userData.password.length > 0 &&
              (passwordVisible.password ? (
                <VisibilityIcon
                  onClick={() =>
                    setpasswordVisible((prev) => ({ ...prev, password: false }))
                  }
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() =>
                    setpasswordVisible((prev) => ({ ...prev, password: true }))
                  }
                />
              ))}
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type={
                passwordVisible.reREnterPassword
                  ? userData.reEnterPassword
                  : "password"
              }
              className={
                (!userData.reEnterPassword && error) ||
                (userData.reEnterPassword &&
                  error &&
                  !validUserData.passwordMatch)
                  ? "border-2 border-red-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
                  : "border-2 border-blue-800 h-[40px] w-[100%] bg-slate-300 px-4 text-slate-900 rounded-md w-[400px]"
              }
              placeholder="re-enter password"
              onChange={(e) => handleReEnterPasswordChange(e.target.value)}
            />
            <div className="absolute right-2 top-1 text-slate-700 cursor-pointer">
              {userData.reEnterPassword &&
                (passwordVisible.reREnterPassword ? (
                  <VisibilityIcon
                    onClick={() =>
                      setpasswordVisible((prev) => ({
                        ...prev,
                        reREnterPassword: false,
                      }))
                    }
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() =>
                      setpasswordVisible((prev) => ({
                        ...prev,
                        reREnterPassword: true,
                      }))
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <Button variant="contained" onClick={handleUserData}>
            Submit
          </Button>{" "}
          <Button variant="contained">Cancel</Button>
        </div>
      </form>
      <div className=" top-0 right-0 bottom-0 w-[300px] border-2 border-yellow-800 h-[100vh] flex justify-center items-center bg-blue-700 text-slate-100">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-xl">Already Have an Account</div>
          <div>Login</div>
          <Link to="/login">
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

export default Signup;

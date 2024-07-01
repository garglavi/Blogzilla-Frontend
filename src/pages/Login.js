import { useState } from "react";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
} from "reactstrap";
import Base from "../components/Base";
import { loginUser } from "../services/user-services";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";

const Login = () => {
  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log( loginDetail);
    //validation
    if ( 
      loginDetail.email.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Email or Password  is required !!");
      return;
    }

    // login details to set user details across app
    loginUser(loginDetail)
      .then((data) => {
        console.log("1st msg: "+loginDetail.email+ " , "+ loginDetail.password);
        console.log("2nd msg: keys array = ", Object.keys(data));

        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
          userContxtData.setUser({
            data: data,// data.user
            login: true,
          });
          navigate("/user/dashboard");
        });
        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="primary" inverse>
              <CardHeader>
              <h3> <center>Login here</center> </h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.email}
                      onChange={(e) => handleChange(e, "email")}
                    />
                  </FormGroup>

                  {/* password field */}

                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="light" outline>
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      outline
                      color="light"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
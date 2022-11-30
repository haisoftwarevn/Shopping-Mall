import "./sign-in-form.styles.scss";
import { useState } from "react";
import {
  signInWithPopupByGoogle,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordByGoogle,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const logGoogleUser = async () => {
    const response = await signInWithPopupByGoogle();

    console.log("Response Auth::", response);

    const userDocRef = await createUserDocumentFromAuth(response.user);

    console.log("userDocRef::", userDocRef);
  };

  ////////////
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInWithEmailAndPasswordByGoogle(
        email,
        password
      );
      console.log("EmailPassResponse::", response);
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          onChange={handleChange}
          value={email}
          type="email"
          required
        />
        <FormInput
          label="Password"
          name="password"
          onChange={handleChange}
          value={password}
          type="password"
          required
        />

        <div className="buttons-container">
          <Button buttonType="">Sign In</Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google">
            Sign In Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

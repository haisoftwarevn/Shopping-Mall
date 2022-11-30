import "./sign-up-form.component.jsx";
import { useState } from "react";
import {
  createUserWithEmailAndPasswordByGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.jsx";

import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  ////////////
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("not matched password");
      return;
    }

    try {
      const response = await createUserWithEmailAndPasswordByGoogle(
        email,
        password
      );

      if (response) {
        await createUserDocumentFromAuth(response.user, { displayName });

        setFormFields(defaultFormFields);
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          onChange={handleChange}
          type="text"
          name="displayName"
          value={displayName}
          required
        />

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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          type="password"
          required
        />

        <Button buttonType="">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

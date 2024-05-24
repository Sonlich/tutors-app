import React, { useState, useEffect } from "react";
import { Form, Formik, useField } from "formik";
import * as yup from "yup";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../../api";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export const PasswordField = ({ name, label }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        id={`outlined-adornment-${name}`}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={name}
      />
      {meta.touched && meta.error && (
        <Typography
          variant="caption"
          display="block"
          color="error"
          sx={{ mt: 1, ml: 1.5 }}
        >
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
};

export const LoginForm = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <h1>Login</h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordField name="password" label="Password" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  sx={{
                    backgroundColor: "var(--secondary-dark-color)",
                    "&:hover": {
                      backgroundColor: "var(--primary-element-color)",
                    },
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

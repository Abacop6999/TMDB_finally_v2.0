import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "nombre de usuario mínimo 8 caracteres")
        .required("nombre de usuario es requerido"),
      password: Yup.string()
        .min(8, "contraseña mínimo 8 caracteres")
        .required("contraseña es requerida"),
      displayName: Yup.string()
        .min(8, "nombre a mostrar mínimo 8 caracteres")
        .required("nombre de usuario a mostrar es requerido"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirmar contraseña no coincide")
        .min(8, "confirmar contraseña mínimo 8 caracteres")
        .required("confirmar contraseña es requerido"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      //console.log("asdasdasdasd");
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Registro exitoso");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="nombre de usuario"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
          InputProps={{
            style: { borderRadius: "13px" },
          }}
        />
        <TextField
          type="text"
          placeholder="nombre de usuario a mostrar"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
          InputProps={{
            style: { borderRadius: "13px" },
          }}
        />
        <TextField
          type="password"
          placeholder="contraseña"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
          InputProps={{
            style: { borderRadius: "13px" },
          }}
        />
        <TextField
          type="password"
          placeholder="confirmar contraseña"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
          InputProps={{
            style: { borderRadius: "13px" },
          }}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 , borderRadius: 3}}
        loading={isLoginRequest}
      >
        registrarse
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        iniciar sesión
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2, borderRadius: 3 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;

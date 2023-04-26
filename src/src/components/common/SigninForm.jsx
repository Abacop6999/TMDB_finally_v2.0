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

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "El nombre de usuario debe tener al menos 8 caracteres")
        .required("El nombre de usuario es obligatorio"),
      password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      //console.log("asdasdasdasd");
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Inicio de sesión exitoso");
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
            style: { borderRadius: "13px" }
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
            style: { borderRadius: "13px" }
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
        INICIAR SESIÓN
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1, borderRadius: 3 }} onClick={() => switchAuthState()}>
        REGISTRARSE
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;

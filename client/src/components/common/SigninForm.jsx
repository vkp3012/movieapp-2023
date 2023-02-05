import React, { useState } from 'react'
import { Alert , Box, Button, Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { setAuthModalOpen } from '../../redux/features/authModelSlice';
import userApi from '../../api/modules/user.api';
import { useFormik } from "formik";
import * as Yup from "yup";
import {setUser} from "../../redux/features/userSlice";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify"

const SigninForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [ isLoginRequest, setIsLogingRequest ] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const siginForm = useFormik({
        initialValues : {
            password : "",
            username : ""
        },
        validationSchema : Yup.object({
            username : Yup.string()
                .min(8,"username minimum 8 character")
                .required("username is required"),
            password : Yup.string()
                .min(8,"password minimum 8 character")
                .required("password is required")
            
        }),
        onSubmit : async values => {
            setErrorMessage(undefined);
            setIsLogingRequest(true);
            console.log("adhfkjewfhkjhjhg");
            const  { response, err} = await userApi.signin(values)
            setIsLogingRequest(false);

            if(response){
                siginForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success("sign in Success");
            }

            if(err) setErrorMessage(err.Message)
        }
    });

    return (
        <Box component="form" onSubmit={SigninForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField 
                    type = "text"
                    placeholder = "username"
                    name = " username"
                    fullWidth
                    value = {siginForm.values.username}
                    onChange = {siginForm.handleChange}
                    color='success'
                    error = {siginForm.touched.username && SigninForm.errors.username !== undefined}
                    helperText = { SigninForm.touched.username && SigninForm.errors.username}
                />
                <TextField 
                    type = "password"
                    placeholder = "password"
                    name = "password"
                    fullWidth
                    value = {siginForm.values.password}
                    onChange = {siginForm.handleChange}
                    color='success'
                    error = {siginForm.touched.password && SigninForm.errors.password !== undefined}
                    helperText = { SigninForm.touched.password && SigninForm.errors.password}
                />
            </Stack>

            <LoadingButton
                type = "submit"
                fullWidth
                size = "large"
                variant='contained'
                sx={{marginTop : 4}}
                loading = { isLoginRequest }
            >
                Sign in
            </LoadingButton>

            <Button
                fullWidth
                sx = {{marginTop : 1}}
                onClick = {() => switchAuthState()}
            >
                sign up
            </Button>

            {errorMessage && (
                <Box sx = {{ marginTop : 2}}>
                    <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
                </Box>
            )}
        </Box>
    )
}

export default SigninForm

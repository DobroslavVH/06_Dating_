import React from "react";
import SignIn from "../../../../../ui/screens/Auth/SignIn";
import getUserFactory from '../../../usecases/user/getUserFactory'

const SignInFactory = () => <SignIn
    getUser={getUserFactory()}
/>

export default SignInFactory
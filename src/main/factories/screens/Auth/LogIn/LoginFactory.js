import React from "react";
import LogIn from '../../../../../ui/screens/Auth/LogIn/index'
import getUserFactory from "../../../usecases/user/getUserFactory";

const LogInFactory = () => <LogIn
    getUser={getUserFactory()}
/>

export default LogInFactory
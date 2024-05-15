import React, { useState } from "react";
import { api, shortError} from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import PropTypes from "prop-types";
import { useError } from "components/ui/ErrorContext";

const FormField = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
            <input
                type={props.type}
                className="login input"
                placeholder="enter here..."
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const SignUp = (props) => {
    const navigate = useNavigate();
    const { showError } = useError();
    const [password, setPassword] = useState<string>(null);
    const [username, setUsername] = useState<string>(null);

    const doSignup = async () => {
        try {
            const requestBody = JSON.stringify({ username, password });
            const response = await api.post("/users", requestBody);

            // Store the token from the response headers into local storage
            const token = response.data.token;
            const id = response.data.id;

            localStorage.setItem("token", token);
            localStorage.setItem("id", id);

            // Navigate to the desired route
            navigate("/profile");
        } catch (error) {
            showError('Something went wrong during the sign up: ' + shortError(error));
        }
    };

    return (
        <BaseContainer>
            <Header />
            <div className="login container">
                <div className="login form">
                    <FormField
                        label="Username"
                        value={username || ""}
                        onChange={(un) => setUsername(un)}
                    />
                    <FormField
                        label="Password"
                        type="password"
                        value={password || ""}
                        onChange={(n) => setPassword(n)}
                    />
                    <div className="login password-hint" style={{ fontSize: '12px', marginBottom: '1px' }}>
                        Password should be at least 6 characters long.
                    </div>
                        <div className="login button-container" style={{ marginTop: '10px' }}>
                        <Button
                            disabled={!username || !password}
                            // width="100%"
                            onClick={() => {
                                // Check if the password length is greater than 6
                                if (password.length > 5) {
                                    doSignup();
                                } else {
                                    showError("Password should be longer than 6 characters.");
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            // width="100%"
                            onClick={() => navigate(`/home`)}
                        >
                            Go back
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default SignUp;
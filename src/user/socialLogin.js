import React, { Component } from "react";
import GoogleLogin from "react-google-login";
 
class SocialLogin extends Component {
    responseGoogle = response => {
        console.log(response);
    };
 
    render() {
        return (
            <div>
                <GoogleLogin
                    clientId={process.env.G_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        );
    }
}
 
export default SocialLogin;
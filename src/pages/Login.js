import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3001/Usuarios";
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    }
  };

  //guardar en el estado el valor de input
  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
    console.log(this.state.form);
  };

  //inicio de sesión del usuario
  iniciarSesion = async() => {
    await axios
      .get(baseUrl, {
        params: {
          email: this.state.form.email,
          password: md5(this.state.form.password)}})
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        // si response esn mayor a cero, inicio sesion de forma correcta
        if (response.length > 0) {
          var respuesta = response[0];

          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("apellidos", respuesta.apellidos, { path: "/"});
          cookies.set("nombres", respuesta.nombres, { path: "/" });
          cookies.set("email", respuesta.email, { path: "/" });

          alert(`Bienvenido ${respuesta.nombres} ${respuesta.apellidos}`);

          //si es correcto se redirije al App
          window.location.href = "./appMarvel";

        } else {
          alert("Fallo inicio de sesión email o password incorrectos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (cookies.get("email")) {
      window.location.href = "./appMarvel";
    }
  };

  render() {
    return (
      <div className = "containerPrincipal">
        <div className = "containerSecundario">
          <div className = "form-group">
            <label>E-mail: </label>
            <br />
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.handleChange}/>
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}/>
            <br />
            <button
              className="btn btn-primary"
              onClick = {() => this.iniciarSesion()}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

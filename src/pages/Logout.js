import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/Logout.css';

const cookies = new Cookies();

class Logout extends Component {

  //cerrar sesion
  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("apellidos", { path: "/" });
    cookies.remove("nombres", { path: "/" });
    cookies.remove("email", { path: "/" });
    window.location.href = "./";
  };

  componentDidMount() {
    if (!cookies.get("email")) {
      window.location.href = "./";
    }
  }

  render() {
    console.log("id: " + cookies.get("id"));
    console.log("apellidos " + cookies.get("apellidos"));
    console.log("nombres " + cookies.get("nombres"));
    console.log("email " + cookies.get("email")); 

    return (
      <div className="middleName">
        <h4>Hola!</h4>
        <br />
        <button 
        className="close"
        onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
      </div>
    );
  }
}

export default Logout;

/**
* @App Componente para mostrar el avatar de los contactos
*
* @author baldassare
* @version 0.1
*/

import React from 'react'
import Request from 'axios';

class ContactAvatar extends React.Component {
  constructor(props) {
    super(props);

  }

  /**
  * Funcion para eliminar el contacto desde el componente padre
  * @param {number} id id del contacto a eliminar
  */
  removeContact(id) {
    this.props.removeContact(id)
  }

  render() {

    const photoStyle = {
      backgroundImage: "url(" + this.props.photo + ")"
    };

  	return (
      <div className="media">
        <div className="contact-photo d-flex mr-3" style={ photoStyle }></div>
        <div className="media-body">
          <h6 className="contact-name">{ this.props.name }</h6>
          <a onClick={ this.removeContact.bind(this, this.props.id) } className="contact-remove" href="javascript:void(0);">Eliminar</a>
        </div>
      </div>
    )
  }
}

export default ContactAvatar

/**
* @App Componente para agregar un nuevo contacto
*
* @author baldassare
* @version 0.1
*/

import React from 'react'
import Request from 'axios'
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-modal-bootstrap'

class ContactNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      photo: "",
      name: "",
      description: ""
    }

    this.save = this.save.bind(this)
    this.toggle = this.toggle.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  /**
  * Abrir/cerrar el modal de Nuevo contacto
  */
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      photo: "",
      name: "",
      description: ""
    })
  }

  /**
  * Actualizar los campos del form si cambian de valor
  * @param {element} e elemento del formulario modificado
  */
  inputChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  /**
  * Guardar contactos
  * @param {element} e formulario nuevo contacto
  */
  save(e) {
    e.preventDefault()

    const self = this

    /**
     * Funcion para convertir la primera letra en mayuscula
     * @param {String} str palabra
     */
    function capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    Request.post("users", {
      "name": capitalize(self.state.name),
      "photo": self.state.photo,
      "description": self.state.description
    })
    .then(response => {

      // Limpiar formulario luego de guardar un contacto
      self.setState({
        photo: "",
        name: "",
        description: ""
      })

      self.toggle()
      self.props.updateContacts()
    })
  }

  render() {
    return (
      <Modal isOpen={ this.state.isOpen } onRequestHide={ this.toggle }>
        <form onSubmit={ this.save }>
          <ModalHeader>
            <ModalTitle>Agregar nuevo contacto</ModalTitle>
          </ModalHeader>
          <ModalBody>
              <div className="form-group">
                <label htmlFor="photo">Url imagen de perfil <span className="required">*</span></label>
                <input id="photo" name="photo" type="text" className="form-control" required="required"
                  value={ this.state.photo }
                  onChange={ this.inputChange } />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre <span className="required">*</span></label>
                <input id="name" name="name" type="text" className="form-control" required="required"
                  value={ this.state.name }
                  onChange={ this.inputChange } />
              </div>
              <div className="form-group last-form-group">
                <label htmlFor="description">Descripción <span className="required">*</span></label>
                <textarea id="description" name="description" className="form-control" required="required"
                  value={ this.state.description }
                  onChange={ this.inputChange }></textarea>
              </div>
              <div className="mx-auto text-center">
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
          </ModalBody>
        </form>
      </Modal>
    )
  }
}

export default ContactNew;

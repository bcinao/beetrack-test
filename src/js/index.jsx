/**
* @App Componente principal para iniciar la aplicacion
*
* @author baldassare
* @version 0.1
*/

import React from 'react'
import ReactDOM from 'react-dom'
import Request from 'axios';
import ContactSearch from './components/contact-search'
import ContactNew from './components/contact-new'
import ContactList from './components/contact-list'

Request.defaults.baseURL = 'http://localhost:3000/api/';
Request.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Clase inicial de la app
 */
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [] // lista de contactos
    }

    this.openModal = this.openModal.bind(this)
    this.updateContacts = this.updateContacts.bind(this)
  }

  /**
  * Actualizr los contactos luego de agregar un nuevo contacto
  */
  updateContacts() {
    this.refs.contactList.getContacts()
  }

  /**
  * Function para abrir el modal de un nuevo contacto
  */
  openModal(e) {
    this.refs.contactNew.toggle();
  }

  render() {
    return(
      <div>
        <ContactNew ref="contactNew" updateContacts={ this.updateContacts } />
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <ContactSearch />
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary btn-search btn-icon float-right" onClick={ this.openModal }>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              <span>Nuevo Contacto</span>
            </button>
          </div>
        </div>
        <ContactList ref="contactList" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
)

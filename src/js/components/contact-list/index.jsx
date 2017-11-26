/**
* @ContactList Componente para mostrar la lista de contactos
*
* @author baldassare
* @version 0.1
*/

import React from 'react'
import Request from 'axios'
import ContactAvatar from '../contact-avatar'

class ContactList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pageCurrent: 1, // Pagina actual
      contacts: [] // lista de contactos
    }

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.removeContact = this.removeContact.bind(this)
  }

  /**
  * Regresar a la pagina anterior
  */
  prevPage() {

    if (pageCurrent == 1) return;

    const pageCurrent = this.state.pageCurrent - 1

    this.getContacts(pageCurrent)
  }

  /**
  * Avanzar a la siguiente pagina
  */
  nextPage() {
    const pageCurrent = this.state.pageCurrent + 1

    this.getContacts(pageCurrent)
  }

  /**
  * Obtener la lista de contactos
  * @param {number} _page numero de pagina
  * @param {string} _limit cantidad de items a mostrar
  */
  getContacts(_page = 1, _limit = 10) {
    const self = this

    Request.get('/users?_page=' + _page + '&_limit=' + _limit)
      .then(response => {

        self.setState({
          contacts: response.data,
          pageCurrent: _page
        })
      })
  }

  /**
  * Remover un contacto de la lista
  * @param {number} id id del contacto a eliminar
  */
  removeContact(id) {
    const self = this

    Request.delete("users/" + id)
      .then(function (response) {
        self.getContacts()
      });
  }

  /**
   * Obtener la lista de contactos despues de montar el componente
   */
  componentDidMount() {
    this.getContacts()
  }

  render() {
    return (
      <div>
        <div className="list-contacts">
          <div className="contact-header">
            <div className="row">
              <div className="col-sm-4">
                <div className="cell">Nombre</div>
              </div>
              <div className="col d-none d-sm-block">
                <div className="cell">Descripción</div>
              </div>
            </div>
          </div>
          <div className="contact-body">
            {
              this.state.contacts.map((contact, key) =>
                <div className="row" key={ key }>
                  <div className="col-sm-4">
                    <div className="cell">
                      <ContactAvatar id={ contact.id }
                                      photo={ contact.photo }
                                      name={ contact.name }
                                      removeContact={ this.removeContact } />
                    </div>
                  </div>
                  <div className="col">
                    <div className="cell">
                      <p className="contact-description">{ contact.description }</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="contact-pagination">
          <span className={ this.state.pageCurrent == 1 ? "prev-page invisible" : "prev-page" } onClick={ this.prevPage }> <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Página anterior</span>
          <span className="next-page" onClick={ this.nextPage } ref="nextPage">Siguiente página <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></span>
        </div>
      </div>
    )
  }
}

export default ContactList

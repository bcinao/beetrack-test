/**
* @App Componente para buscar los contactos
*
* @author baldassare
* @version 0.1
*/

import React from 'react'
import ReactDOM from 'react-dom'
import Request from 'axios'
import ContactAvatar from '../contact-avatar'

class ContactSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      result: []
    }

    this.search = this.search.bind(this)
  }

  /**
   * Buscar contactos
   */
  search(e) {

    const query = e.target.value.toLowerCase()

    if (!query) {
      this.setState({
          result: []
      })

      return
    }

    Request.get("users?q=" + query)
      .then(response => {
        this.setState({
            result: response.data
        })
      })
  }

  componentDidMount() {
    this.inputSearch.focus()
  }

  render() {
    return (
      <div className="input-group">
        <input className="form-control" type="text" placeholder="Buscar contacto..." ref={(input) => { this.inputSearch = input }} onChange={ this.search } />
        <i className="fa fa-search" aria-hidden="true"></i>
        <div id="search-list" className="search-list">
          {
            this.state.result.map((contact, key) => {
              return <ContactAvatar key={ key }
                                    id={ contact.id }
                                    photo={ contact.photo }
                                    name={ contact.name } />
            })
          }
        </div>
      </div>
    )
  }
}

export default ContactSearch

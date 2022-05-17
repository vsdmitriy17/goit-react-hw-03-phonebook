import React, { Component } from 'react';
import styles from './App.module.css';
import ContactList from './components/contactList/ContactList.jsx';
import ContactForm from './components/contactForm/ContactForm.jsx';
import Filter from './components/filter/Filter.jsx';

class App extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: ''
    }

    formSubmit = data => {
        this.setState(prevState => {
            const isNameExist = prevState.contacts.find(contact => contact.name === data.name);
            return (isNameExist ? alert(`${data.name} is already in contacts`) : {...prevState, contacts: [data, ...prevState.contacts]}); 
        })
    }

    deleteContact = (currentId) => {
        this.setState(prevState => {
            return {
                ...prevState,
                contacts: prevState.contacts.filter(contact => contact.id !== currentId),
            }
        })
    }

    changeFilter = (evt) => {
        this.setState({
            ...this.state,
            filter: evt.currentTarget.value,
        })
    }

    getVisibleContacts = () => {
        const filterNormalized = this.state.filter.toLowerCase();
        return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(filterNormalized));
    }
    
    render() {
        const visibleContacts = this.getVisibleContacts();

        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Phonebook</h1>
                <ContactForm onSubmit={this.formSubmit}/>

                <h2 className={styles.title}>Contacts</h2>
                <Filter value={this.state.filter} onChangeFilter={this.changeFilter}/>
                <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
            </div>
        );
    };
};

export default App;

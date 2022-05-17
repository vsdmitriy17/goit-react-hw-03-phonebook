import React, { Component } from 'react';
import { nanoid } from "nanoid";
import styles from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    handleSubmit = evt => {
        evt.preventDefault();
        const data = {
            id: nanoid(),
            ...this.state,
        }
        this.props.onSubmit(data);
        this.resetForm();
    }

    handleInputChange = evt => {
        this.setState({[evt.currentTarget.name]: evt.currentTarget.value});
    }

    resetForm = () => {
        this.setState({
            name: '',
            number: ''
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <label className={styles.formLabel}>
                    Name
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        className={styles.formInput}
                    />
                </label>

                <label className={styles.formLabel}>
                    Number
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={this.state.number}
                        onChange={this.handleInputChange}
                        className={styles.formInput}
                    />
                </label>

                <button type="submit" className={styles.formBtn}>Add contact</button>
            </form>
        );
    }
};

export default ContactForm;
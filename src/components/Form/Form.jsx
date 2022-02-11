import { useState,useEffect } from "react";
import PropTypes from "prop-types";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import {useGetContactsQuery,  useAddContactMutation} from '../../redux/contact/contact-reducer';
import { onError, onWarning } from '../../utilits/toast';
import s from "./Form.module.css";

export default function Form() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const {  data: contacts } = useGetContactsQuery();
  const [addContact, { error }] = useAddContactMutation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { name, phone: number };
    const isAlreadyContacts =contacts.find((el) => el.name.toLowerCase() === name.toLowerCase())
    .length !== 0;

    if (isAlreadyContacts) {
      onWarning(`Contact ${name} already exist`)
    } else {
      addContact( newContact)
    }
    setName("");
    setNumber("");
  };
  useEffect(() => {
    if (error) onError(`${error.status} ${error.data.msg}`)
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label  className={s.label}>
        Name
        <input
          id={"id"}
          className={s.input}
          type="text"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={(e) => setName(e.target.value)}
        />
        {""}
      </label>
      <label   className={s.label}>
        Number
        <input
          id={"number"}
          type="tel"
          className={s.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          value={number}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button type="submit" className={s.button}>
   <ContactPhoneIcon fontSize="small"/>  Add contact 
      </button>
    </form>
  );
}

Form.protoType = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
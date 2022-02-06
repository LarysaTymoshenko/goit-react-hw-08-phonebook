import { Routes, Route } from 'react-router-dom';
import { useGetContactsQuery } from '../redux/contact/contact-reducer';
import Section from '../components/Section/Section';
import Form from '../components/Form/Form.jsx';
import ListContacts from '../components/ListContacts/ListContacts';
import Filter from '../components/Filter/Filter';

export default function ContactsPage() {
  const { data } = useGetContactsQuery();

  return (
    <>
      <Routes>
        <Route
          path="add"
          element={
            <Section title="Phonebook">
              <Form />
            </Section>
          }
        />
      </Routes>
      <Section title="Contacts">
        {data && data.length >= 2 && <Filter />}
        <ListContacts />
      </Section>
    </>
  );
}

import { ToastContainer} from 'react-toastify';
import Form from "../Form/Form";
import Section from "../Section/Section";
import ListContacts from "../ListContacts/ListContacts";
import Filter from "../Filter/Filter";
import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  
  return (
    <div className={s.container}>
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contact">
          <Filter/>
        <ListContacts />
      </Section>
       <ToastContainer />
    </div>
  );
}

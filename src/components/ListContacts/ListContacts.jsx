import{useEffect} from "react";
import { useSelector} from "react-redux";
import PropTypes from "prop-types";
import { useGetContactsQuery} from '../../redux/contact/contact-reducer';
import { getFilter } from '../../redux/filter/filter-selectors';
import { onError } from '../../utilits/toast';
import Loader from '../Loader/Loader';
import ContactItem from "./ContactItem/ContactItem";
import s from "./ListContact.module.css";


const ListContacts = () => {
  const { data, error, isFetching } = useGetContactsQuery()
  const filter = useSelector(getFilter);
  
  useEffect(() => {
    if (error) onError(`${error.status} ${error.data}`)
  }, [error]);
 
  return (
    <ul>
       {isFetching && <Loader />}
     {data &&
        data
          .filter((el) => el?.name.toUpperCase().includes(filter.toUpperCase()))
          .map((el) => (
            <ContactItem
          key={el.id}
           id={el.id}
          className={s.item}
          nameContact={el.name}
          numberContact={el.phone}
            />
        ))}
      </ul>
  
  );
};
ListContacts.propTypes = {
  listContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
 
};

 export default ListContacts;

import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/filter/filter-selectors';
import { setFilter } from '../../redux/filter/filter-actions';
import s from "./Filter.module.css";

function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onFilter = (value) => dispatch(setFilter(value));

  return (
    <label className={s.label}>
      Find contact by name
      <input
        id={'name'}
        type="text"
        name="filter"
        className={s.input}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={filter}
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
         onInput={e => onFilter(e.target.value)}
      />
    </label>
  );
}


export default Filter;

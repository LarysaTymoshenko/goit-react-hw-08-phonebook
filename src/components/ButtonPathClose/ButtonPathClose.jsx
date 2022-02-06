import { ButtonClose } from './ButtonClose.styled';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ButtonPathClose() {
  const location = useLocation();
  const navigate = useNavigate();

  const onClose = () => {
    const path = location.pathname.split('/');
    path.length -= 1;
    navigate(path.join('/'));
  };

  return (
    <ButtonClose onClick={onClose}>
      <CloseIcon fontSize="large" />
    </ButtonClose>
  );
}

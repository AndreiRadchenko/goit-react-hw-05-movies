import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as style from './GoBackButton.styled';
import PropTypes from 'prop-types';

export const GoBackButton = ({ backLinkHref }) => {
  return (
    <style.BtnArrow to={backLinkHref}>
      <AiOutlineArrowLeft />
      Go back
    </style.BtnArrow>
  );
};

GoBackButton.propType = {
  backLinkHref: PropTypes.object.isRequired,
};

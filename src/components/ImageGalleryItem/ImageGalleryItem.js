import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, url, onClick }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={url}
        alt="Result of your query"
        id={id}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;

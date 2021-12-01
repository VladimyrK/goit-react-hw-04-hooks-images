import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import fetchPixabayAPI from '../../services/pixabayAPI';

import Preview from '../Preview';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import LargeImage from '../LargeImage';
import ButtonLoadMore from '../ButtonLoadMore';
import Spiner from '../Spiner';

function ImageFinder({ query }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [onFetch, setOnFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    let ignore = false;

    async function renderImages() {
      togleOnFetch();
      try {
        const newImages = await fetchPixabayAPI(query, page);

        if (newImages.length === 0) {
          const error = new Error('No images for this query');
          errorStatus(error);
        } else {
          if (!ignore) {
            setImages(images => [...images, ...newImages]);
            setStatus('resolved');
          }

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        errorStatus(error);
      }
      togleOnFetch();
    }

    query && renderImages();

    return () => {
      ignore = true;
    };
  }, [page, query]);

  const errorStatus = error => {
    setError(error);
    setStatus('rejected');
  };

  const togleOnFetch = () => {
    setOnFetch(onFetch => !onFetch);
  };

  const togleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onImageClick = e => {
    setLargeImgURL(
      images.find(image => image.id === Number(e.target.id)).largeImageURL,
    );
    togleModal();
  };

  if (status === 'idle') {
    return <Preview />;
  }

  if (status === 'rejected') {
    return <div>{error.message}</div>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery images={images} onClick={onImageClick} />

        {showModal && (
          <Modal onClose={togleModal}>
            <LargeImage url={largeImgURL} />
          </Modal>
        )}

        {onFetch && <Spiner />}

        <ButtonLoadMore onLoadMore={() => setPage(page => page + 1)} />
      </>
    );
  }
}

ImageFinder.propTypes = {
  query: PropTypes.string,
};

export default ImageFinder;

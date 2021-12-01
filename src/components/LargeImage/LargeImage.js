import PropTypes from 'prop-types';

function LargeImage({ url }) {
  return <img src={url} alt="Large sample" />;
}

LargeImage.propTypes = {
  url: PropTypes.string,
};

export default LargeImage;

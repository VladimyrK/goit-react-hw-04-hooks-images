import Loader from 'react-loader-spinner';

import s from './Spiner.module.css';

function Spiner() {
  return (
    <div className={s.Spiner}>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
}

export default Spiner;

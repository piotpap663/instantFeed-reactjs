import React from 'react';

import styles from './PostContent.module.scss';

export default ({ text, images }) => (
  <div className={styles.postContainer}>
    <span>
      {text}
    </span>
    <div className={styles.poster}>
      {images && <img src={images} alt="" />}
    </div>
  </div>

)

import React, { Component } from 'react';

import { ReactComponent as HeartIcon } from '../../resources/icons/instagram_activity.svg';
import { ReactComponent as LabelIcon } from '../../resources/icons/label_icon.svg';
import { ReactComponent as MessageIcon } from '../../resources/icons/message_icon.svg';
import { ReactComponent as UploadIcon } from '../../resources/icons/upload_icon2.svg';
import styles from './PostImage.module.scss';
import sampleImage from './sample.jpg';

class PostImage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getLastTwoComments = () => {
    const { DATA } = this.props;

    return DATA.comments || [];
  };

  render() {
    const { DATA } = this.props;

    return (
      DATA && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div>
                <img className={styles.headerLogo} src={sampleImage} alt="" />
                <span className={styles.author}>
                  {
                    'mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy mens.legacy '
                  }
                </span>
              </div>
              <span className={styles.menu}>...</span>
            </div>
            <div className={styles.pictureContainer}>
              {DATA.images && <img src={DATA.images} alt="" />}
            </div>

            <div className={styles.postInfo}>
              <div className={styles.icons}>
                <div>
                  <HeartIcon />
                  <MessageIcon />
                  <UploadIcon />
                </div>
                <div>
                  <LabelIcon />
                </div>
              </div>
              <div className={styles.likes}>Liczba polubień: 6 046</div>
              <div className={styles.info}>
                <div className={styles.authorPanel}>
                  <span className={styles.author}>{DATA.author}</span>
                </div>
                <span className={styles.description}>{DATA.description}</span>
                <button className={styles.showMoreComments}>
                  Zobacz wszystkie komentarze: 71
                </button>
                <div className={styles.commentsPanel}>
                  {this.getLastTwoComments().map((comment, index) => (
                    <div key={index} className={styles.comment}>
                      <span className={styles.author}>
                        {comment.author.name}
                      </span>
                      <span>{comment.value}</span>
                    </div>
                  ))}
                  <div className={styles.addComment}>
                    <textarea placeholder="Dodaj komentarz" />
                    <div>
                      <button>Opublikuj</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

PostImage.propTypes = {};

export default PostImage;

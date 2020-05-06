import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../../services/api';
import styles from './AddPost.module.scss';

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    userId: state.auth.id
  };
}

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      errors: [],
      text: '',
      file64: '',
      uploaded: false,
      uploadedText: 'Thank you'
    }

  }
  handleErrors(errors) {
    this.setState({ errors })
  }

  fileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    const data = {
      authorId: this.props.userId,
      image: this.state.file64,
      text: this.state.text,
    };

    return addPost(data)
      .then((response) => {
        if (response.data.info) {
          alert(response.data.info);
        } else {
          this.setState({
            uploaded: true,
            file: null,
            errors: [],
            text: '',
            file64: '',
          })
        }
      })
      .catch((errors) => {
        this.setState({ errors })
      });
  }

  onChange = (e) => {
    this.setState({ file: e.target.files[0] })
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({ file64: reader.result });

    }, false);
    reader.readAsDataURL(e.target.files[0]);
  }

  onFormSubmit = (e) => {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file);
  }

  handleText(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    const { text, errors, uploaded, uploadedText } = this.state;
    return (
      <div className={styles.addPost}>
        {uploaded && (
          <p>{uploadedText}</p>
        )}
        {!uploaded && <form onSubmit={this.onFormSubmit}>

          <h1>Dodawanie posta</h1>
          <input type="file" onChange={this.onChange} />
          <textarea placeholder="Wpisz treść posta" name="text" id="text" cols="30" rows="10" onChange={(e) => this.handleText(e)} defaultValue={text}></textarea>
          <div className="errors">{errors.toString()}</div>

          <button type="submit">Dodaj post</button>
        </form>}
        {errors}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(DashboardPage);
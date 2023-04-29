import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import { Modal } from 'bootstrap';
import 'bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='left-content'>
                        <div className="input-group mb-3 top-50 start-50 translate-middle">
                            <input type="text" className="form-control search-box" placeholder="Search for anything here.." />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='language'>
                            <FontAwesomeIcon size="lg" className='icon-language' icon={faLanguage} />
                            <select className="form-select form-select-language" aria-label="Default select example">
                                <option value="2" selected>English</option>
                                <option value="1">Viet Nam</option>
                            </select>
                            {/* <div className={language === LANGUAGES.VI ? 'language-vi active' : "language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI)} > VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : "language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN)} > EN</span></div> */}
                        </div>
                        <div className='time'>
                            <div className='up-content'>
                                <span>
                                    <FontAwesomeIcon icon={faSun} />
                                </span>
                                <p className='align-middle text'>Good Morning</p>
                            </div>
                            <div className='down-content'>
                                <p className='align-middle left-text'>12 May 2023</p>
                                <p className='align-middle right-text'>24:00:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

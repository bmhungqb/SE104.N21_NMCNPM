import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import 'bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import { Modal } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMagnifyingGlass, faMoon } from "@fortawesome/free-solid-svg-icons";
import { event } from 'jquery';
import e from 'cors';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            sessionEN: '',
            sessionVI: '',
            isMorning: true,
        }
    }
    refreshClock = () => {
        this.setState({
            time: new Date()
        })
    }
    componentDidMount() {
        this.timerId = setInterval(() => this.refreshClock(), 1000);
        if (this.state.time.getHours() < 12) {
            this.setState({
                sessionEN: " Morning",
                sessionVI: " Buổi sáng",
            })
        } else if (this.state.time.getHours() < 18) {
            this.setState({
                sessionEN: " Afternoon",
                sessionVI: " Buổi chiều"
            })
        } else {
            this.setState({
                sessionEN: " Evening",
                sessionVI: " Buổi tối",
                isMorning: false
            })
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    changeLanguage = (e) => {
        if (e.target.value === "en") {
            this.props.changeLanguageAppRedux(LANGUAGES.EN)
        }
        else {
            this.props.changeLanguageAppRedux(LANGUAGES.VI)
        }
    }
    render() {
        const { time, sessionEN, sessionVI } = this.state;
        let language = this.props.language;
        let placeholder = FormattedMessage.id
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='left-content'>
                        {/* <div className="input-group mb-3 top-50 start-50 translate-middle">
                            <FormattedMessage id='header.placeholder-search'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        className="form-control search-box"
                                        placeholder={msg}
                                    />
                                )}
                            </FormattedMessage>
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div> */}
                    </div>
                    <div className='right-content'>
                        <div className='language'>
                            <FontAwesomeIcon size="lg" className='icon-language' icon={faLanguage} />
                            <select
                                className="form-select form-select-language"
                                value={language}
                                onChange={(e) => this.changeLanguage(e)}
                            >
                                <option
                                    value="en">English
                                </option>
                                <option
                                    value="vi">Việt Nam
                                </option>
                            </select>
                        </div>
                        <div className='time'>
                            <div className='up-content'>
                                <span>
                                    {this.state.isMorning ? <FontAwesomeIcon icon={faSun} color='#ffc800' fontSize={'16px'} /> :
                                        <FontAwesomeIcon icon={faMoon} color='#5f798e' fontSize={'16px'} />
                                    }
                                </span>
                                <p className='align-middle text mt-3'>
                                    <FormattedMessage id='header.session' />
                                    {language == LANGUAGES.VI ? sessionVI : sessionEN}
                                </p>
                            </div>
                            <div className='down-content'>
                                <p className='align-middle left-text'>
                                    {time.toDateString()}
                                </p>
                                <p className='align-middle right-text'>
                                    {time.toLocaleTimeString()}
                                </p>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './dataDay.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions/appActions';
import { withRouter } from 'react-router';
import 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import * as actions from "../../../store/actions/index"
class DataDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthlyRevenue: undefined,
            monthlyNewCustomer: undefined,
            monthlyBookSoldQuantity: undefined,
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        this.props.fetchMonthStatistic(new Date().getMonth() + 1)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentMonthStatistic !== this.props.currentMonthStatistic) {
            this.setState({
                monthlyRevenue: this.props.currentMonthStatistic["monthlyRevenue"],
                monthlyNewCustomer: this.props.currentMonthStatistic["monthlyNewCustomer"],
                monthlyBookSoldQuantity: this.props.currentMonthStatistic["monthlyBookSoldQuantity"],
            })
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='data-day-container'>
                    <div className='data-day-header'>
                        <div className='content-left'>
                            <p className='text-up'>Home</p>
                            <p className='text-down'>A quick data overview of the store</p>
                        </div>
                    </div>
                    <div className='data-day-content'>
                        <div className='visualize-data'>
                            <div className='box-data data-sold-money'>
                                <div className='content-up'>
                                    <FontAwesomeIcon className='icon-left' icon={faMoneyCheckDollar} size='lg' />
                                    <p className='text-data'>{this.state.monthlyRevenue}</p>
                                    <span className='percent'>
                                        <FontAwesomeIcon className='icon-right' icon={faArrowUpLong} />
                                        <p className='text-percent'>12%</p>
                                    </span>
                                </div>
                                <p>Month's sold books</p>
                            </div>
                            <div className='box-data data-purchase-book'>
                                <div className='content-up'>
                                    <FontAwesomeIcon className='icon-left' icon={faMoneyCheckDollar} size='lg' />
                                    <p className='text-data'>{this.state.monthlyBookSoldQuantity}</p>
                                    <span className='percent'>
                                        <FontAwesomeIcon className='icon-right' icon={faArrowUpLong} />
                                        <p className='text-percent'>12%</p>
                                    </span>
                                </div>
                                <p>Month's purchased books</p>
                            </div>
                            <div className='box-data data-customer'>
                                <div className='content-up'>
                                    <FontAwesomeIcon className='icon-left' icon={faMoneyCheckDollar} size='lg' />
                                    <p className='text-data'>{this.state.monthlyNewCustomer}</p>
                                    <span className='percent'>
                                        <FontAwesomeIcon className='icon-right' icon={faArrowUpLong} />
                                        <p className='text-percent'>12%</p>
                                    </span>
                                </div>
                                <p>Month's customers</p>
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
        currentMonthStatistic: state.statistic.currentMonthStatistic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchMonthStatistic: (id) => dispatch(actions.fetchMonthStatistic(id))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataDay));

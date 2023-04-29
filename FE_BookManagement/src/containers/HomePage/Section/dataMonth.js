import React, { Component } from 'react';
import { connect } from 'react-redux';
import './dataMonth.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions/appActions';
import { withRouter } from 'react-router';
import 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class DataMonth extends Component {
    constructor(props) {
        super(props);
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        var startDate = new Date();
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='data-month-container'>
                    <div className='content-left'>
                        <div className="chart-data">
                            <Line
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'Money',
                                            data: [12, 34, 56, 102, 676, 98, 46],
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                            tension: 0.5
                                        },
                                        {
                                            label: 'Book',
                                            data: [105, 134, 156, 12, 676, 98, 46],
                                            borderColor: 'rgb(53, 162, 235)',
                                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                            tension: 0.5
                                        },
                                        {
                                            label: 'Customer',
                                            data: [505, 34, 56, 12, 100, 98, 46],
                                            borderColor: 'rgb(53, 162, 100)',
                                            backgroundColor: 'rgba(53, 162, 100, 0.5)',
                                            tension: 0.5
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                            align: "right"
                                        },
                                        title: {
                                            display: true,
                                            text: 'Statistic',
                                            font: { size: 25 }
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false,
                                            }
                                        },
                                        y: {
                                            grid: {
                                                display: true,
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='box box-up'>
                            <div className='content-up'>
                                <p>Quick Report</p>
                                <DatePicker className='datepicker' selected={startDate} />
                            </div>
                            <div className='content-down'>
                                <div className='left'>
                                    <p className='number'>70,856</p>
                                    <p className='text'>Qty of Books Sold</p>
                                </div>
                                <div className='right'>
                                    <p className='number'>5,288</p>
                                    <p className='text'>Invoices Generated</p>
                                </div>
                            </div>
                        </div>
                        <div className='box box-down'>
                            <div className='content-up'>
                                <p>Customers</p>
                                <span>
                                    <p>Go to Customers Page</p>
                                    <FontAwesomeIcon className='icon-right' icon={faAnglesRight} />
                                </span>
                            </div>
                            <div className='content-down'>
                                <div className='left'>
                                    <p className='number'>845</p>
                                    <p className='text'>Total n.o of Customers</p>
                                </div>
                                <div className='right'>
                                    <p className='number'>Adalimumab</p>
                                    <p className='text'>Frequently bought Item</p>
                                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataMonth));

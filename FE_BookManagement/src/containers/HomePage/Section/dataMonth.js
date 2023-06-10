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
import { faAnglesRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ModalInvetory from '../Modal/ModalInvetory';
import ModalDebt from '../Modal/ModalDebt';
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
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';
import DatePicker from 'react-flatpickr';
class DataMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalInventory: false,
            isOpenModalDebt: false,
            listBook: [],
            listCustomer: [],
            listMoney: [],
            dateInventory: undefined,
            dateDept: undefined
        };
    }
    toggleDebtModal = () => {
        this.setState({
            isOpenModalDebt: !this.state.isOpenModalDebt,
        })
    }
    toggleInventoryModal = () => {
        this.setState({
            isOpenModalInventory: !this.state.isOpenModalInventory,
        })
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        this.props.fetchAllMonthStatistics()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allMonthStatistic !== this.props.allMonthStatistic) {
            let listBook = [];
            let listCustomer = [];
            let listMoney = [];
            this.props.allMonthStatistic.forEach(element => {
                listBook.push(element["monthlyBookSoldQuantity"])
                listCustomer.push(element["monthlyNewCustomer"])
                listMoney.push(element["monthlyRevenue"])
            });
            this.setState({
                listBook: listBook,
                listCustomer: listCustomer,
                listMoney: listMoney
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='data-month-container'>
                    <ModalInvetory
                        isOpen={this.state.isOpenModalInventory}
                        toggleFromParent={this.toggleInventoryModal}
                        dateInventory={this.state.dateInventory}
                    />
                    <ModalDebt
                        isOpen={this.state.isOpenModalDebt}
                        toggleFromParent={this.toggleDebtModal}
                        dateDept={this.state.dateDept}
                    />
                    <div className='content-left'>
                        <div className="chart-data">
                            <Line
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'Money',
                                            data: this.state.listMoney,
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                            tension: 0.5
                                        },
                                        {
                                            label: 'Book',
                                            data: this.state.listBook,
                                            borderColor: 'rgb(53, 162, 235)',
                                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                            tension: 0.5
                                        },
                                        {
                                            label: 'Customer',
                                            data: this.state.listCustomer,
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
                                <p>Inventory Report</p>
                                <select
                                    className="form-select w-25 brounded-0"
                                    value={this.state.dateInventory}
                                    onChange={(e) => {
                                        this.setState({
                                            dateInventory: e.target.value
                                        })
                                    }}
                                    style={{ "cursor": "pointer" }}
                                >
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </select>
                            </div>
                            <div className='content-down'>
                                <button
                                    type="button"
                                    className="h-50 w-25 btn btn-lg btn-primary"
                                    onClick={() => this.toggleInventoryModal()}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Report
                                </button>
                            </div>
                        </div>
                        <div className='box box-down'>
                            <div className='content-up'>
                                <p>Debt Report</p>
                                <select
                                    className="form-select w-25 brounded-0"
                                    value={this.state.dateDept}
                                    onChange={(e) => {
                                        this.setState({
                                            dateDept: e.target.value
                                        })
                                    }}
                                    style={{ "cursor": "pointer" }}
                                >
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </select>
                            </div>
                            <div className='content-down'>
                                <button
                                    type="button"
                                    className="h-50 w-25 btn btn-primary btn-lg"
                                    onClick={() => this.toggleDebtModal()}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Report
                                </button>
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
        allMonthStatistic: state.statistic.allMonthStatistic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchAllMonthStatistics: () => dispatch(actions.fetchAllMonthStatistics()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataMonth));

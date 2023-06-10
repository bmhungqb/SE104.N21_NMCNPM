import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './CustomerManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalCustomer from './ModalCustomer';
import TableCustomerManage from './TableCustomerManage';
import ModalEditCustomer from './ModalEditCustomer';
import ModalDeleteCustomer from './ModalDeleteCustomer';
import { FormattedMessage } from 'react-intl';
class CustomerManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDeleteId: undefined,
            customerEditId: undefined,
            isOpenModalCustomer: false,
            isOpenModalEditCustomer: false,
            isOpenModalDeleteCustomer: false,
            inputSearch: "",
            selectFilter: "customerId"
        }
    }
    handleAddCustomer = () => {
        this.setState({
            isOpenModalCustomer: true,
        })
    }
    toggleCustomerModal = () => {
        this.setState({
            isOpenModalCustomer: !this.state.isOpenModalCustomer,
        })
    }
    toggleCustomerEditModal = () => {
        this.setState({
            isOpenModalEditCustomer: !this.state.isOpenModalEditCustomer,
        })
    }
    toggleCustomerDeleteModal = () => {
        this.setState({
            isOpenModalDeleteCustomer: !this.state.isOpenModalDeleteCustomer,
        })
    }
    getCustomerEdit = (customer) => {
        this.setState({
            customerEditId: customer
        })
    }
    getCustomerDelete = (customerId) => {
        this.setState({
            customerDeleteId: customerId
        })
    }
    handleOnchangeInputFilter = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <ModalCustomer
                    isOpen={this.state.isOpenModalCustomer}
                    toggleFromParent={this.toggleCustomerModal}
                />
                {
                    this.state.isOpenModalEditCustomer &&
                    <ModalEditCustomer
                        isOpen={this.state.isOpenModalEditCustomer}
                        toggleFromParent={this.toggleCustomerEditModal}
                        customerEditId={this.state.customerEditId}
                    />
                }
                {
                    this.state.isOpenModalDeleteCustomer &&
                    <ModalDeleteCustomer
                        isOpen={this.state.isOpenModalDeleteCustomer}
                        toggleFromParent={this.toggleCustomerDeleteModal}
                        customerDeleteId={this.state.customerDeleteId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='customer-manage-container'>
                        <div className='customer-manage-header'>
                            <p className='title-header'><FormattedMessage id='customer-management.customer-management' /></p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='customer-manage-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-50">
                                    <input
                                        style={{ "height": "46px" }}
                                        placeholder={'Enter search by ' + this.state.selectFilter}
                                        type="text" className="form-control w-75"
                                        onChange={(e) => this.handleOnchangeInputFilter(e, 'inputSearch')}
                                    />
                                    <div className="input-group-append">
                                        <select
                                            className="form-select w-100 brounded-0"
                                            value={this.state.selectFilter}
                                            onChange={(e) => this.handleOnchangeInputFilter(e, 'selectFilter')}
                                            style={{ "cursor": "pointer" }}
                                        >
                                            <option value={"customerId"}>ID</option>
                                            <option value={"fullName"}>Full Name</option>
                                            <option value={"phoneNumber"}>Phone Number</option>
                                            <option value={"rank"}>State</option>
                                            <option value={"address"}>Address</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='button-control'>
                                    <button
                                        className='mx-2 btn px-3 btn-info'
                                        onClick={() => this.handleAddCustomer()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        <FormattedMessage id='customer-management.add-customer' /></button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableCustomerManage
                                    toggleCustomerEditModal={this.toggleCustomerEditModal}
                                    toggleCustomerDeleteModal={this.toggleCustomerDeleteModal}
                                    getCustomerEdit={(customerInfor) => this.getCustomerEdit(customerInfor)}
                                    getCustomerDelete={(customerId) => this.getCustomerDelete(customerId)}
                                    optionSearch={[this.state.inputSearch, this.state.selectFilter]}
                                />
                            </div>

                        </div>
                        <div className='Customer-manage-footer'></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './CustomerManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import {
    createNewCustomerService,
    getAllCustomers,
    editCustomerService,
    deleteCustomerService
} from '../../../src/services/customerService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalCustomer from './ModalCustomer';
import TableCustomerManage from './TableCustomerManage';
import ModalEditCustomer from './ModalEditCustomer';
import ModalDeleteCustomer from './ModalDeleteCustomer';
class CustomerManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDeleteId: undefined,
            customerEdit: {},
            arrCustomers: [],
            isOpenModalCustomer: false,
            isOpenModalEditCustomer: false,
            isOpenModalDeleteCustomer: false,
        }
    }
    async componentDidMount() {
        await this.getAllCustomersFromReact();
    }
    getAllCustomersFromReact = async () => {
        let response = await getAllCustomers('ALL');
        if (response && response.errCode === 0) {
            console.log(response.customers)
            this.setState({
                arrCustomers: response.customers
            })
        }
    }
    handleAddCustomer = () => {
        this.setState({
            isOpenModalCustomer: true,
        })
    }
    createNewCustomer = async (data) => {
        try {
            let response = await createNewCustomerService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllCustomersFromReact();
                this.setState({
                    isOpenModalCustomer: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
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
            customerEdit: customer
        })
    }
    getCustomerDelete = (customerId) => {
        this.setState({
            customerDeleteId: customerId
        })
    }
    editCustomer = async (customer) => {
        try {
            let res = await editCustomerService(customer);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditCustomer: false
                })
                await this.getAllCustomersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    deleteCustomer = async () => {
        try {
            let res = await deleteCustomerService(this.state.customerDeleteId);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalDeleteCustomer: false
                })
                await this.getAllCustomersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <ModalCustomer
                    isOpen={this.state.isOpenModalCustomer}
                    toggleFromParent={this.toggleCustomerModal}
                    createNewCustomer={this.createNewCustomer}
                />
                {
                    this.state.isOpenModalEditCustomer &&
                    <ModalEditCustomer
                        isOpen={this.state.isOpenModalEditCustomer}
                        toggleFromParent={this.toggleCustomerEditModal}
                        editCustomer={this.editCustomer}
                        customerEdit={this.state.customerEdit}
                    />
                }
                {
                    this.state.isOpenModalDeleteCustomer &&
                    <ModalDeleteCustomer
                        isOpen={this.state.isOpenModalDeleteCustomer}
                        toggleFromParent={this.toggleCustomerDeleteModal}
                        deleteCustomer={this.deleteCustomer}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='customer-manage-container'>
                        <div className='customer-manage-header'>
                            <p className='title-header'>Customer Management</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='customer-manage-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-25">
                                    <input placeholder='Enter search' type="text" className="form-control h-100" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true">Search by</button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">By ID</a>
                                            <a class="dropdown-item" href="#">By Author</a>
                                            <a class="dropdown-item" href="#">By Title</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='button-control'>
                                    <button
                                        className='mx-2 btn px-3 btn-info'
                                        onClick={() => this.handleAddCustomer()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add Customer</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableCustomerManage
                                    toggleCustomerEditModal={this.toggleCustomerEditModal}
                                    toggleCustomerDeleteModal={this.toggleCustomerDeleteModal}
                                    arrCustomers={this.state.arrCustomers}
                                    getCustomerEdit={(customerInfor) => this.getCustomerEdit(customerInfor)}
                                    getCustomerDelete={(customerId) => this.getCustomerDelete(customerId)}
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);

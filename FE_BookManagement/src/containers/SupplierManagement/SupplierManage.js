import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './SupplierManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableSupplierManage from './TableSupplierManage';
import ModalSupplier from './ModalSupplier';
import ModalEditSupplier from './ModalEditSupplier';
import ModalDeleteSupplier from './ModalDeleteSupplier';
import {
    createNewSupplierService,
    getAllSuppliers,
    editSupplierService,
    deleteSupplierService
} from '../../../src/services/supplierService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class SupplierManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            supplierDeleteId: undefined,
            supplierEdit: {},
            arrSuppliers: [],
            isOpenModalSupplier: false,
            isOpenModalEditSupplier: false,
            isOpenModalDeleteSupplier: false,
        }
    }
    handleAddNewSupplier = () => {
        this.setState({
            isOpenModalSupplier: true,
        })
    }
    toggleSupplierModal = () => {
        this.setState({
            isOpenModalSupplier: !this.state.isOpenModalSupplier,
        })
    }
    toggleSupplierEditModal = () => {
        this.setState({
            isOpenModalEditSupplier: !this.state.isOpenModalEditSupplier,
        })
    }
    toggleSupplierDeleteModal = () => {
        this.setState({
            isOpenModalDeleteSupplier: !this.state.isOpenModalDeleteSupplier,
        })
    }
    async componentDidMount() {
        await this.getAllSuppliersFromReact();
    }
    getAllSuppliersFromReact = async () => {
        let response = await getAllSuppliers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrSuppliers: response.suppliers
            })
        }
    }
    createNewSupplier = async (data) => {
        try {
            let response = await createNewSupplierService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllSuppliersFromReact();
                this.setState({
                    isOpenModalSupplier: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }
    editSupplier = async (supplier) => {
        try {
            let res = await editSupplierService(supplier);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditSupplier: false
                })
                await this.getAllSuppliersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    getSupplierEdit = (supplier) => {
        this.setState({
            supplierEdit: supplier
        })
    }
    getSupplierDelete = (supplierId) => {
        this.setState({
            supplierDeleteId: supplierId
        })
    }
    deleteSupplier = async () => {
        try {
            let res = await deleteSupplierService(this.state.supplierDeleteId);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalDeleteSupplier: false
                })
                await this.getAllSuppliersFromReact()
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
                <ModalSupplier
                    isOpen={this.state.isOpenModalSupplier}
                    toggleFromParent={this.toggleSupplierModal}
                    createNewSupplier={this.createNewSupplier}
                />
                {
                    this.state.isOpenModalEditSupplier &&
                    <ModalEditSupplier
                        isOpen={this.state.isOpenModalEditSupplier}
                        toggleFromParent={this.toggleSupplierEditModal}
                        supplierEdit={this.state.supplierEdit}
                        editSupplier={this.editSupplier}
                    />
                }
                {
                    this.state.isOpenModalDeleteSupplier &&
                    <ModalDeleteSupplier
                        isOpen={this.state.isOpenModalDeleteSupplier}
                        toggleFromParent={this.toggleSupplierDeleteModal}
                        deleteSupplier={this.deleteSupplier}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='user-manage-container'>
                        <div className='user-manage-header'>
                            <p className='title-header'>Employees</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='user-manage-content'>
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
                                        onClick={() => this.handleAddNewSupplier()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add Supplier</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableSupplierManage
                                    toggleSupplierEditModal={this.toggleSupplierEditModal}
                                    toggleSupplierDeleteModal={this.toggleSupplierDeleteModal}
                                    arrSuppliers={this.state.arrSuppliers}
                                    getSupplierEdit={(supplierInfor) => this.getSupplierEdit(supplierInfor)}
                                    getSupplierDelete={(supplierId) => this.getSupplierDelete(supplierId)}
                                />
                            </div>

                        </div>
                        <div className='user-manage-footer'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierManage);

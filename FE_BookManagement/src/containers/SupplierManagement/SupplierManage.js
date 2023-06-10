import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './SupplierManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalSupplier from './ModalSupplier';
import TableSupplierManage from './TableSupplierManage';
import ModalEditSupplier from './ModalEditSupplier';
import ModalDeleteSupplier from './ModalDeleteSupplier';
import { FormattedMessage } from 'react-intl';
class SupplierManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            supplierDeleteId: undefined,
            supplierEditId: undefined,
            isOpenModalSupplier: false,
            isOpenModalEditSupplier: false,
            isOpenModalDeleteSupplier: false,
            inputSearch: "",
            selectFilter: "id"
        }
    }
    async componentDidMount() {
    }
    handleAddSupplier = () => {
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
    getSupplierEdit = (supplier) => {
        this.setState({
            supplierEditId: supplier
        })
    }
    getSupplierDelete = (supplierId) => {
        this.setState({
            supplierDeleteId: supplierId
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
                <ModalSupplier
                    isOpen={this.state.isOpenModalSupplier}
                    toggleFromParent={this.toggleSupplierModal}
                />
                {
                    this.state.isOpenModalEditSupplier &&
                    <ModalEditSupplier
                        isOpen={this.state.isOpenModalEditSupplier}
                        toggleFromParent={this.toggleSupplierEditModal}
                        supplierEditId={this.state.supplierEditId}
                    />
                }
                {
                    this.state.isOpenModalDeleteSupplier &&
                    <ModalDeleteSupplier
                        isOpen={this.state.isOpenModalDeleteSupplier}
                        toggleFromParent={this.toggleSupplierDeleteModal}
                        supplierDeleteId={this.state.supplierDeleteId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='supplier-manage-container'>
                        <div className='supplier-manage-header'>
                            <p className='title-header'><FormattedMessage id='supplier-management.supplier-management' /></p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='supplier-manage-content'>
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
                                            <option value={"id"}>ID</option>
                                            <option value={"name"}>Name</option>
                                            <option value={"phoneNumber"}>Phone Number</option>
                                            <option value={"email"}>Email</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='button-control'>
                                    <button
                                        className='mx-2 btn px-3 btn-info'
                                        onClick={() => this.handleAddSupplier()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        <FormattedMessage id='supplier-management.add-new-supplier' /></button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableSupplierManage
                                    toggleSupplierEditModal={this.toggleSupplierEditModal}
                                    toggleSupplierDeleteModal={this.toggleSupplierDeleteModal}
                                    getSupplierEdit={(supplierInfor) => this.getSupplierEdit(supplierInfor)}
                                    getSupplierDelete={(supplierId) => this.getSupplierDelete(supplierId)}
                                    optionSearch={[this.state.inputSearch, this.state.selectFilter]}
                                />
                            </div>

                        </div>
                        <div className='supplier-manage-footer'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierManage);

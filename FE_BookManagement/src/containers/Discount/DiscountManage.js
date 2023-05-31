import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DiscountManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableDiscountManage from './TableDiscountManage';
import ModalDiscount from './ModalDiscount';
import ModalEditDiscount from './ModalEditDiscount';
import ModalDeleteDiscount from './ModalDeleteDiscount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class DiscountManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            discountDeleteId: undefined,
            discountEdit: undefined,
            arrDiscounts: [],
            isOpenModalDiscount: false,
            isOpenModalEditDiscount: false,
            isOpenModalDeleteDiscount: false,
            inputSearch: "",
            selectFilter: "id"
        }
    }
    handleAddNewDiscount = () => {
        this.setState({
            isOpenModalDiscount: true,
        })
    }
    toggleDiscountModal = () => {
        this.setState({
            isOpenModalDiscount: !this.state.isOpenModalDiscount,
        })
    }
    toggleDiscountEditModal = () => {
        this.setState({
            isOpenModalEditDiscount: !this.state.isOpenModalEditDiscount,
        })
    }
    toggleDiscountDeleteModal = () => {
        this.setState({
            isOpenModalDeleteDiscount: !this.state.isOpenModalDeleteDiscount,
        })
    }
    async componentDidMount() {
    }
    getDiscountEdit = (discount) => {
        this.setState({
            discountEdit: discount
        })
    }
    getDiscountDelete = (discountId) => {
        this.setState({
            discountDeleteId: discountId
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
                <ModalDiscount
                    isOpen={this.state.isOpenModalDiscount}
                    toggleFromParent={this.toggleDiscountModal}
                />
                {
                    this.state.isOpenModalEditDiscount &&
                    <ModalEditDiscount
                        isOpen={this.state.isOpenModalEditDiscount}
                        toggleFromParent={this.toggleDiscountEditModal}
                        discountEdit={this.state.discountEdit}
                    />
                }
                {
                    this.state.isOpenModalDeleteDiscount &&
                    <ModalDeleteDiscount
                        isOpen={this.state.isOpenModalDeleteDiscount}
                        toggleFromParent={this.toggleDiscountDeleteModal}
                        discountDeleteId={this.state.discountDeleteId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='user-manage-container'>
                        <div className='user-manage-header'>
                            <p className='title-header'>Discounts</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='user-manage-content'>
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
                                            <option value={"state"}>State</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='button-control'>
                                    <button
                                        className='mx-2 btn px-3 btn-info'
                                        onClick={() => this.handleAddNewDiscount()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add Discount</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableDiscountManage
                                    toggleDiscountEditModal={this.toggleDiscountEditModal}
                                    toggleDiscountDeleteModal={this.toggleDiscountDeleteModal}
                                    getDiscountEdit={(discountInfor) => this.getDiscountEdit(discountInfor)}
                                    getDiscountDelete={(discountId) => this.getDiscountDelete(discountId)}
                                    optionSearch={[this.state.inputSearch, this.state.selectFilter]}
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManage);

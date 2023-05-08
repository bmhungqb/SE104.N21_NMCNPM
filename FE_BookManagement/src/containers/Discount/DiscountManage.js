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
import {
    createNewDiscountService,
    getAllDiscounts,
    editDiscountService,
    deleteDiscountService
} from '../../services/discountService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class DiscountManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            discountDeleteId: undefined,
            discountEdit: {},
            arrDiscounts: [],
            isOpenModalDiscount: false,
            isOpenModalEditDiscount: false,
            isOpenModalDeleteDiscount: false,
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
    getAllDiscountsFromReact = async () => {
        let response = await getAllDiscounts('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrDiscounts: response.discounts
            })
        }
    }
    async componentDidMount() {
        await this.getAllDiscountsFromReact();
    }
    createNewDiscount = async (data) => {
        try {
            let response = await createNewDiscountService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllDiscountsFromReact();
                this.setState({
                    isOpenModalDiscount: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }
    editDiscount = async (discount) => {
        try {
            let res = await editDiscountService(discount);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditDiscount: false
                })
                await this.getAllDiscountsFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
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
    deleteDiscount = async () => {
        try {
            let res = await deleteDiscountService(this.state.discountDeleteId);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalDeleteDiscount: false
                })
                await this.getAllDiscountsFromReact()
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
                <ModalDiscount
                    isOpen={this.state.isOpenModalDiscount}
                    toggleFromParent={this.toggleDiscountModal}
                    createNewDiscount={this.createNewDiscount}
                />
                {
                    this.state.isOpenModalEditDiscount &&
                    <ModalEditDiscount
                        isOpen={this.state.isOpenModalEditDiscount}
                        toggleFromParent={this.toggleDiscountEditModal}
                        discountEdit={this.state.discountEdit}
                        editDiscount={this.editDiscount}
                    />
                }
                {
                    this.state.isOpenModalDeleteDiscount &&
                    <ModalDeleteDiscount
                        isOpen={this.state.isOpenModalDeleteDiscount}
                        toggleFromParent={this.toggleDiscountDeleteModal}
                        deleteDiscount={this.deleteDiscount}
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
                                    arrDiscounts={this.state.arrDiscounts}
                                    getDiscountEdit={(discountInfor) => this.getDiscountEdit(discountInfor)}
                                    getDiscountDelete={(discountId) => this.getDiscountDelete(discountId)}
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

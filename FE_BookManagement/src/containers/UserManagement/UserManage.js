import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableUserManage from './TableUserManage';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDeleteId: undefined,
            userEditId: undefined,
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            isOpenModalDeleteUser: false,
            inputSearch: "",
            selectFilter: "id"
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    toggleUserDeleteModal = () => {
        this.setState({
            isOpenModalDeleteUser: !this.state.isOpenModalDeleteUser,
        })
    }
    async componentDidMount() {
    }
    getUserEdit = (userId) => {
        this.setState({
            userEditId: userId
        })
    }
    getUserDelete = (userId) => {
        this.setState({
            userDeleteId: userId
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
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        userEditId={this.state.userEditId}
                    />
                }
                {
                    this.state.isOpenModalDeleteUser &&
                    <ModalDeleteUser
                        isOpen={this.state.isOpenModalDeleteUser}
                        toggleFromParent={this.toggleUserDeleteModal}
                        userDeleteId={this.state.userDeleteId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='user-manage-container'>
                        <div className='user-manage-header'>
                            <p className='title-header'>Users</p>
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
                                            <option value={"name"}>Full Name</option>
                                            <option value={"role"}>Role</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='button-control'>
                                    <button
                                        className='mx-2 btn px-3 btn-info'
                                        onClick={() => this.handleAddNewUser()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add User</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableUserManage
                                    toggleUserEditModal={this.toggleUserEditModal}
                                    toggleUserDeleteModal={this.toggleUserDeleteModal}
                                    getUserEdit={(userId) => this.getUserEdit(userId)}
                                    getUserDelete={(userId) => this.getUserDelete(userId)}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

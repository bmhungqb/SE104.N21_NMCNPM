import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './RegulationManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableRegulationManage from './TableRegulationManage';
import ModalRegulation from './ModalRegulation';
import ModalEditRegulation from './ModalEditRegulation';
import ModalDeleteRegulation from './ModalDeleteRegulation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class RegulationManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regulationDeleteId: undefined,
            regulationEdit: undefined,
            isOpenModalRegulation: false,
            isOpenModalEditRegulation: false,
            isOpenModalDeleteRegulation: false,
            inputSearch: "",
            selectFilter: "id"
        }
    }
    handleAddNewRegulation = () => {
        this.setState({
            isOpenModalRegulation: true,
        })
    }
    toggleRegulationModal = () => {
        this.setState({
            isOpenModalRegulation: !this.state.isOpenModalRegulation,
        })
    }
    toggleRegulationEditModal = () => {
        this.setState({
            isOpenModalEditRegulation: !this.state.isOpenModalEditRegulation,
        })
    }
    toggleRegulationDeleteModal = () => {
        this.setState({
            isOpenModalDeleteRegulation: !this.state.isOpenModalDeleteRegulation,
        })
    }
    async componentDidMount() {
    }
    getRegulationEdit = (regulation) => {
        this.setState({
            regulationEdit: regulation
        })
    }
    getRegulationDelete = (regulationId) => {
        this.setState({
            regulationDeleteId: regulationId
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
                <ModalRegulation
                    isOpen={this.state.isOpenModalRegulation}
                    toggleFromParent={this.toggleRegulationModal}
                />
                {
                    this.state.isOpenModalEditRegulation &&
                    <ModalEditRegulation
                        isOpen={this.state.isOpenModalEditRegulation}
                        toggleFromParent={this.toggleRegulationEditModal}
                        regulationEdit={this.state.regulationEdit}
                    />
                }
                {
                    this.state.isOpenModalDeleteRegulation &&
                    <ModalDeleteRegulation
                        isOpen={this.state.isOpenModalDeleteRegulation}
                        toggleFromParent={this.toggleRegulationDeleteModal}
                        regulationDeleteId={this.state.regulationDeleteId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='user-manage-container'>
                        <div className='user-manage-header'>
                            <p className='title-header'>Regulations</p>
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
                                        onClick={() => this.handleAddNewRegulation()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add Regulation</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableRegulationManage
                                    toggleRegulationEditModal={this.toggleRegulationEditModal}
                                    toggleRegulationDeleteModal={this.toggleRegulationDeleteModal}
                                    getRegulationEdit={(regulationInfor) => this.getRegulationEdit(regulationInfor)}
                                    getRegulationDelete={(regulationId) => this.getRegulationDelete(regulationId)}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegulationManage);

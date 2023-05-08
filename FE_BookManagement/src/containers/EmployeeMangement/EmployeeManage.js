import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './EmployeeManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableEmployeeManage from './TableEmployeeManage';
import ModalEmployee from './ModalEmployee';
import ModalEditEmployee from './ModalEditEmployee';
import ModalDeleteEmployee from './ModalDeleteEmployee';
import {
    createNewEmployeeService,
    getAllEmployees,
    editEmployeeService,
    deleteEmployeeService
} from '../../../src/services/employeeService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class EmployeeManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeDeleteId: undefined,
            employeeEdit: {},
            arrEmployees: [],
            isOpenModalEmployee: false,
            isOpenModalEditEmployee: false,
            isOpenModalDeleteEmployee: false,
        }
    }
    handleAddNewEmployee = () => {
        this.setState({
            isOpenModalEmployee: true,
        })
    }
    toggleEmployeeModal = () => {
        this.setState({
            isOpenModalEmployee: !this.state.isOpenModalEmployee,
        })
    }
    toggleEmployeeEditModal = () => {
        this.setState({
            isOpenModalEditEmployee: !this.state.isOpenModalEditEmployee,
        })
    }
    toggleEmployeeDeleteModal = () => {
        this.setState({
            isOpenModalDeleteEmployee: !this.state.isOpenModalDeleteEmployee,
        })
    }
    async componentDidMount() {
        await this.getAllEmployeesFromReact();
    }
    getAllEmployeesFromReact = async () => {
        let response = await getAllEmployees('ALL');
        if (response && response.errCode === 0) {
            console.log(response.employees)
            this.setState({
                arrEmployees: response.employees
            })
        }
    }
    createNewEmployee = async (data) => {
        try {
            let response = await createNewEmployeeService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllEmployeesFromReact();
                this.setState({
                    isOpenModalEmployee: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }
    editEmployee = async (customer) => {
        try {
            let res = await editEmployeeService(customer);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditEmployee: false
                })
                await this.getAllEmployeesFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    getEmployeeEdit = (employee) => {
        this.setState({
            employeeEdit: employee
        })
    }
    getEmployeeDelete = (employeeId) => {
        this.setState({
            employeeDeleteId: employeeId
        })
    }
    deleteEmployee = async () => {
        try {
            let res = await deleteEmployeeService(this.state.employeeDeleteId);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalDeleteEmployee: false
                })
                await this.getAllEmployeesFromReact()
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
                <ModalEmployee
                    isOpen={this.state.isOpenModalEmployee}
                    toggleFromParent={this.toggleEmployeeModal}
                    createNewEmployee={this.createNewEmployee}
                />
                {
                    this.state.isOpenModalEditEmployee &&
                    <ModalEditEmployee
                        isOpen={this.state.isOpenModalEditEmployee}
                        toggleFromParent={this.toggleEmployeeEditModal}
                        employeeEdit={this.employeeEdit}
                        editEmployee={this.editEmployee}
                    />
                }
                {
                    this.state.isOpenModalDeleteEmployee &&
                    <ModalDeleteEmployee
                        isOpen={this.state.isOpenModalDeleteEmployee}
                        toggleFromParent={this.toggleEmployeeDeleteModal}
                        deleteEmployee={this.deleteEmployee}
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
                                        onClick={() => this.handleAddNewEmployee()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add Employee</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableEmployeeManage
                                    toggleEmployeeEditModal={this.toggleEmployeeEditModal}
                                    toggleEmployeeDeleteModal={this.toggleEmployeeDeleteModal}
                                    arrEmployees={this.state.arrEmployees}
                                    getEmployeeEdit={(employeeInfor) => this.getEmployeeEdit(employeeInfor)}
                                    getEmployeeDelete={(employeeId) => this.getEmployeeDelete(employeeId)}
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeManage);

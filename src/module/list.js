import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

import {Link} from "react-router-dom";
import { data } from 'jquery';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


class listComponent extends React.Component  {


  constructor(props){
    super(props);
    this.state = {
      listEmployee:[]
    }
  }

  componentDidMount(){
    // const url = "http://192.168.1.138:3000/employee/list"
    axios.get('/employee/list').then(res=>{
      if(res.data.success){
       const data = res.data.data;
      // console.log(res.data.data);
      this.setState({listEmployee:data})
      }
      else{
        alert("error web service");
      }
    })
    // .catch(error=>{
    //   alert("Erorr server"+error);
    // })
  }


  render()
  {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th>1</th>
            <td>Admin</td>
            <td>Doan Kim Thanh</td>
            <td>thanh@mail.com</td>
            <td>VietNoom</td>
            <td>317785847</td>
            <td>
              
            </td>
            <td>
              <button class="btn btn-outline-danger "> Delete </button>
            </td>
          </tr> */}
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }
  loadFillData(){
    // console.log(this.state.listEmployee);
   return  this.state.listEmployee.map(data=>{
      return(
        <tr>
            <th>{data.id}</th>
            <td>{data.role.role}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.address}</td>
            <td>{data.phone}</td>
            <td>
            <Link class="btn btn-outline-info" to={"/edit/"+data.id}>Edit</Link>
           
            </td>
            <td>
            <button class="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Delete </button>
            </td>
          </tr>
      )
    })
  }
  onDelete(id){
    Swal.fire({
      title: 'Bạn chắc chắn chứ?',
      text: 'Bạn sẽ không thể không phục tài khoản này!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Dữ liệu không thay đổi',
          'error'
        )
      }
    })
  }
  sendDelete(userId)
  {
    // url de backend
    const baseUrl = "http://localhost:3000/employee/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Đã xóa!',
          'Bạn đã xóa 1 thành viên.',
          'success'
        )
        this.componentDidMount()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
}

export default listComponent;
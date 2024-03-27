
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { newStudent, deleteStudent, getStudent, updateStudent } from "../redux/Api";
import { connect } from "react-redux";
import { select_Id, setData } from "../redux/Action";
import {Icon} from "@iconify/react";

const Student = ({ data, setData }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
  
    const [formData, setFormData] = useState({name: '',email: '',gender:'',role:''});
    console.log("this is data",data);

//cancel icon at top right
    const handleCancelUpdate = () => {
        // setShowUpdate(false);
        setShowUpdate(false);
        setShowAddForm(false);
        setFormData({ name: "" });
      };

      const handleInputChange = (event, field) => {
        setFormData({ ...formData, [field]: event.target.value });
      }

    const allStudentsData = async () => {
        const students = await getStudent();
        setData(students);
      }
      const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
      };

    useEffect( ()=> {
        allStudentsData();
      },[])
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          if (formData.name !== ''&& formData.email !==''&& formData.gender !==''&& formData !=='') {
            await newStudent(formData);
            console.log("this is form data",formData)
            allStudentsData();
            setShowAddForm(!showAddForm);
            setFormData({
              name: '',
              email: '',
              gender:'',
              role:'',
            });
           
          } else {
            alert("Please fill all details");
          }
        } catch (error) {
          console.error('Error adding student:', error);
        }
      }

      // delete funtion
      const handleDelete = async (id) => {
        try{
          await deleteStudent(id)
          alert("Student is successfully Deleted....!")
          allStudentsData();
        }catch(error){
          console.log("Student Successfully Deleted")
        }
      }
       
      // to edit form feilds
      const handleEdit = (studentId, studentName,studentEmail,studentGender,studentRole) => {
        setShowUpdate(true);
        setFormData({ id: studentId, name: studentName, email:studentEmail, gender:studentGender,role:studentRole });
      };

      //update student details
      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          if (formData.name === '' || formData.email === '' || formData.gender === '' || formData.role ==='') {
            alert("Please fill in all the fields");
          } else {
            await updateStudent(formData.id, formData);
            allStudentsData();
            setShowUpdate(false); 
            setFormData({ name: '', email: '', gender: '', role:''}); 
          }
        } catch (error) {
          console.error('Error updating student:', error);
        }
      }
      
  return (
    <div>
        <div className="container  justify-content-center mt-5 ">
      <div className="row row-cols-md-2  mt-5 mx-auto justify-content-center">
        <div className="col">
          <h2 className="justify-content-center d-flex">
            <b>Student's Data</b>
          </h2>
          <button
            type="button"
            className="btn btn-primary ms-auto d-flex "
            onClick={toggleAddForm}
          >
            ADD +
          </button>

          {showAddForm && (
            <div className="overlay">
              <div className="form-container">
                {/*This is new data form */}
                <form onSubmit={handleSubmit}>
                <button
                    type="button"
                    className="btn btn-icon btn-cancel position-absolute top-0 end-0 m-1"
                  >
                    <Icon onClick={handleCancelUpdate} icon="iconoir:cancel" />
                  </button>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                
                  <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      age="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                    />
                  </div>
                  <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                                            <select
                                                className="form-control"
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={(e) => handleInputChange(e, 'gender')}
                                            >
                                                <option >Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      role="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange(e, 'role')}
                    />
                  </div>                         
                  <button type="submit" className="btn btn-primary mt-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

        
          {/*This is update form*/}
          {showUpdate && (
            <div className="overlay">
              <div className="form-container">
                <button
                  type="button"
                  className="btn btn-icon btn-cancel position-absolute top-0 end-0 m-1">
                <Icon onClick={handleCancelUpdate} icon="iconoir:cancel" />
                </button>
                <form  onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      age="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Gender
                    </label>
                                      <select
                                              className="form-control"
                                              id="gender"
                                              name="gender"
                                              value={formData.gender}
                                              onChange={(e) => handleInputChange(e, 'gender')}
                                          >
                                          <option value="">Select Gender</option>
                                          <option value="male">Male</option>
                                          <option value="female">Female</option>
                                          <option value="other">Other</option>
                                      </select>
                   
                  </div>
                 <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      role="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange(e, 'role')}
                    />
                  </div> 
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
          {/* This is for printing data in map*/}
          <table className="table table-striped shadow mt-2 border">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Role</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>{student.role}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEdit(student.id, student.name, student.email, student.gender, student.role)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={ ()=> handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
    return {
      data: state.data,
      selectStudentId: state.selectStudentId,
    }
  }
  
  const mapDispatchToProps = {
    setData,
    select_Id,
  }

export default connect(mapStateToProps, mapDispatchToProps)(Student);

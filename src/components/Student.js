
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { newStudent, deleteStudent, getStudent, updateStudent } from "../redux/Api";
import { connect } from "react-redux";
import { select_Id, setData } from "../redux/Action";
import {Icon} from "@iconify/react";

const Student = ({ data, setData }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({name: '',age: '',gender:'' });
    console.log("this is data"+data);

//cancel icon at top right
    const handleCancelUpdate = () => {
        // setShowUpdate(false);
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
          if (formData.name !== ''&& formData.age !==''&& formData.gender !=='') {
            await newStudent(formData);
            console.log("this is form data",formData)
            allStudentsData();
            setShowAddForm(!showAddForm);
            setFormData({
              name: '',
              age: '',
              gender:'',
            });
           
          } else {
            alert("Please fill all details");
          }
        } catch (error) {
          console.error('Error adding student:', error);
        }
      }
      const handleDelete = async (id) => {
        try{
          await deleteStudent(id)
          alert("Student is successfully Deleted....!")
          allStudentsData();
        }catch(error){
          console.log("Student Successfully Deleted")
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
                
                  <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      age="age"
                      value={formData.age}
                      onChange={(e) => handleInputChange(e, 'age')}
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
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                  <button type="submit" className="btn btn-primary mt-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
          <table className="table table-striped shadow mt-2">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                     
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

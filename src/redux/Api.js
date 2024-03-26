import axios from "axios";
const databaseURL="https://crudwithredux-default-rtdb.asia-southeast1.firebasedatabase.app";
export const getStudent = async () => {
    try {
        const response = await axios.get(`${databaseURL}/students.json`);
        const jsonData = response.data;
        console.log("this is from firebase",jsonData);

        if (jsonData === null) {
            return [];
        } else {
            return Object.keys(jsonData).map((key) => ({ id: key, ...jsonData[key] }));
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
        return [];
    }
}
export const newStudent= async (formData) => {
    try {
        if (formData.name !== '' && formData.age !== '' && formData.gender !== '') {
            const response = await axios.post(`${databaseURL}/students.json`, formData);
           
            console.log( 'This is form data in add student',response.data);
        } else {
            alert('Please enter name and age');
        }
    } catch (error) {
        alert('Error storing data in Firebase:', error);
    }
}
export const deleteStudent = async (id) => {
    try{
        await axios.delete(`${databaseURL}/students/${id}.json`)
    }catch (error) {
        console.log('error occured')
      }
 }
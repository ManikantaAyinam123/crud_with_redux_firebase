export const setData = (data) => {
    console.log('This is from Action',data)
    return{
        type: "SET_DATA",
        payload: data,
    };
};
 
export const select_Id = (id) => {
    return {
        type: "SELECT_ID",
        payload: id,
    }
}
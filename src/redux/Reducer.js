const initialSate = {
    data: [],
   
}

const Reducer = (state = initialSate, action) => {
    switch(action.type){
        case 'SET_DATA' :
            const newStateSetData = {
                ...state,
                data: action.payload,
              };
              console.log('data in reducer',newStateSetData)
              return newStateSetData;
        case 'SELECT_ID' :
            return {
                ...state,
                selectStudentId : action.payload,
            }     
        default:
            return state;    
    }
}

 export default Reducer;
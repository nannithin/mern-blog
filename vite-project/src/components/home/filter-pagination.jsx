import axios from "axios";

export const FilterPagination = async ({create_arr , state , data , page , count_route , data_to_send = {} }) => {
    let obj;

    if(!create_arr && state!==null){
        obj = {...state , results : [...state.results , ...data],page : page}
    }
    else{
        await axios.post("http://localhost:5000/api/blog/"+count_route , data_to_send)
        .then(({ data: {total_docs} })=>{
            obj = {results : data , page: 1 , total_docs}
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return obj;

}
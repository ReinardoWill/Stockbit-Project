import axios from "axios";


const API_URL = "http://www.omdbapi.com?apikey=faf7e5bb";

class ApiService {
  	search(title, year,page) {
	    return axios
	      .post(API_URL + "&s="+title+"&y="+year+"&page="+page)
	      .then(response => {
	        return response.data;
	    });
  	}

}

export default new ApiService();

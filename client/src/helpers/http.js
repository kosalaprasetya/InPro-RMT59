import axios from "axios";

const http = axios.create({
    baseURL: 'https://learntodeploy.prasetya.my.id/',
  });


  export default http
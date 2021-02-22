import axios from "axios";
import { log } from "util";

const BASEURL = "https://api.data.gov/ed/collegescorecard/v1/schools?school.name=";
const SEARCH = "&&_fields=id,school.name,school.state,latest.student.size,latest.cost.avg_net_price.private,latest.cost.avg_net_price.public,school.school_url";
const APIKEY = "&api_key=BIFbRR52Xaw50EbCN0uhRJElf9mG1fkiDHAK7fEL";

export default {
  search: function(query) {
    return axios.get(BASEURL + query + SEARCH + APIKEY);
  },

  getColleges: function(user) {
    console.log(" setp 2 getting");
    return axios.get(`/save/`,user);
  },
  // getColleges: function(req,res) {
  //   console.log("getting");
  //   return axios.get("/saved", { id: req.params.id });
  // },

  saveCollege: function(collegeName) {
    console.log("saving college step 2");
    return axios.post(`/save/${collegeName.id}`, collegeName);
  }

};
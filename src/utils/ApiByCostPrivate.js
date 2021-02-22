import axios from "axios";

const BASEURL = "https://api.data.gov/ed/collegescorecard/v1/schools?latest.cost.avg_net_price.private__range=";
const SEARCH = "&&_fields=id,school.name,school.state,latest.student.size,latest.cost.avg_net_price.private,latest.cost.avg_net_price.public,school.school_url&_per_page=100&sort=latest.cost.avg_net_price.private:desc";
const APIKEY = "&api_key=BIFbRR52Xaw50EbCN0uhRJElf9mG1fkiDHAK7fEL";

export default {
  search: function(query1, query2) {
    return axios.get(BASEURL + query1 + ".." + query2 + SEARCH + APIKEY);
  }

};
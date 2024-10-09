import axios from "axios";

const host = "http://localhost:8000/";

export async function ApiFunction(url: string, data: {}, method: 'get' | 'post')  {
        let config = {
              withCredentials: true,
              headers: {
                 'Content-Type': 'application/json'
              }
        }
        try {
          let response;
            if(method === 'get'){
                  response = await axios[method](host + url, config);
             }else {
                  response = await axios[method](host + url, data, config);
             }
             return response;

        } catch (error) {
          console.error(error);
        }

  }
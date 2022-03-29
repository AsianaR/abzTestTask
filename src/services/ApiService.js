import { useHttp } from "../hooks/http.hook";

const useApi = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://frontend-test-assignment-api.abz.agency/api/v1";

  const getToken = async () => {
    const res = await request(`${_apiBase}/token`);
    return res;
  };

  const getUsers = async (
    url = "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
  ) => {
    const res = await request(`${url}`);
    return res;
  };

  const getUserById = async (id = 1) => {
    const res = await request(`${_apiBase}/users/${id}`);
    return res;
  };

  const getPositions = async () => {
    const res = await request(`${_apiBase}/positions`);
    return res;
  };

  
const postUser = (data, token, setIsSuccess) => {
  let formData = new FormData(); 
  formData.append("position_id", data.position_id);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("photo", data.photo);
  fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
    method: "POST",
    body: formData,
    headers: {
      Token: token,
    },
  })
    .then(function (response) {
      return (response.json());
    })
    .then(function (data) {
      if (data.success) {
        setIsSuccess(true);
      } else {
        // proccess server errors
      }
    })
    .catch(function (error) {
      // proccess network errors
    });
}

  
  return {
    loading,
    error,
    clearError,
    getToken,
    getUsers,
    getUserById,
    getPositions,
    postUser
  };
};

export default useApi;

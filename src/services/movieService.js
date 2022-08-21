import Axios from "axios";

const baseURL = import.meta.env.VITE_TMDB_API_URL;
const api_key = import.meta.env.VITE_API_KEY;

const movieService = Axios.create({
  baseURL,
  params: { api_key },
});

export default movieService;

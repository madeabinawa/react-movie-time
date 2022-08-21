import { movieService } from "@/services"

class MovieApi {
  discover = (params) => movieService.get("discover/movie", { params });
  detail = (id) => movieService.get(`movie/${id}`);
  search = (params) => movieService.get("/search/movie", { params });
}

export default new MovieApi()


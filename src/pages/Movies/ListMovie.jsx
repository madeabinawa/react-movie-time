import { useQuery } from "react-query";
import { MovieCard, Slider } from "@/components";
import { MovieApi } from "@/apis";

const ListMovie = () => {
  const moviesQuery = useQuery({
    queryKey: "movies",
    queryFn: () => MovieApi.discover({
      language: "en",
      sort_by: "popularity.desc",
      include_adult: "false",
      include_video: "false",
      page: "1",
    })
  })

  const { results: movies } = moviesQuery?.data?.data

  return (
    <div className="p-2">
      {/* Trending Movies Section */}
      <div className="p-2 text-white text-2xl font-semibold">Trending Movies</div>
      <div className="grid gap-2 md:grid-cols-4 lg:md-grid-cols-6 p-2">
        {movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ListMovie;

import { useSelector } from 'react-redux';
import { MovieCard } from "@/components";

const SearchResults = () => {
  const { key, results } = useSelector((state) => state.search);

  return (
    <div className="p-2">
      {/* Show All Search Result */}
      <div className="p-2 text-white text-2xl font-semibold capitalize">Search: {key}</div>
      <div className="grid gap-2 md:grid-cols-4 lg:md-grid-cols-6 p-2">
        {results?.length > 0 && results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

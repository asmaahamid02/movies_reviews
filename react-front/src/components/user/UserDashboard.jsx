import { Alert, Backdrop, Button, CircularProgress, Grid } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMovies } from '../../services/movie.service'
import MovieCard from './MovieCard'

const pageSize = 15
const UserDashboard = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', 'infinite'],
    getNextPageParam: (prevData) => prevData?.data?.nextPage,
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam, pageSize),
  })

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }

  if (isError) {
    return <Alert severity='error'>{error.response.data.message}</Alert>
  }

  if (data.pages[0].data.movies.length === 0) {
    return <Alert severity='info'>No movies found</Alert>
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.pages
          .flatMap((page) => page.data.movies)
          .map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
      </Grid>
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Button>
      )}
    </>
  )
}

export default UserDashboard

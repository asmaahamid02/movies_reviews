import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Rating,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Favorite as FavoriteIcon,
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
  RateReview as RateReviewIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ExpandMore = styled((props) => {
  /* eslint-disable-next-line */
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    synopsis,
    trailer_url,
    release_year,
    age_restriction,
    duration,
    international_rating,
    country,
    language,
    actors,
    directors,
    genres,
    media,
  } = movie

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='movie-card'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component='img'
          height='194'
          image={media[0].path}
          alt={title}
        />
        <CardContent>
          <Link
            to={`/movie/${id}`}
            style={{
              textDecoration: 'none',
              width: '100%',
              color: 'black',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography gutterBottom variant='h6' component='div'>
              {title}
            </Typography>
          </Link>
          <Typography variant='body2' color='text.primary'>
            Genres:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {genres.map((genre) => (
              <Grid item key={genre.id}>
                <Typography variant='body2' color='text.secondary'>
                  {genre.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              maxHeight: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {synopsis}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <Typography variant='body2' color='text.secondary'>
                {release_year}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' color='text.secondary'>
                {age_restriction}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' color='text.secondary'>
                {duration} min
              </Typography>
            </Grid>
          </Grid>
          <Rating
            name='customized-10'
            defaultValue={international_rating}
            precision={0.5}
            readOnly
            max={10}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
            }
            sx={{ mt: 1 }}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                {country}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                {language}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='Review'>
            <RateReviewIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>Synopsis:</Typography>
            <Typography
              paragraph
              style={{
                my: 1,
              }}
            >
              {synopsis}
            </Typography>
            <Divider />
            <Typography paragraph sx={{ mt: 1 }}>
              Actors:
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                my: 1,
              }}
            >
              {actors.map((actor) => (
                <Grid item key={actor.id}>
                  <Typography variant='body2' color='text.secondary'>
                    {actor.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Divider />
            <Typography paragraph sx={{ mt: 1 }}>
              Directors:
            </Typography>
            <Grid container spacing={2} sx={{ my: 1 }}>
              {directors.map((director) => (
                <Grid item key={director.id}>
                  <Typography variant='body2' color='text.secondary'>
                    {director.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Divider />
            <MuiLink
              href={trailer_url}
              sx={{ my: 1 }}
              target='_blank'
              color='secondary'
            >
              Trailer
            </MuiLink>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
}

export default MovieCard

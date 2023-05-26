import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import InputField from '../../common/InputField'
import { Field } from 'formik'
import { useQuery } from '@tanstack/react-query'
import { getGenres } from '../../../services/genre.service'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const MovieDetails = ({ posters, setPosters }) => {
  const genreData = useQuery({
    queryKey: ['genres'],
    queryFn: () => getGenres(),
  })

  const handlePostersChange = (filesArray) => {
    //map each file to a promise that resolves to an array of image URI's
    Promise.all(
      filesArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.addEventListener('load', (ev) => {
            resolve(ev.target.result)
          })
          reader.addEventListener('error', reject)
          reader.readAsDataURL(file)
        })
      })
    ).then(
      (images) => {
        // Once all promises are resolved, update state with image URI array
        setPosters(images)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  return (
    <Grid container spacing={3}>
      {/* Title */}
      <Grid item xs={12}>
        <InputField name='title' label='Title' variant='standard' />
      </Grid>
      {/* Synopsis */}
      <Grid item xs={12}>
        <InputField
          name='synopsis'
          label='Synopsis'
          variant='standard'
          multiline
          maxRows={4}
        />
      </Grid>
      {/* Genres */}
      <Grid item xs={12}>
        <FormControl variant='standard' fullWidth>
          <InputLabel id='genres-label'>Genres</InputLabel>
          <Field labelId='genres-label' name='genres'>
            {({ field, meta }) => (
              <>
                <Select
                  {...field}
                  fullWidth
                  multiple
                  input={
                    <OutlinedInput id='select-multiple-chip' label='Chip' />
                  }
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            genreData.data?.genres.find(
                              (genre) => genre.id === value
                            ).name
                          }
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  error={meta.touched && Boolean(meta.error)}
                >
                  {genreData.isError ? (
                    <MenuItem disabled>Error</MenuItem>
                  ) : genreData.isLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : (
                    genreData.data?.genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {meta.touched && meta.error && (
                  <FormHelperText error>{meta.error}</FormHelperText>
                )}
              </>
            )}
          </Field>
        </FormControl>
      </Grid>
      {/*trailer_url*/}
      <Grid item xs={12} sm={6}>
        <InputField name='trailer_url' label='Trailer URL' variant='standard' />
      </Grid>
      {/* Release Year */}
      <Grid item xs={12} sm={6}>
        <InputField
          name='release_year'
          label='Release Year'
          variant='standard'
          type='number'
          min={1800}
          max={new Date().getFullYear()}
        />
      </Grid>
      {/* Age Restriction */}
      <Grid item xs={12} sm={4}>
        <FormControl variant='standard' fullWidth>
          <InputLabel id='age-restriction-label'>Age Restriction</InputLabel>
          <Field labelId='age-restriction-label' name='age_restriction'>
            {({ field, meta }) => (
              <>
                <Select {...field} error={meta.touched && Boolean(meta.error)}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='G'>G</MenuItem>
                  <MenuItem value='PG'>PG</MenuItem>
                  <MenuItem value='PG-13'>PG-13</MenuItem>
                  <MenuItem value='R'>R</MenuItem>
                  <MenuItem value='NC-17'>NC-17</MenuItem>
                </Select>
                {meta.touched && meta.error && (
                  <FormHelperText error>{meta.error}</FormHelperText>
                )}
              </>
            )}
          </Field>
        </FormControl>
      </Grid>
      {/* Duration */}
      <Grid item xs={12} sm={4}>
        <InputField
          name='duration'
          label='Duration'
          variant='standard'
          type='number'
        />
      </Grid>
      {/* IMDb */}
      <Grid item xs={12} sm={4}>
        <InputField
          name='international_rating'
          label='IMDB Rating'
          variant='standard'
          type='number'
          min={0}
          max={10}
        />
      </Grid>
      {/* Language */}
      <Grid item xs={12} sm={6}>
        <InputField name='language' label='Language' variant='standard' />
      </Grid>
      {/* Country */}
      <Grid item xs={12} sm={6}>
        <InputField name='country' label='Country' variant='standard' />
      </Grid>
      {/* posters */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id='posters-label'>Posters</InputLabel>
          <Field labelId='posters-label' name='images'>
            {({ form: { setFieldValue }, meta }) => (
              <>
                <input
                  type='file'
                  id='images'
                  multiple
                  hidden
                  accept='image/*'
                  onChange={(event) => {
                    const files = event.target.files
                    const arrayFiles = Array.from(files)
                    setFieldValue('images', arrayFiles)
                    handlePostersChange(arrayFiles)
                  }}
                />
                <label htmlFor='images'>
                  <Button variant='outlined' component='span' fullWidth>
                    Upload
                  </Button>
                </label>
                {meta.touched && meta.error && (
                  <FormHelperText error>{meta.error}</FormHelperText>
                )}
              </>
            )}
          </Field>
        </FormControl>
      </Grid>
      {/* Display Posters */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {posters.map((poster, index) => (
            <img
              src={poster}
              alt='poster'
              width='100px'
              height='100px'
              key={index}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}

MovieDetails.propTypes = {
  posters: PropTypes.array.isRequired,
  setPosters: PropTypes.func.isRequired,
}

export default MovieDetails

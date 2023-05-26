import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { Field, FieldArray } from 'formik'
import InputField from '../../common/InputField'
import PropTypes from 'prop-types'

const MovieDirectors = ({ cast }) => {
  return (
    <Field name='directors'>
      {({ form: { values, errors, isSubmitting } }) => (
        <FieldArray name='directors'>
          {({ push, remove }) => (
            <>
              <Grid container spacing={2}>
                {values.directors.map((_, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    style={{ marginBottom: '20px' }}
                  >
                    <Grid item xs={12}>
                      <Typography variant='h6' color='inherit' noWrap>
                        Director {index + 1}
                      </Typography>
                    </Grid>
                    {/* director id */}
                    <Field name={`actors.${index}.id`} type='hidden' />
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`directors.${index}.name`}
                        label='Director Name'
                        variant='standard'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id={`directors.${index}.gender`}
                          style={{ marginTop: '-40px' }}
                        >
                          Avatar
                        </InputLabel>
                        <Field
                          labelId={`directors.${index}.image`}
                          name={`directors.${index}.image`}
                        >
                          {({ form: { setFieldValue }, meta }) => (
                            <>
                              <input
                                type='file'
                                id={`directors.${index}.image`}
                                hidden
                                accept='image/*'
                                onChange={(event) => {
                                  setFieldValue(
                                    `directors.${index}.image`,
                                    event.currentTarget.files[0]
                                  )
                                }}
                              />
                              <label htmlFor={`directors.${index}.image`}>
                                <Avatar
                                  alt='Remy Sharp'
                                  src={
                                    values.directors[index].image
                                      ? URL.createObjectURL(
                                          values.directors[index].image
                                        )
                                      : ''
                                  }
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    border: '1px solid #ccc',
                                  }}
                                />
                              </label>
                              {meta.touched && meta.error && (
                                <FormHelperText error>
                                  {meta.error}
                                </FormHelperText>
                              )}
                            </>
                          )}
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <InputField
                        name={`directors.${index}.biography`}
                        label='Biography'
                        multiline
                        maxRows={4}
                        variant='standard'
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`directors.${index}.birthday`}
                        label='Birthday'
                        type='date'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`directors.${index}.birthplace`}
                        label='Birthplace'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`directors.${index}.nationality`}
                        label='Nationality'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth>
                        <InputLabel id={`directors.${index}.gender-label`}>
                          Gender
                        </InputLabel>
                        <Field
                          labelId={`directors.${index}.gender-label`}
                          name={`directors.${index}.gender`}
                        >
                          {({ field, meta }) => (
                            <>
                              <Select
                                {...field}
                                error={meta.touched && Boolean(meta.error)}
                              >
                                <MenuItem value=''>
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value='female'>Female</MenuItem>
                                <MenuItem value='male'>Male</MenuItem>
                                <MenuItem value='other'>Other</MenuItem>
                              </Select>
                              {meta.touched && meta.error && (
                                <FormHelperText error>
                                  {meta.error}
                                </FormHelperText>
                              )}
                            </>
                          )}
                        </Field>
                      </FormControl>
                    </Grid>

                    {index > 0 && (
                      <Grid item xs={12}>
                        <Button
                          color='error'
                          onClick={() => remove(index)}
                          disabled={isSubmitting}
                        >
                          Remove Director {index + 1}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      //check if the last actor has errors
                      if (
                        errors.directors &&
                        errors.directors[values.directors.length - 1]
                      ) {
                        return
                      }

                      push(cast)
                    }}
                    color='secondary'
                    disabled={isSubmitting}
                  >
                    Add Director
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </FieldArray>
      )}
    </Field>
  )
}

MovieDirectors.propTypes = {
  cast: PropTypes.object.isRequired,
}

export default MovieDirectors

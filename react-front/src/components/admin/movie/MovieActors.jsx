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

const MovieActors = ({ cast }) => {
  return (
    <Field name='actors'>
      {({ form: { values, errors, isSubmitting } }) => (
        <FieldArray name='actors'>
          {({ push, remove }) => (
            <>
              <Grid container spacing={2}>
                {values.actors.map((_, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    style={{ marginBottom: '20px' }}
                  >
                    <Grid item xs={12}>
                      <Typography variant='h6' color='inherit' noWrap>
                        Actor {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`actors.${index}.name`}
                        label='Actor Name'
                        variant='standard'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id={`actors.${index}.gender`}
                          style={{ marginTop: '-40px' }}
                        >
                          Avatar
                        </InputLabel>
                        <Field
                          labelId={`actors.${index}.image`}
                          name={`actors.${index}.image`}
                        >
                          {({ form: { setFieldValue }, meta }) => (
                            <>
                              <input
                                type='file'
                                id={`actors.${index}.image`}
                                hidden
                                accept='image/*'
                                onChange={(event) => {
                                  setFieldValue(
                                    `actors.${index}.image`,
                                    event.currentTarget.files[0]
                                  )
                                }}
                              />
                              <label htmlFor={`actors.${index}.image`}>
                                <Avatar
                                  alt='Remy Sharp'
                                  src={
                                    values.actors[index].image
                                      ? URL.createObjectURL(
                                          values.actors[index].image
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
                        name={`actors.${index}.biography`}
                        label='Biography'
                        multiline
                        maxRows={4}
                        variant='standard'
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`actors.${index}.birthday`}
                        label='Birthday'
                        type='date'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`actors.${index}.birthplace`}
                        label='Birthplace'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`actors.${index}.nationality`}
                        label='Nationality'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth>
                        <InputLabel id={`actors.${index}.gender-label`}>
                          Gender
                        </InputLabel>
                        <Field
                          labelId={`actors.${index}.gender-label`}
                          name={`actors.${index}.gender`}
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
                          Remove Actor {index + 1}
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
                        errors.actors &&
                        errors.actors[values.actors.length - 1]
                      ) {
                        return
                      }

                      push(cast)
                    }}
                    color='secondary'
                    disabled={isSubmitting}
                  >
                    Add Actor
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

MovieActors.propTypes = {
  cast: PropTypes.object.isRequired,
}

export default MovieActors

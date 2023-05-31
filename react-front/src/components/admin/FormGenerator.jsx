import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import useMovieSnackbar from '../../hooks/useMovieSnackbar'
import { addForm } from '../../services/form.service'

const fieldData = {
  id: Date.now() + 0,
  name: '',
  label: '',
  type: 'text',
  required: false,
  value: '',
}

const FormGenerator = () => {
  const [formTitle, setFormTitle] = useState('')
  const [fields, setFields] = useState([fieldData])

  const { openMovieSnackbar } = useMovieSnackbar()

  const handleInputChange = (e, index, key) => {
    const { value, checked } = e.target
    const newFields = [...fields]
    if (key === 'required') {
      newFields[index][key] = checked
    } else if (key === 'name') {
      const foundName = newFields.find((item) => item.name === value)
      if (!foundName) {
        newFields[index][key] = value.replace(/\s/g, '')
      } else {
        openMovieSnackbar('Name Field value existed', 'error')
      }
    } else {
      newFields[index][key] = value
    }
    setFields(newFields)
  }

  const removeField = (index) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  const addField = () => {
    const newFields = [...fields]
    newFields.push({
      id: Date.now() + fields.length + 1,
      name: '',
      label: '',
      type: 'text',
      required: false,
      value: '',
    })
    setFields(newFields)
  }

  const formMutation = useMutation({
    mutationFn: addForm,
    onSuccess: (data) => {
      openMovieSnackbar(data.message, 'success')
      setTimeout(() => {
        setFormTitle('')
        setFields([fieldData])
      }, 2000)
    },
    onError: (error) => {
      openMovieSnackbar(error.response.data.message, 'error')
    },
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const newFieldsValues = []
    fields.forEach((field) => {
      const { name, label, type, required, value } = field
      newFieldsValues.push({
        name,
        label,
        type,
        required,
        value,
      })
    })

    const form = {
      title: formTitle,
      fields: newFieldsValues,
    }

    formMutation.mutate(form)
  }

  return (
    <>
      <Box>
        <h1>Form Generator</h1>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            {/* form title */}
            <Grid item xs={12}>
              <TextField
                required
                name='title'
                label='Form Title'
                fullWidth
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </Grid>
            {/* fields */}
            <Grid item xs={12}>
              {fields.map((field, index) => {
                return (
                  <Grid container spacing={2} key={field.id} sx={{ mb: 2 }}>
                    {/* field Label */}
                    <Grid item xs={12}>
                      <TextField
                        {...(field.type === 'submit' ||
                          (field.type === 'reset' && 'required'))}
                        name={`fields.${index}.label`}
                        label='Field Label'
                        fullWidth
                        value={field.label}
                        onChange={(e) => handleInputChange(e, index, 'label')}
                      />
                    </Grid>
                    {/* field name */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        name={`fields.${index}.name`}
                        label='Field Name'
                        fullWidth
                        value={field.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                      />
                    </Grid>
                    {/* field type */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel>Field Type</FormLabel>
                        <Select
                          color='primary'
                          name={`fields.${index}.type`}
                          value={field.type}
                          onChange={(e) => handleInputChange(e, index, 'type')}
                        >
                          <MenuItem value='text' selected>
                            Text
                          </MenuItem>
                          <MenuItem value='number'>Number</MenuItem>
                          <MenuItem value='email'>Email</MenuItem>
                          <MenuItem value='password'>Password</MenuItem>
                          <MenuItem value='date'>Date</MenuItem>
                          <MenuItem value='time'>Time</MenuItem>
                          <MenuItem value='datetime-local'>Date Time</MenuItem>
                          <MenuItem value='select' disabled>
                            Select
                          </MenuItem>
                          <MenuItem value='radio'>Radio</MenuItem>
                          <MenuItem value='checkbox'>Checkbox</MenuItem>
                          <MenuItem value='textarea' disabled>
                            Textarea
                          </MenuItem>
                          <MenuItem value='file'>File</MenuItem>
                          <MenuItem value='hidden'>Hidden</MenuItem>
                          <MenuItem value='tel'>Tel</MenuItem>
                          <MenuItem value='url'>URL</MenuItem>
                          <MenuItem value='month'>Month</MenuItem>
                          <MenuItem value='week'>Week</MenuItem>
                          <MenuItem value='color' disabled>
                            Color
                          </MenuItem>
                          <MenuItem value='range' disabled>
                            Range
                          </MenuItem>
                          <MenuItem value='search' disabled>
                            Search
                          </MenuItem>
                          <MenuItem value='reset'>Reset</MenuItem>
                          <MenuItem value='submit'>Submit</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {field.type === 'radio' && (
                      <Grid item xs={12}>
                        <TextField
                          required
                          name={`fields.${index}.value`}
                          label='Value'
                          fullWidth
                          value={field.value}
                          onChange={(e) => handleInputChange(e, index, 'value')}
                        />
                      </Grid>
                    )}
                    {/* field required */}
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`fields.${index}.required`}
                            color='primary'
                            value={field.required}
                            onChange={(e) =>
                              handleInputChange(e, index, 'required')
                            }
                          />
                        }
                        label='Required'
                      />
                    </Grid>
                    <Grid container spacing={2}>
                      {index > 0 && (
                        <Grid item xs={6}>
                          <Button
                            variant='contained'
                            color='error'
                            onClick={() => {
                              removeField(index)
                            }}
                          >
                            Delete Field
                          </Button>
                        </Grid>
                      )}
                      <Grid item xs={6}>
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={() => {
                            addField()
                          }}
                        >
                          Add Field
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
            {/* submit */}
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Generate Form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

export default FormGenerator

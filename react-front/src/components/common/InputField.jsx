import { TextField } from '@mui/material'
import { useField } from 'formik'
import propTypes from 'prop-types'

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <TextField
      fullWidth
      variant='standard'
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  )
}

InputField.propTypes = {
  label: propTypes.string.isRequired,
}

export default InputField

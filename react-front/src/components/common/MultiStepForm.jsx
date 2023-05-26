import { Step, StepLabel, Stepper } from '@mui/material'
import { Form, Formik } from 'formik'
import propTypes from 'prop-types'
import React, { useState } from 'react'
import FormNavigation from './FormNavigation'

const MultiStepForm = ({
  children,
  initialValues,
  onSubmit,
  movieMutation,
}) => {
  const [stepNumber, setStepNumber] = useState(0)
  const steps = React.Children.toArray(children)

  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const handleNext = (values) => {
    setSnapshot(values)
    setStepNumber(stepNumber + 1)
  }

  const handleBack = (values) => {
    setSnapshot(values)
    setStepNumber(stepNumber - 1)
  }

  const handleSubmit = async (values, actions) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values)
    }

    if (isLastStep) {
      await onSubmit(values, actions)
      movieMutation.isSuccess && setStepNumber(0) && actions.resetForm()
    } else {
      actions.setTouched({})
      handleNext(values)
    }
  }

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <Stepper
            alternativeLabel
            activeStep={stepNumber}
            sx={{ pt: 3, pb: 5 }}
          >
            {steps.map((child, index) => (
              <Step key={child.props.stepName} completed={step > index}>
                <StepLabel>{child.props.stepName}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {step}

          <FormNavigation
            isLastStep={isLastStep}
            hasPrevious={stepNumber > 0}
            onBackClick={() => handleBack(formik.values)}
            isSubmitting={formik.isSubmitting || movieMutation.isLoading}
          />
        </Form>
      )}
    </Formik>
  )
}

MultiStepForm.propTypes = {
  children: propTypes.node.isRequired,
  initialValues: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
  movieMutation: propTypes.objectOf(propTypes.any),
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children }) => (
  <>
    <h4>{stepName}</h4>
    {children}
  </>
)

FormStep.propTypes = {
  stepName: propTypes.string,
  children: propTypes.node.isRequired,
}

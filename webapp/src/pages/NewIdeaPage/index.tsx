// src/pages/NewIdeaPage/index.tsx
import { useFormik, type FormikErrors } from 'formik'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'

type FormValues = {
  name: string
  nick: string
  description: string
  text: string
}

const schema = z.object({
  name: z.string().min(1, 'String must contain at least 1 character'),
  nick: z
    .string()
    .min(1, 'Nick must contain at least 1 character')
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  description: z.string().min(1, 'String must contain at least 1 character'),
  text: z.string().min(100, 'Text should be at least 100 characters long'),
})

export const NewIdeaPage = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(schema) as unknown as (values: FormValues) => FormikErrors<FormValues>,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.info('Submit', values)
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
        noValidate
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} rows={6} />

        {!formik.isValid && formik.submitCount > 0 && (
          <div style={{ color: 'red', marginBottom: 10 }}>Some fields are invalid</div>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          Create Idea
        </button>
      </form>
    </Segment>
  )
}

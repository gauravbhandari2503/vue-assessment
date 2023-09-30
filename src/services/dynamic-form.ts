export const response: {
  blocks: {
    token: string
    type: string
    props: {
      title: string
      required?: boolean
      placeholder?: string
      default?: boolean
    }
  }[]} = {
  blocks: [
    {
      token: 'PERSON_NAME',
      type: 'text',
      props: {
        title: 'Enter your name',
        required: true,
        placeholder: 'eg. John Doe'
      }
    },
    {
      token: 'IS_PERSON_MINOR',
      type: 'checkbox',
      props: {
        title: 'Is the current person minor ?',
        default: false
      }
    },
    {
      token: 'PERSON_DOB',
      type: 'date',
      props: {
        title: 'Enter your DOB',
        required: true,
        placeholder: 'eg. 01/01/2000'
      }
    },
    {
      token: 'PERSON_ADDRESS',
      type: 'text',
      props: {
        title: 'Enter your Address',
        required: true,
        placeholder: 'eg. Uttarakhand, India'
      }
    }
  ]
}

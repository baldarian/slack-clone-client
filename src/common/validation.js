import { string } from 'yup';

export const username = string().required();
export const email = string()
  .required()
  .email();
export const password = string().required();
export const team = string().required();
export const channel = string().required();

export const handleSubmit = cb => async (values, formikBag) => {
  try {
    await cb(values, formikBag);
  } catch (e) {
    const graphqlError = e.graphQLErrors[0];

    if (!graphqlError) {
      return;
    }

    const badUserInput = graphqlError.extensions.code === 'BAD_USER_INPUT';
    const validationErrors = graphqlError.extensions.exception.errors;

    if (!badUserInput) {
      return;
    }

    validationErrors.forEach(({ path, message }) =>
      formikBag.setFieldError(path, message)
    );
  }
};

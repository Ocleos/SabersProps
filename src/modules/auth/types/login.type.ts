import * as yup from 'yup';

export type Login = {
  email: string;
  password: string;
};

export const loginSchema: yup.ObjectSchema<Login> = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

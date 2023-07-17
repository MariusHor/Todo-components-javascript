import { ContextProvider } from 'lib';

export type FormContext = {
  value: string;
  isEditing: boolean;
  todoToEditId: number | null;
};

export const FormProvider = new ContextProvider<FormContext>({
  state: {
    value: '',
    isEditing: false,
    todoToEditId: null,
  },
});

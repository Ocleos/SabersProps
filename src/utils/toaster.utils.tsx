import AlertWrapper from '@src/components/alert/alertWrapper.component';
import i18n from '@src/i18n.config';
import { AxiosError } from 'axios';
import { isError } from 'lodash';
import { IToastProps, Toast } from 'native-base';
import React from 'react';

interface ShowToasterProps extends IToastProps {
  status: string;
  title: string;
  description?: string;
}

export const showToaster = (props: ShowToasterProps) => {
  // rome-ignore lint/correctness/noUnusedVariables:
  const toastRef = Toast.show({
    placement: 'top',
    render: () => (
      <AlertWrapper
        status={props.status}
        title={props.title}
        description={props.description}
        onClose={() => {
          if (toastRef) {
            Toast.close(toastRef);
          }
        }}
      />
    ),
    ...props,
  });
};

export const showSuccessToaster = (description?: string) => {
  showToaster({
    status: 'success',
    title: i18n.t('common:COMMON.SUCCESS'),
    description: description,
  });
};

export const showErrorToaster = (error: AxiosError | unknown | Error) => {
  let errorMessage = undefined;
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data?.message;
  } else if (isError(error)) {
    errorMessage = error.message;
  }

  showToaster({
    status: 'error',
    title: i18n.t('common:COMMON.ERROR'),
    description: errorMessage,
  });
};

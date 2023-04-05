import AlertWrapper from '@src/components/alert/alertWrapper.component';
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

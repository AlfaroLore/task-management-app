import { FC } from 'react';
import { IconButtonProps } from './typings';
import cx from 'classnames';

const IconButton: FC<IconButtonProps> = ({
  variant = 'default',
  color = 'primary',
  children,
  ...props
}) => {
  const getButtonClasses = () => {
    const variants: {
      [key in 'outlined' | 'filled' | 'default']: {
        [key in 'primary' | 'secondary' | 'tertiary' | 'neutral']?: string;
      };
    } = {
      outlined: {
        primary: 'border-2 border-primary4',
        secondary: 'border-2 border-secondary4',
        tertiary: 'border-2 border-tertiary4',
      },
      filled: {
        primary: 'bg-primary4 hover:bg-primary3',
        secondary: 'bg-secondary4 hover:bg-secondary3',
        tertiary: 'bg-tertiary4 hover:bg-tertiary4',
      },
      default: {
        primary: '',
        secondary: '',
        tertiary: '',
      },
    };
    const buttonClasses = cx(
      'rounded-md p-2 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary4 rounded-full hover:bg-neutral3',
      variants[variant]?.[color]
    );
    return buttonClasses;
  };
  return (
    <button type="button" className={getButtonClasses()} {...props}>
      {children}
    </button>
  );
};

export default IconButton;

import { Dialog } from '@headlessui/react';
import { FlyoutProps } from './typings';

function Flyout({ isOpen, onClose, children }: FlyoutProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {' '}
      <div
        className="fixed -z-10 inset-0 bg-black/90"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {children}
      </div>
    </Dialog>
  );
}

export default Flyout;

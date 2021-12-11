import { Dialog as UIDialog, Transition } from '@headlessui/react';

type DialogProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: VoidFunction;
};

function Dialog({ open, children, onClose }: DialogProps): JSX.Element {
  return (
    <Transition
      appear={true}
      show={open}
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
    >
      <UIDialog
        onClose={onClose}
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <div className='flex items-center justify-center min-h-screen'>
          <UIDialog.Overlay className='fixed inset-0 bg-black opacity-30' />

          <div className='relative bg-zinc-800 text-slate-200 font-raleway ring-1 ring-white ring-opacity-20 shadow-md rounded-xl w-85vw mx-auto sm:w-420px'>
            {children}
          </div>
        </div>
      </UIDialog>
    </Transition>
  );
}

Dialog.Title = UIDialog.Title;
Dialog.Description = UIDialog.Description;

export default Dialog;

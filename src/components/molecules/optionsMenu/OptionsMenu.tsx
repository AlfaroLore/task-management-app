import { Menu } from '@headlessui/react';
import { OptionsMenuProps } from './typings';

function OptionsMenu({ menuButton, options, onClick }: OptionsMenuProps) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="text-white">{menuButton}</Menu.Button>
          <Menu.Items
            className="absolute right-0 mt-2 origin-top-right bg-neutral3 border border-neutral2 rounded-md shadow-lg outline-none"
            style={{ display: open ? 'block' : 'none' }}
          >
            {options.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-neutral4' : ''
                    } group flex  items-center w-full px-2 py-2 text-sm text-neutral1 rounded-md font-bold`}
                    onClick={() => {
                      onClick(item.name);
                    }}
                  >
                    {item.icon}
                    <span className="pl-1">{item.name}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default OptionsMenu;

import { NAVIGATION_ITEMS } from './contants';
import cx from 'classnames';

function Sidebar() {
  const path = location.pathname;
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral4 h-screen">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="ml-4 space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cx(
                      'group flex gap-x-3 px-2 py-3 text-sm leading-6 font-semibold',
                      {
                        'bg-gradient-to-r from-transparent via-[rgba(186,37,37,0)] to-[rgba(210,77,77,0.1)] text-primary4 border-r-4 border-primary4':
                          path.includes(item.href),
                      },
                      {
                        'text-neutral2': !path.includes(item.href),
                      }
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="hover:text-primary4">
                      {item.name.toUpperCase()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Sidebar;

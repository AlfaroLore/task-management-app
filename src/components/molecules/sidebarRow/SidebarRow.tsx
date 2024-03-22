import cx from 'classnames';
import { SidebarRowProps } from './typings';

function SidebarRow({ item }: SidebarRowProps) {
  const path = location.pathname;
  return (
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
        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="hover:text-primary4">{item.name.toUpperCase()}</span>
      </a>
    </li>
  );
}

export default SidebarRow;

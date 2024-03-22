import SidebarRow from 'src/components/molecules/sidebarRow/SidebarRow';
import { NAVIGATION_ITEMS } from './contants';

function Sidebar() {
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
                <SidebarRow key={item.name} item={item} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Sidebar;

import Sidebar from '../sidebar/Sidebar';
import { LayoutProps } from './typings';

function Layout(props: LayoutProps) {
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-0 h-screen">
      <div className="lg:col-span-2 md:col-span-2">
        <Sidebar />
      </div>

      <div className="lg:col-span-10 md:col-span-6 sm:col-span-4 lg:-mr-20 md:-mr-20 lg:ml-4 md:ml-4 mb-[250px]">
        <div>{props.children}</div>
      </div>
    </div>
  );
}
export default Layout;

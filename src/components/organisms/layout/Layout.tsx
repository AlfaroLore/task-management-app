import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { LayoutProps } from './typings';

function Layout(props: LayoutProps) {
  return (
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Navbar />
        {props.children}
      </div>
    </div>
  );
}
export default Layout;

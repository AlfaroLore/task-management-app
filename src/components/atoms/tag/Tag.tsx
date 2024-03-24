import { TaskTag } from 'src/api/response/typings';
import { TagProps } from './typings';
import cx from 'classnames';

function Tag({ name }: TagProps) {
  const taskName = name.toString();
  const tagClass = cx(
    'inline-flex',
    'items-center',
    'rounded-md',
    'px-2',
    'py-1',
    'text-xs',
    'font-medium',
    'ring-1',
    'ring-inset',
    'ring-gray-500/10',
    {
      'bg-primary1 text-primary4': taskName === TaskTag[TaskTag.ANDROID],
      'bg-green-500 text-white': taskName === TaskTag[TaskTag.IOS],
      'bg-blue-500 text-white': taskName === TaskTag[TaskTag.NODE_JS],
      'bg-yellow-500 text-black': taskName === TaskTag[TaskTag.RAILS],
      'bg-white text-black': taskName === TaskTag[TaskTag.REACT],
      'bg-neutral2/20 text-neutral4': ![
        TaskTag.ANDROID,
        TaskTag.IOS,
        TaskTag.NODE_JS,
        TaskTag.RAILS,
        TaskTag.REACT,
      ].includes(name),
    }
  );
  return <span className={tagClass}>{name}</span>;
}

export default Tag;

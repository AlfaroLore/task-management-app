import IconButton from 'src/components/atoms/iconButton/IconButton';
import { CardProps } from './typings';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import Avatar from 'src/components/atoms/avatar/Avatar';
import Tag from 'src/components/atoms/tag/Tag';
import DueDate from 'src/components/atoms/dueDate/DueDate';

function Card({ item }: CardProps) {
  return (
    <div className="bg-neutral4 rounded-md p-3 grid grid-cols-2 gap-1">
      <p className="font-bold text-lg">{item.name}</p>
      <div className="flex justify-end">
        <IconButton>
          <EllipsisVerticalIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <p className="text-sm">{`${item.pointEstimate} Pts`}</p>
      <DueDate dueDate={item.dueDate} />
      <div className="col-span-2">
        {item.tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <div>
        <Avatar size="sm" />
      </div>
    </div>
  );
}
export default Card;

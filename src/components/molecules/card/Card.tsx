import IconButton from 'src/components/atoms/iconButton/IconButton';
import { CardProps } from './typings';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import Avatar from 'src/components/atoms/avatar/Avatar';
import Tag from 'src/components/atoms/tag/Tag';

function Card({ item }: CardProps) {
  return (
    <div className="bg-neutral4 rounded-full w-[348px]">
      <div className="flex justify-between">
        <p>{item.name}</p>
        <IconButton>
          <EllipsisVerticalIcon />
        </IconButton>
      </div>
      <div>
        <p>{item.estimatedTime}Pts</p>
        <p>{item.dueDate}</p>
      </div>
      <div>
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

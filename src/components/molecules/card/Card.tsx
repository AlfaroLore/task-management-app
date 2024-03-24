import { CardProps } from './typings';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';
import Avatar from 'src/components/atoms/avatar/Avatar';
import Tag from 'src/components/atoms/tag/Tag';
import DueDate from 'src/components/atoms/dueDate/DueDate';
import { pointEstimateToNumber } from './helper';
import { PointEstimate } from 'src/api/response/typings';
import OptionsMenu from '../optionsMenu/OptionsMenu';
import { DELETE_OPTION, EDIT_OPTION } from 'src/utils/constants';

export const CARD_OPTIONS = [
  {
    name: EDIT_OPTION,
    icon: <PencilIcon className="h-5 w-5 text-neutral1" />,
  },
  {
    name: DELETE_OPTION,
    icon: <TrashIcon className="h-5 w-5 text-neutral1" />,
  },
];
function Card({ item, onOptionClick }: CardProps) {
  return (
    <div className="bg-neutral4 rounded-md p-3 grid grid-cols-2 gap-1">
      <p className="font-bold text-lg">{item.name}</p>
      <div className="flex justify-end">
        <OptionsMenu
          menuButton={<EllipsisVerticalIcon className="h-5 w-5" />}
          options={CARD_OPTIONS}
          onClick={(option) => {
            onOptionClick(option, item);
          }}
        />
      </div>
      <p className="text-sm">{`${pointEstimateToNumber(item.pointEstimate as PointEstimate)} Points`}</p>
      <DueDate dueDate={item.dueDate} />
      <div className="col-span-2">
        {item.tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <div className="mt-2">
        <Avatar size="sm" />
      </div>
    </div>
  );
}
export default Card;

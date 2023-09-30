import CollapseCard from '~src/components/card/collapseCard.component';
import { Repartition } from '../../models/repartition.model';
import RepartitionChart from './repartitionChart.component';

const RepartitionCard = () => {
  const data: Repartition[] = [
    {
      state: 1,
      values: [4, 0, 0],
    },
    {
      state: 2,
      values: [5, 0, 0],
    },
    {
      state: 3,
      values: [13, 0, 0],
    },
    {
      state: 4,
      values: [2, 2, 0],
    },
    {
      state: 5,
      values: [0, 0, 0],
    },
    {
      state: 6,
      values: [17, 3, 1],
    },
    {
      state: 7,
      values: [5, 0, 0],
    },
    {
      state: 8,
      values: [0, 0, 0],
    },
  ];

  return (
    <CollapseCard title={'Répartition'} isOpened={true}>
      <RepartitionChart data={data} />
    </CollapseCard>
  );
};

export default RepartitionCard;

import { Container } from './styles';
import Skeleton from '@material-ui/lab/Skeleton';

const LazyLoader = () => {
  const dummyItems = new Array(10);
  return (
    <Container>
      {dummyItems.map((_, index) => (
        <Skeleton
          animation='wave'
          width={210}
          height={118}
          key={index}
        />
      ))}
    </Container>
  );
};

export default LazyLoader;

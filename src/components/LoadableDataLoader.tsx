import Loadable from "../types/Loadable";

type Props = {
  data: Loadable<string>;
};

/** Loadableクラスを用いたバージョンのDataLoader */
const LoadableDataLoader: React.VFC<Props> = ({ data }: Props) => {
  const value = data.getOrThrow();
  return (
    <div>
      <div>Data is {value}</div>
    </div>
  );
};
export default LoadableDataLoader;

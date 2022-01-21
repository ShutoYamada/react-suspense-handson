type Props = {
  name: string;
};

/** nameをコンソールに出力し、何も描画しないコンポーネント */
const RenderingNotifier: React.VFC<Props> = ({ name }) => {
  console.log(`${name} is rendered`);

  return null;
};

export default RenderingNotifier;

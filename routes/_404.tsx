import Footer from '../components/Footer.tsx';
import { Header, Main, Text } from 'lunchbox';

export default function Error404() {
  return (
    <>
      <Header layout_type='full' gradient_pattern='zigzag' banner>
        <Text type='display' class='text-center'>
          Looks like you took a wrong turn partner
        </Text>
        <img
          src='https://em-content.zobj.net/source/apple/354/parachute_1fa82.png'
          alt='parachute emoji'
          class='mx-auto my-0'
        />
      </Header>
      <Main></Main>
    </>
  );
}

import { Footer, Header, Linkmap, Main, Markdown, Text } from 'lunchbox';

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
      <Main layout_type='focus'>
        <Text noMargins type='subheading'>Sitemap</Text>
        <Linkmap
          links={[{ name: 'Home', url: '/' }, {
            name: 'Resume',
            url: '/resume',
          }]}
        />
      </Main>
      <Footer gradient_pattern='zigzag'>
      </Footer>
    </>
  );
}

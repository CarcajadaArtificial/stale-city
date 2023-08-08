import { Link, Navigation } from 'lunchbox';

export default function () {
  return (
    <Navigation class='py-3'>
      <Link href='./' class='flex items-center gap-3'>
        <img
          src='https://raw.githubusercontent.com/CarcajadaArtificial/CarcajadaArtificial/main/images/stalecity.svg'
          alt='stale city logo'
          class='w-5 pb-1'
        />
        <>stale.city</>
      </Link>
    </Navigation>
  );
}

import { BsBoxArrowUpRight } from 'react-icons/bs';

type NewTabIconProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

function NewTabIcon(props: NewTabIconProps): JSX.Element {
  return (
    <a {...props} target='_blank' referrerPolicy='no-referrer' className='flex'>
      <BsBoxArrowUpRight />
    </a>
  );
}

export default NewTabIcon;

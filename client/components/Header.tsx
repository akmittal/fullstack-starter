import { ReactElement, useState } from 'react';
import Logo from './Logo';
import { MenuLinks } from './MenuLinks';
import { MenuToggle } from './MenuToggle';
import { NavBar } from './Navbar';

interface Props {}

function Header({}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavBar>
      <Logo w="100px" color={['primary.default', 'primary.default', 'primary.500', 'primary.500']} />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBar>
  );
}

export default Header;

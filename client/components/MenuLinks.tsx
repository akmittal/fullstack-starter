import { Box, Link, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MenuItemProps {
  isLast?: boolean;
  to: string;
  children: ReactNode;
}

const MenuItem = ({ children, to = '/', ...rest }: MenuItemProps) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

interface MenuLinksProps {
  isOpen: boolean;
}
export const MenuLinks = ({ isOpen }: MenuLinksProps) => {
  return (
    <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/how">How It Works</MenuItem>
      </Stack>
    </Box>
  );
};

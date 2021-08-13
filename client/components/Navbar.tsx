
import { Flex } from "@chakra-ui/react";


export const NavBar = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["white", "transparent", "transparent", "transparent"]}
        color={["primary.default", "primary.default", "primary.default", "primary.default"]}
        {...props}
      >{children}</Flex>
    )
  }
  
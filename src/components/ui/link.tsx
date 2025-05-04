import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const Link: React.FC<NextLinkProps & { className?: string }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <span {...props}>{children}</span>
    </NextLink>
  );
};

export default Link;

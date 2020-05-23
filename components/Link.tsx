/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

type NextComposedProps = NextLinkProps & MuiLinkProps;

const NextComposed = React.forwardRef(function NextComposed(
  props: NextComposedProps,
  ref: React.Ref<HTMLAnchorElement>
) {
  const {
    as,
    href,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    ...other
  } = props;

  return (
    <NextLink
      as={as}
      href={href}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
});

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link

export type ComponentProps = Omit<NextComposedProps, "ref"> & {
  activeClassName?: string;
  className?: string;
  naked?: boolean;
  role?: string;
};

type InnerRefProp = React.Ref<HTMLAnchorElement>;

function Link(props: ComponentProps & { innerRef: InnerRefProp }) {
  const {
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked,
    role: roleProp,
    ...other
  } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  // catch role passed from ButtonBase. This is definitely a link
  const role = roleProp === "button" ? undefined : roleProp;

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        role={role}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      role={role}
      {...other}
    />
  );
}

export default React.forwardRef((props: ComponentProps, ref: InnerRefProp) => (
  <Link {...props} innerRef={ref} />
));

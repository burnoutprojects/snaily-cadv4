import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { classNames } from "lib/classNames";
import { Button, ButtonProps } from "components/Button";
import { useRouter } from "next/router";

interface Props extends DropdownMenu.MenuContentProps {
  trigger: any;
  children: React.ReactNode;
  extra?: { maxWidth?: number };
}

export const Dropdown = ({ trigger, children, extra, ...rest }: Props) => {
  const maxWidth = extra?.maxWidth ?? 150;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-1 px-1.5" asChild>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={7}
        alignOffset={10}
        style={{ width: maxWidth, maxWidth }}
        className="z-50 p-1 bg-white rounded-md shadow-lg dropdown-fade w-36 dark:bg-dark-bright"
        align="start"
        {...rest}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

Dropdown.Item = ({ children, ...rest }: Omit<ButtonProps, "ref">) => (
  <DropdownMenu.Item asChild>
    <Button
      {...rest}
      className={classNames(
        "p-1 my-1 px-1.5 rounded-md transition-colors w-full text-left bg-transparent",
        rest.className,
      )}
    >
      {children}
    </Button>
  </DropdownMenu.Item>
);

Dropdown.LinkItem = ({ children, ...rest }: JSX.IntrinsicElements["a"]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // next/link doesn't support a "ref" prop. :(
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;
    const href = target.href;

    if (e.shiftKey || e.ctrlKey) {
      open(href, "_blank");
    } else {
      router.push(target.href);
    }
  }

  return (
    <DropdownMenu.Item asChild>
      <a
        {...rest}
        onClick={handleClick}
        className={classNames(
          "text-gray-900 dark:text-gray-200 block hover:bg-gray-200 dark:hover:bg-dark-bg focus:bg-gray-200 dark:focus:bg-dark-bg rounded-md items-center w-full px-3 py-1.5 text-sm transition-all",
          rest.className,
        )}
      >
        {children}
      </a>
    </DropdownMenu.Item>
  );
};

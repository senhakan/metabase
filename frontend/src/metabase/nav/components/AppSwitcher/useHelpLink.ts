import { useSetting } from "metabase/common/hooks";

export const useHelpLink = (): { visible: boolean; href: string } => {
  useSetting("help-link");
  useSetting("help-link-custom-destination");
  return { visible: false, href: "" };
};

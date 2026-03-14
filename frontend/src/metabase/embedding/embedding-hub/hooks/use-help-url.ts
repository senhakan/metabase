import { useSetting } from "metabase/common/hooks";
import { useSelector } from "metabase/lib/redux";
import { getIsPaidPlan } from "metabase/selectors/settings";

export const useHelpUrl = () => {
  useSelector(getIsPaidPlan);
  useSetting("version");
  return "";
};

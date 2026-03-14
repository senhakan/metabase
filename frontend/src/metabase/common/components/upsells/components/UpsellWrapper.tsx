import { useSelector } from "metabase/lib/redux";
import { getUserIsAdmin } from "metabase/selectors/user";

/**
 * we should wrap all upsell components in this HoC to ensure that they are only rendered for admins
 */
export function UpsellWrapper<Props extends object>(
  _Component: React.ComponentType<Props>,
) {
  const WrappedComponent = (_props: Props) => {
    useSelector(getUserIsAdmin);
    return null;
  };

  return WrappedComponent;
}

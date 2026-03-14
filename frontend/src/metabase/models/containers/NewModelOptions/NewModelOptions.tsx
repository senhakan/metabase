import cx from "classnames";
import type { Location } from "history";
import { t } from "ttag";

import CS from "metabase/css/core/index.css";
import { useSelector } from "metabase/lib/redux";
import * as Urls from "metabase/lib/urls";
import NewModelOption from "metabase/models/components/NewModelOption";
import { NoDatabasesEmptyState } from "metabase/reference/databases/NoDatabasesEmptyState";
import { getSetting } from "metabase/selectors/settings";
import {
  canUserCreateNativeQueries,
  canUserCreateQueries,
} from "metabase/selectors/user";
import { Group } from "metabase/ui";

import { OptionsRoot } from "./NewModelOptions.styled";

interface NewModelOptionsProps {
  location: Location;
}

const NewModelOptions = ({ location }: NewModelOptionsProps) => {
  const hasDataAccess = useSelector(canUserCreateQueries);
  const hasNativeWrite = useSelector(canUserCreateNativeQueries);

  const lastUsedDatabaseId = useSelector((state) =>
    getSetting(state, "last-used-native-database-id"),
  );

  const collectionId = Urls.extractEntityId(
    location.query.collectionId as string,
  );
  if (!hasDataAccess && !hasNativeWrite) {
    return (
      <div
        className={cx(CS.fullHeight, CS.flex, CS.alignCenter, CS.justifyCenter)}
      >
        <NoDatabasesEmptyState />
      </div>
    );
  }

  return (
    <OptionsRoot data-testid="new-model-options">
      <Group justify="center">
        {hasDataAccess && (
          <div>
            <NewModelOption
              image="app/img/notebook_mode_illustration"
              title={t`Use the notebook editor`}
              description={t`This automatically inherits metadata from your source tables, and gives your models drill-through.`}
              width={180}
              to={Urls.newQuestion({
                mode: "query",
                creationType: "custom_question",
                cardType: "model",
                collectionId,
              })}
            />
          </div>
        )}
        {hasNativeWrite && (
          <div>
            <NewModelOption
              image="app/img/sql_illustration"
              title={t`Use a native query`}
              description={t`You can always fall back to a SQL or native query, which is a bit more manual.`}
              to={Urls.newQuestion({
                mode: "query",
                DEPRECATED_RAW_MBQL_type: "native",
                creationType: "native_question",
                cardType: "model",
                collectionId,
                DEPRECATED_RAW_MBQL_databaseId: lastUsedDatabaseId || undefined,
              })}
              width={180}
            />
          </div>
        )}
      </Group>
    </OptionsRoot>
  );
};
// eslint-disable-next-line import/no-default-export -- deprecated usage
export default NewModelOptions;

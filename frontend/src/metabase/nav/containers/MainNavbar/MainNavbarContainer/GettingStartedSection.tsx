import { useDisclosure } from "@mantine/hooks";
import type { PropsWithChildren } from "react";
import { t } from "ttag";

import CS from "metabase/css/core/index.css";
import { Collapse, Group, Icon, UnstyledButton } from "metabase/ui";

import { PaddedSidebarLink, SidebarHeading } from "../MainNavbar.styled";
import type { SelectedItem } from "../types";

import { useAddDataPermissions } from "./AddDataModal/use-add-data-permission";

export const GettingStartedSection = ({
  onAddDataModalOpen,
  children,
}: PropsWithChildren<{
  nonEntityItem: SelectedItem;
  onAddDataModalOpen: () => void;
}>) => {
  const { canPerformMeaningfulActions } = useAddDataPermissions();
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <div aria-selected={opened} role="tab">
      <Group
        align="center"
        gap="sm"
        onClick={toggle}
        component={UnstyledButton}
        c="text-secondary"
        mb="sm"
        className={CS.cursorPointer}
      >
        <SidebarHeading>{t`Getting Started`}</SidebarHeading>
        <Icon name={opened ? "chevrondown" : "chevronright"} size={8} />
      </Group>

      <Collapse
        in={opened}
        transitionDuration={0}
        role="tabpanel"
        aria-expanded={opened}
      >
        {canPerformMeaningfulActions && (
          <PaddedSidebarLink icon="add_data" onClick={onAddDataModalOpen}>
            {t`Add your data`}
          </PaddedSidebarLink>
        )}

        {children}
      </Collapse>
    </div>
  );
};

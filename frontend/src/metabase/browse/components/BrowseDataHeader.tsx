import { t } from "ttag";

import { Flex, Group, Icon, Title } from "metabase/ui";

import { BrowseHeader, BrowseSection } from "./BrowseContainer.styled";

export const BrowseDataHeader = () => {
  return (
    <BrowseHeader>
      <BrowseSection>
        <Flex
          w="100%"
          h="2.25rem"
          direction="row"
          justify="space-between"
          align="center"
        >
          <Title order={2} c="text-primary">
            <Group gap="sm">
              <Icon size={24} c="brand" name="database" />
              {t`Databases`}
            </Group>
          </Title>
        </Flex>
      </BrowseSection>
    </BrowseHeader>
  );
};
